from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


def _split_csv(value: str) -> List[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False)

    PROJECT_NAME: str = "Life Plan API"
    VERSION: str = "0.1.0"

    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@db:5432/lifeapp"

    JWT_SECRET_KEY: str = "changeme"
    JWT_ALGORITHM: str = "HS256"

    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    @property
    def cors_origins(self) -> List[str]:
        """Return CORS origins, parsing comma separated strings when supplied."""
        if isinstance(self.BACKEND_CORS_ORIGINS, str):
            return _split_csv(self.BACKEND_CORS_ORIGINS)
        return self.BACKEND_CORS_ORIGINS


settings = Settings()
