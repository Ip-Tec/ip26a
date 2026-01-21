from pathlib import Path


class DialogueSeparator:
    """
    Placeholder for dialogue vs background separation.

    In a full implementation this would call Demucs v4 (or similar) to produce:
      - dialogue.wav
      - background.wav
    """

    def separate(self, mixed_audio: Path, output_dir: Path) -> tuple[Path, Path]:
        output_dir.mkdir(parents=True, exist_ok=True)
        dialogue_path = output_dir / "dialogue.wav"
        background_path = output_dir / "background.wav"

        # TODO: Replace with Demucs-based separation.
        # For now we just point both to the same file to keep the pipeline coherent.
        return mixed_audio, mixed_audio

