"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// This component is the ONLY place where theme logic exists.
// It directly manipulates the <html> element's class list.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // 1. Initialize theme ONCE on client-side mount.
  useEffect(() => {
    // Read from localStorage or fallback to system preference.
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    setTheme(initial);
  }, []); // Empty dependency array ensures this runs only once.

  // 2. Apply theme to the document whenever the theme state changes.
  useEffect(() => {
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // 3. Handle theme toggling on user action.
  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === "light" ? "dark" : "light");
  };

  // 4. Mount guard: Prevent the button from rendering on the server.
  // This avoids a hydration mismatch for the button's text/icon content,
  // as the server doesn't know the theme and cannot render the correct icon.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or nothing on the server and initial client render.
    // This is layout-safe and prevents hydration errors.
    return <div className="h-8 w-8" />; 
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md border border-slate-300 dark:border-slate-700 px-2 py-1 text-sm"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
