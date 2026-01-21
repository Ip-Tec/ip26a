import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-slate-900 shadow-lg shadow-blue-600/40">
              <Image
                src="/logo.png"
                alt="ip26A logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                ip26A
              </div>
              <div className="text-[11px] text-slate-400">
                AI Movie Voice Translation
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-xs text-slate-300 md:flex">
              <Link href="#overview" className="hover:text-white/90">
                Overview
              </Link>
              <Link href="#pipeline" className="hover:text-white/90">
                Pipeline
              </Link>
              <Link href="#studios" className="hover:text-white/90">
                Studios
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 bg-fixed">
        {/* Hero */}
        <section
          id="overview"
          aria-labelledby="hero-heading"
          className="border-b border-slate-900/60 flex items-center justify-center"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:py-20 md:px-8">
            {/* Copy */}
            <div className="w-full space-y-6 md:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-300 shadow-sm shadow-blue-600/20">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Studio-grade AI voice-preserved localization
            </div>
            <h1
              id="hero-heading"
              className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl"
            >
              Translate movies between{" "}
              <span className="text-blue-400">English</span>,{" "}
              <span className="text-blue-400">Korean</span>, and{" "}
              <span className="text-blue-400">Japanese</span>{" "}
              <span className="block text-slate-300">
                while keeping the original actor&apos;s voice.
              </span>
            </h1>
            <p className="max-w-lg text-sm text-slate-300">
              ip26A separates dialogue from background audio, transcribes and
              translates it, then re-synthesizes speech in the actor&apos;s own
              voices, so global audiences experience the story the way it was
              meant to be heard.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl"
              >
                Open Studio Dashboard
                <span className="translate-y-px transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <span className="text-[11px] text-slate-400">
                No public uploads. Built for licensed studio workflows.
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-slate-300 md:max-w-sm">
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2">
                <div className="font-semibold text-slate-100">
                  Voice-preserved
                </div>
                <div className="mt-1 text-slate-400">
                  Actor identity stays consistent across languages.
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2">
                <div className="font-semibold text-slate-100">
                  Background intact
                </div>
                <div className="mt-1 text-slate-400">
                  Music and effects are preserved from the original mix.
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2">
                <div className="font-semibold text-slate-100">
                  Studio-focused
                </div>
                <div className="mt-1 text-slate-400">
                  Designed for film, anime, and streaming localization teams.
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Visual */}
          <div className="w-full border-t border-slate-900/60 bg-slate-950/40 md:w-1/2 md:border-t-0 md:border-l">
            <div className="relative mx-auto max-w-md px-4 py-8 md:px-8 md:py-0">
              <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-blue-600/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl">
                <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Pipeline: Scene 01
                  </span>
                  <span>EN → JP</span>
                </div>
                <div className="space-y-3 text-[11px]">
                  <div className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                    <span className="text-slate-300">Dialogue Separation</span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      Demucs
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                    <span className="text-slate-300">
                      ASR + Translation
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      Whisper · NLLB
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                    <span className="text-slate-300">
                      Voice-cloned TTS
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      OpenVoice · XTTS
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                    <span className="text-slate-300">
                      Mix & Render Output
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      Final localized cut
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value proposition / benefits */}
        <section
          aria-labelledby="benefits-heading"
          className="border-b border-slate-900/60 bg-slate-950/90"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 md:px-8">
            <div className="max-w-xl">
              <h2
                id="benefits-heading"
                className="text-lg font-semibold text-slate-50"
              >
                Why studios choose ip26A
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Built from the ground up for film, anime, and streaming
                localization teams that need fast, voice-consistent
                translations without compromising sound design.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-sm font-semibold text-slate-50">
                  Voice-accurate localization
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Actor-specific voice cloning keeps emotional tone, pitch, and
                  rhythm consistent across English, Korean, and Japanese
                  releases.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-sm font-semibold text-slate-50">
                  Background audio preserved
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Dialogue is separated from music and effects so your original
                  mix, ambience, and sound design remain untouched.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-sm font-semibold text-slate-50">
                  Modular, upgradeable pipeline
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Each stage – separation, ASR, translation, TTS, and mixing –
                  is isolated so models can be improved without workflow
                  changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="pipeline"
          aria-labelledby="pipeline-heading"
          className="border-b border-slate-900/60 bg-slate-950"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:py-16 md:px-8">
            <div className="w-full space-y-3 md:w-2/5">
              <h2
                id="pipeline-heading"
                className="text-lg font-semibold text-slate-50"
              >
                A focused six-step pipeline
              </h2>
              <p className="text-sm text-slate-300">
                ip26A follows a clear, studio-ready flow from raw video to
                localized output, keeping dialogue timing and emotional delivery
                front and center.
              </p>
            </div>
            <ol className="w-full space-y-3 text-xs text-slate-200 md:w-3/5">
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 text-center text-[11px] font-semibold leading-5">
                  1
                </span>
                <div>
                  <div className="font-semibold">Video & audio extraction</div>
                  <p className="mt-1 text-slate-300">
                    Ingest a scene or episode, extract the audio track, and
                    prepare it for separation.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 text-center text-[11px] font-semibold leading-5">
                  2
                </span>
                <div>
                  <div className="font-semibold">Dialogue separation</div>
                  <p className="mt-1 text-slate-300">
                    Isolate spoken dialogue from music and sound effects to
                    create clean speech and background tracks.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 text-center text-[11px] font-semibold leading-5">
                  3
                </span>
                <div>
                  <div className="font-semibold">ASR & timestamps</div>
                  <p className="mt-1 text-slate-300">
                    Transcribe dialogue in English, Korean, or Japanese with
                    precise timing for each line.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 text-center text-[11px] font-semibold leading-5">
                  4
                </span>
                <div>
                  <div className="font-semibold">Translation</div>
                  <p className="mt-1 text-slate-300">
                    Translate text between English, Korean, and Japanese while
                    keeping sentence alignment and timing intact.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 text-center text-[11px] font-semibold leading-5">
                  5
                </span>
                <div>
                  <div className="font-semibold">Voice-cloned synthesis</div>
                  <p className="mt-1 text-slate-300">
                    Re-synthesize translated lines using actor-specific voice
                    models that preserve tone, pitch, and rhythm.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-blue-600 text-center text-[11px] font-semibold leading-5">
                  6
                </span>
                <div>
                  <div className="font-semibold">Mix & final render</div>
                  <p className="mt-1 text-slate-300">
                    Blend the translated dialogue back into the preserved
                    background audio and export localized scenes.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Studios & use cases */}
        <section
          id="studios"
          aria-labelledby="studios-heading"
          className="border-b border-slate-900/60 bg-slate-950/95"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 md:px-8">
            <div className="grid gap-8 md:grid-cols-[1.5fr,1fr]">
              <div>
                <h2
                  id="studios-heading"
                  className="text-lg font-semibold text-slate-50"
                >
                  Built for studios, streamers, and localization teams
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  ip26A is designed for licensed, consent-based deployments
                  where actor voice rights and audio quality matter. It fits
                  neatly into existing localization and QC workflows.
                </p>
                <div className="mt-6 grid gap-4 text-xs text-slate-300 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <div className="font-semibold text-slate-50">
                      Movie & TV studios
                    </div>
                    <p className="mt-1">
                      Localize high-value titles for English, Korean, and
                      Japanese markets without full manual dubbing cycles.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <div className="font-semibold text-slate-50">
                      Streaming platforms
                    </div>
                    <p className="mt-1">
                      Accelerate international launches while preserving the
                      original performance and sound signature.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <div className="font-semibold text-slate-50">
                      Anime distributors
                    </div>
                    <p className="mt-1">
                      Bring anime and animated titles to new audiences while
                      keeping fan-favorite voices recognizable.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                    <div className="font-semibold text-slate-50">
                      Localization vendors
                    </div>
                    <p className="mt-1">
                      Offer AI-assisted voice-preserved workflows as a premium
                      option to studio clients.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Ethical foundation
                  </div>
                  <p className="mt-1">
                    ip26A is strictly consent-based. Actor voice models are
                    created under contract, with watermarking options and
                    studio-only deployment.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Business impact
                  </div>
                  <p className="mt-1">
                    Reduce localization cost and time while increasing audience
                    immersion and keeping release schedules on track.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section
          aria-labelledby="cta-heading"
          className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-slate-50 md:flex-row md:items-center md:px-8">
            <div>
              <h2
                id="cta-heading"
                className="text-lg font-semibold tracking-tight"
              >
                See ip26A in action with your own scenes
              </h2>
              <p className="mt-1 text-xs text-blue-100">
                Use the studio dashboard to submit short scenes or episodes and
                evaluate the end-to-end pipeline.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-900/60 transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Open Dashboard
                <span className="translate-y-px">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/90 px-4 py-4 text-[11px] text-slate-400 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div>© {new Date().getFullYear()} ip26A.</div>
            <div className="text-slate-500">
              Built for licensed, consent-based voice usage only.
            </div>
          </div>
          <div className="flex gap-4">
            <span>EN · KR · JP</span>
            <span>Pipeline MVP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

