from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class JobStatusEnum(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class JobBase(BaseModel):
    title: str = Field(..., description="Human-friendly scene or episode name")
    source_language: str = Field(..., description="Source language code (en, ko, ja)")
    target_language: str = Field(..., description="Target language code (en, ko, ja)")


class Job(JobBase):
    id: UUID
    status: JobStatusEnum
    created_at: datetime
    updated_at: datetime
    original_filename: str
    error_message: Optional[str] = None


class JobCreateResponse(BaseModel):
    id: UUID
    status: JobStatusEnum


class JobListItem(BaseModel):
    id: UUID
    title: str
    status: JobStatusEnum
    source_language: str
    target_language: str
    created_at: datetime

    @classmethod
    def from_job(cls, job: Job) -> "JobListItem":
        return cls(
            id=job.id,
            title=job.title,
            status=job.status,
            source_language=job.source_language,
            target_language=job.target_language,
            created_at=job.created_at,
        )


class JobDetail(JobBase):
    id: UUID
    status: JobStatusEnum
    created_at: datetime
    updated_at: datetime
    original_filename: str
    error_message: Optional[str] = None

    @classmethod
    def from_job(cls, job: Job) -> "JobDetail":
        return cls(
            id=job.id,
            title=job.title,
            status=job.status,
            created_at=job.created_at,
            updated_at=job.updated_at,
            original_filename=job.original_filename,
            source_language=job.source_language,
            target_language=job.target_language,
            error_message=job.error_message,
        )

