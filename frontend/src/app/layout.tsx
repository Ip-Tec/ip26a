import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ip26A Movie Translation",
  description: "Submit movie scenes for AI-powered voice translation.",
};

// This RootLayout is a static server component.
// - It contains NO state (`useState`).
// - It contains NO effects (`useEffect`).
// - It contains NO theme logic.
// - The `suppressHydrationWarning` is a good practice when you know that
//   client-side logic (like ThemeToggle) will modify an attribute (like class).
//   It tells React not to warn about the server/client mismatch for that attribute.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}