// In a real app, this would come from an environment variable
// e.g., process.env.NEXT_PUBLIC_API_BASE_URL
const BACKEND_BASE_URL = "http://localhost:8000/api/v1";

/**
 * Fetches the list of all jobs.
 * Throws an error if the network response is not ok.
 */
export async function getJobs() {
  const res = await fetch(`${BACKEND_BASE_URL}/jobs`, {
    // We use "no-store" to ensure we always get the latest job list,
    // avoiding aggressive caching by Next.js or the browser.
    cache: "no-store",
  });

  if (!res.ok) {
    // Provide a more informative error message
    const errorBody = await res.text();
    throw new Error(`Failed to fetch jobs. Status: ${res.status}. Body: ${errorBody}`);
  }

  return res.json();
}

/**
 * Submits a new job using a multipart/form-data request.
 * @param formData - The FormData object containing the form fields and file.
 * Throws an error if the network response is not ok.
 */
export async function createJob(formData: FormData) {
  const res = await fetch(`${BACKEND_BASE_URL}/jobs`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to create job. Status: ${res.status}. Body: ${errorBody}`);
  }

  return res.json();
}
