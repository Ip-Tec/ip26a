from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    ENV: str = Field(default="development")
    DEBUG: bool = Field(default=True)

    API_V1_PREFIX: str = "/api/v1"

    # Core ip26A configuration
    SUPPORTED_INPUT_LANGUAGES: list[str] = Field(
        default=["en", "ko", "ja"], description="MVP input languages"
    )
    SUPPORTED_OUTPUT_LANGUAGES: list[str] = Field(
        default=["en", "ko", "ja"], description="MVP output languages"
    )

    # Storage and paths – for MVP we keep it simple and filesystem-based
    DATA_DIR: str = Field(default="data")
    SAMPLES_DIR: str = Field(default="data/samples")
    TEMP_DIR: str = Field(default="data/temp")


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]


settings = get_settings()

