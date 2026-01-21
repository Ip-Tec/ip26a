from pathlib import Path
from uuid import UUID

from ..audio_processing.mixer import DialogueMixer
from ..audio_processing.separator import DialogueSeparator
from ..config import settings
from ..speech_recognition.asr import ASRService
from ..translation.translator import TranslationService
from ..video.renderer import VideoRenderer
from ..voice_cloning.tts import VoiceCloningTTS
from .jobs_service import JobsService
from ..schemas.jobs import JobStatusEnum


class PipelineService:
    """
    High-level orchestration of the ip26A pipeline for a single job.

    Stages (all currently placeholders with clear seams for model integration):
      1. Extract / locate audio from the uploaded video
      2. Separate dialogue vs background (Demucs v4)
      3. ASR on dialogue (Whisper large-v3)
      4. NMT on text (NLLB-200 / MarianMT)
      5. Voice cloning TTS (OpenVoice v2 + XTTS v2)
      6. Audio mixing & video rendering (FFmpeg, MFA optional)
    """

    def __init__(self, jobs_service: JobsService) -> None:
        self._jobs_service = jobs_service
        self._separator = DialogueSeparator()
        self._asr = ASRService()
        self._translator = TranslationService()
        self._tts = VoiceCloningTTS()
        self._mixer = DialogueMixer()
        self._renderer = VideoRenderer()

    async def run_pipeline_for_job(self, job_id: UUID) -> None:
        job = await self._jobs_service.get_job(job_id)
        if not job:
            return

        await self._jobs_service.update_status(job_id, JobStatusEnum.PROCESSING)

        try:
            base_dir = Path(settings.TEMP_DIR) / str(job_id)
            base_dir.mkdir(parents=True, exist_ok=True)

            # 1. Assume original video is already stored at base_dir/original.mp4
            #    In a real system, the upload handler would persist the file here.
            original_video = base_dir / "original.mp4"

            # 2. Dialogue vs background separation
            dialogue_audio, background_audio = self._separator.separate(
                mixed_audio=original_video, output_dir=base_dir
            )

            # 3. ASR
            segments = self._asr.transcribe(dialogue_audio, language=job.source_language)

            # 4. Translation
            translated_segments = self._translator.translate(
                segments,
                source_language=job.source_language,
                target_language=job.target_language,
            )

            # 5. Voice-cloned TTS
            translated_dialogue_audio = self._tts.synthesize(
                translated_segments=translated_segments,
                output_dir=base_dir,
                voice_id=None,  # Actor/voice identity wiring would go here
            )

            # 6. Mix and render final video
            final_audio = self._mixer.mix(
                translated_dialogue=translated_dialogue_audio,
                background_audio=background_audio,
                output_dir=base_dir,
            )
            final_video = self._renderer.render(
                original_video=original_video,
                final_audio=final_audio,
                output_dir=base_dir,
            )

            await self._jobs_service.mark_completed(job_id, output_path=str(final_video))
        except Exception as exc:  # noqa: BLE001
            await self._jobs_service.mark_failed(job_id, error_message=str(exc))

