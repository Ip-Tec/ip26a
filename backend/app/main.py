from fastapi import FastAPI

from .api.routes import router as api_router
from .config import settings


def create_app() -> FastAPI:
    app = FastAPI(
        title="ip26A API",
        version="0.1.0",
        description=(
            "MVP backend for ip26A – AI Movie Voice Translation Platform. "
            "Provides REST endpoints to submit translation jobs and track their status."
        ),
    )

    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    return app


app = create_app()

