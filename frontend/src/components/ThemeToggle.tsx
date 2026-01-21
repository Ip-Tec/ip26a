"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "ip26a-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
    ?.matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getInitialTheme();
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme, mounted]);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div className="inline-flex h-[29px] w-[60px] items-center gap-1 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-label="Toggle light and dark mode"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 transition-transform dark:translate-x-2" />
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

