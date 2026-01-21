from typing import List

from ..speech_recognition.asr import TranscriptSegment


class TranslationService:
    """
    Placeholder translation service.

    In production this would call NLLB-200 (or MarianMT) to translate
    each transcript segment from source_language to target_language.
    """

    def translate(
        self,
        segments: List[TranscriptSegment],
        source_language: str,
        target_language: str,
    ) -> List[TranscriptSegment]:
        # TODO: Integrate NLLB-200 / MarianMT.
        translated: List[TranscriptSegment] = []
        for seg in segments:
            translated.append(
                {
                    "start": seg["start"],
                    "end": seg["end"],
                    "text": f"[{source_language}->{target_language}] {seg['text']}",
                }
            )
        return translated

