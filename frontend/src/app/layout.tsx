import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ip26A Dashboard",
  description:
    "MVP dashboard for ip26A – AI Movie Voice Translation Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}

