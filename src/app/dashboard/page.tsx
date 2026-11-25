import type { Metadata } from "next";
import { Dashboard } from "@/features/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Enquiries dashboard | Royal Beads Edo",
  description: "Read-only view of every enquiry from the Royal Beads Edo Enquire form.",
  // A private page for the business owner: kept out of search results and not linked from the site.
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main className="min-h-dvh bg-night">
      <Dashboard />
    </main>
  );
}
