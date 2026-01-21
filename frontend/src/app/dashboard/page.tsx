"use client";

import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type JobStatus = "pending" | "processing" | "completed" | "failed";

type JobListItem = {
  id: string;
  title: string;
  status: JobStatus;
  source_language: string;
  target_language: string;
  created_at: string;
};

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export default function Dashboard() {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setJobsError(null);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/jobs`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to load jobs");
      }
      const data = (await res.json()) as JobListItem[];
      setJobs(data);
    } catch (err) {
      setJobsError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchJobs();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("video") as File | null;
    if (!file) {
      setSubmitError("Please select a video file.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/jobs`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to submit job");
      }
      e.currentTarget.reset();
      await fetchJobs();
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/80 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:flex">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            ip26A
          </div>
          <div className="mt-1 text-lg font-semibold text-blue-600 dark:text-blue-400">
            Translation Dashboard
          </div>
        </div>
        <nav className="space-y-1 text-sm">
          <div className="rounded-md bg-blue-50 px-3 py-2 font-medium text-blue-700 shadow-sm dark:bg-blue-950/40 dark:text-blue-300">
            Jobs
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:px-6">
          <div>
            <h1 className="text-lg font-semibold">Movie Translation Jobs</h1>
            <p className="text-xs text-slate-500">
              Submit scenes or episodes for EN ↔ KR ↔ JP localization.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
          {/* Left column: upload form */}
          <section className="w-full md:w-2/5">
            <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                New Translation Job
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Upload a short movie scene or episode and choose source and
                target languages.
              </p>
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1 text-xs">
                  <label className="font-medium text-slate-700 dark:text-slate-200">
                    Title
                  </label>
                  <input
                    name="title"
                    required
                    placeholder="Episode 1 – Opening scene"
                    className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none ring-blue-500 transition focus:ring-1 dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>

                <div className="flex gap-2 text-xs">
                  <div className="flex-1 space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-200">
                      Source language
                    </label>
                    <select
                      name="source_language"
                      required
                      className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none ring-blue-500 transition focus:ring-1 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <option value="en">English</option>
                      <option value="ko">Korean</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-200">
                      Target language
                    </label>
                    <select
                      name="target_language"
                      required
                      className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none ring-blue-500 transition focus:ring-1 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <option value="en">English</option>
                      <option value="ko">Korean</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-medium text-slate-700 dark:text-slate-200">
                    Video file
                  </label>
                  <input
                    name="video"
                    type="file"
                    accept="video/*"
                    required
                    className="block w-full cursor-pointer text-xs text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white file:transition hover:file:bg-blue-700 dark:text-slate-300"
                  />
                </div>

                {submitError && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:shadow-none"
                >
                  {submitting ? "Submitting…" : "Submit for Translation"}
                </button>
              </form>
            </div>
          </section>

          {/* Right column: jobs table */}
          <section className="w-full md:w-3/5">
            <div className="mb-3 flex items-center justify-between text-xs">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Recent Jobs
              </h2>
              <button
                type="button"
                onClick={() => void fetchJobs()}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Refresh
              </button>
            </div>

            {jobsError && (
              <p className="mb-2 text-[11px] text-red-500">
                {jobsError}
              </p>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
              <table className="min-w-full divide-y divide-slate-200 text-xs dark:divide-slate-800">
                <thead className="bg-slate-50/80 dark:bg-slate-900/80">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                      Title
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                      Languages
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-center text-slate-500"
                      >
                        Loading jobs…
                      </td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-center text-slate-500"
                      >
                        No jobs yet. Submit your first translation above.
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/60"
                      >
                        <td className="px-3 py-2 text-slate-800 dark:text-slate-100">
                          {job.title}
                        </td>
                        <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                          {job.source_language.toUpperCase()} →{" "}
                          {job.target_language.toUpperCase()}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                              job.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                : job.status === "failed"
                                ? "bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-slate-500">
                          {new Date(job.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

