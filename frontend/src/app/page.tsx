import { redirect } from "next/navigation";

// The root page's sole responsibility is to redirect the user to the dashboard.
// This is a server component, so the redirect happens on the server-side,
// avoiding a flash of content on the client.
export default function RootPage() {
  redirect("/dashboard");
}