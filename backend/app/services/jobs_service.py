from __future__ import annotations

from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID, uuid4

from ..schemas.jobs import Job, JobStatusEnum


class JobsService:
    """
    In-memory implementation of job management for the MVP.

    This isolates orchestration concerns from the web layer and can later be
    replaced with a database-backed or queue-based implementation without
    touching the API layer.
    """

    def __init__(self) -> None:
        self._jobs: Dict[UUID, Job] = {}

    async def create_job(
        self,
        *,
        title: str,
        source_language: str,
        target_language: str,
        filename: str,
        ) -> Job:
        now = datetime.utcnow()
        job = Job(
            id=uuid4(),
            title=title,
            source_language=source_language,
            target_language=target_language,
            status=JobStatusEnum.PENDING,
            created_at=now,
            updated_at=now,
            original_filename=filename,
        )
        self._jobs[job.id] = job
        return job

    async def list_jobs(self) -> List[Job]:
        return sorted(self._jobs.values(), key=lambda j: j.created_at, reverse=True)

    async def get_job(self, job_id: UUID) -> Optional[Job]:
        return self._jobs.get(job_id)

    async def update_status(self, job_id: UUID, status: JobStatusEnum) -> None:
        job = self._jobs.get(job_id)
        if not job:
            return
        job.status = status
        job.updated_at = datetime.utcnow()

    async def mark_completed(self, job_id: UUID, output_path: str | None = None) -> None:
        await self.update_status(job_id, JobStatusEnum.COMPLETED)
        # In a real system, we'd persist `output_path` on the job or related model.

    async def mark_failed(self, job_id: UUID, error_message: str | None = None) -> None:
        job = self._jobs.get(job_id)
        if not job:
            return
        job.status = JobStatusEnum.FAILED
        job.error_message = error_message
        job.updated_at = datetime.utcnow()

