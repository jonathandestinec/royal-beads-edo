import type { Metadata } from "next";
import { Dashboard } from "@/features/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Enquiries dashboard | Group admin",
  description: "Read-only view of every enquiry from the group's shared form.",
  // A private page for the business owners: kept out of search results and not linked from the site.
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main className="min-h-dvh bg-night">
      <Dashboard />
    </main>
  );
}
