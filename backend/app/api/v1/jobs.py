from uuid import UUID
from typing import List

from fastapi import APIRouter, BackgroundTasks, HTTPException, UploadFile, File, Form

from ...schemas.jobs import JobCreateResponse, JobDetail, JobListItem
from ...services.jobs_service import JobsService
from ...services.pipeline_service import PipelineService


router = APIRouter()
jobs_service = JobsService()
pipeline_service = PipelineService(jobs_service)


@router.post("", response_model=JobCreateResponse, status_code=201)
async def create_job(
    background_tasks: BackgroundTasks,
    source_language: str = Form(...),
    target_language: str = Form(...),
    title: str = Form(...),
    video: UploadFile = File(...),
) -> JobCreateResponse:
    """
    Submit a new translation job for processing.
    """
    job = await jobs_service.create_job(
        title=title,
        source_language=source_language,
        target_language=target_language,
        filename=video.filename,
    )

    # Fire-and-forget pipeline execution in the background.
    background_tasks.add_task(pipeline_service.run_pipeline_for_job, job.id)

    return JobCreateResponse(id=job.id, status=job.status)


@router.get("", response_model=List[JobListItem])
async def list_jobs() -> List[JobListItem]:
    """List submitted translation jobs (MVP-friendly response)."""
    jobs = await jobs_service.list_jobs()
    return [JobListItem.from_job(job) for job in jobs]


@router.get("/{job_id}", response_model=JobDetail)
async def get_job(job_id: UUID) -> JobDetail:
    """Retrieve detailed information about a single job."""
    job = await jobs_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobDetail.from_job(job)

