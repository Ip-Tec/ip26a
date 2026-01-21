from fastapi import APIRouter

from .v1 import jobs

router = APIRouter()

router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])

