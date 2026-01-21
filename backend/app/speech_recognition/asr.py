from pathlib import Path
from typing import List, TypedDict


class TranscriptSegment(TypedDict):
    start: float
    end: float
    text: str


class ASRService:
    """
    Placeholder ASR service.

    In production this would run Whisper (large-v3) over `dialogue.wav`
    and return timestamped segments.
    """

    def transcribe(self, dialogue_audio: Path, language: str) -> List[TranscriptSegment]:
        # TODO: Integrate Whisper large-v3.
        return [
            {
                "start": 0.0,
                "end": 1.0,
                "text": "[ASR placeholder for language=%s]" % language,
            }
        ]

