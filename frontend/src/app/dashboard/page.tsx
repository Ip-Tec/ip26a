"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getJobs, createJob } from "@/lib/api";

// Type definitions matching the backend schema
type JobStatus = "pending" | "processing" | "completed" | "failed";

type Job = {
  id: string;
  title: string;
  status: JobStatus;
  source_language: string;
  target_language: string;
  created_at: string;
};

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // --- Data Fetching ---
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch jobs ONCE on initial component mount.
  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  // --- Form Submission ---
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    
    try {
      await createJob(formData);
      // Reset the form and refresh the jobs list on success
      event.currentTarget.reset();
      await fetchJobs();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  }

  // --- Render ---
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 flex-col border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 hidden md:flex">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500">ip26A</h1>
        <nav className="mt-8">
          <a href="#" className="flex items-center rounded-lg bg-blue-50 px-4 py-2 font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
            Jobs
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-2xl font-semibold">Translation Dashboard</h2>
          <ThemeToggle />
        </header>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <section className="lg:col-span-1">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-semibold">Submit New Job</h3>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Form fields */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                  <input id="title" name="title" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="source_language" className="block text-sm font-medium">Source</label>
                    <select id="source_language" name="source_language" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700">
                      <option value="en">English</option>
                      <option value="ko">Korean</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="target_language" className="block text-sm font-medium">Target</label>
                    <select id="target_language" name="target_language" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700">
                      <option value="ko">Korean</option>
                      <option value="en">English</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="video" className="block text-sm font-medium">Video File</label>
                  <input id="video" name="video" type="file" required accept="video/*" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950/50 dark:file:text-blue-300 dark:hover:file:bg-blue-950" />
                </div>
                {submitError && <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>}
                <button type="submit" disabled={submitting} className="w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Submitting..." : "Submit Job"}
                </button>
              </form>
            </div>
          </section>
          
          {/* Jobs List Section */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Jobs</h3>
              <button onClick={() => void fetchJobs()} disabled={loading} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50">
                Refresh
              </button>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">Error: {error}</p>}
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-950/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Title</th>
                      <th className="px-4 py-2 text-left font-semibold">Languages</th>
                      <th className="px-4 py-2 text-left font-semibold">Status</th>
                      <th className="px-4 py-2 text-left font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                      <tr><td colSpan={4} className="text-center py-8">Loading...</td></tr>
                    ) : jobs.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-8">No jobs found.</td></tr>
                    ) : (
                      jobs.map(job => (
                        <tr key={job.id}>
                          <td className="px-4 py-2">{job.title}</td>
                          <td className="px-4 py-2">{job.source_language.toUpperCase()} → {job.target_language.toUpperCase()}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              job.status === "completed" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" :
                              job.status === "failed" ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300" :
                              "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300"
                            }`}>{job.status}</span>
                          </td>
                          <td className="px-4 py-2">{new Date(job.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}