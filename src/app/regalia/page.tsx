import type { Metadata } from "next";
import { site } from "@/config/site";
import { BuilderLoader } from "@/features/regalia-builder/BuilderLoader";

export const metadata: Metadata = {
  title: `Build your wedding set | ${site.brand} by ${site.name}`,
  description:
    "Build a coral bead wedding set for the bride, the groom or both: crown, neck piece, wrist beads and attire, with a price range for every piece. Buy or rent, then enquire.",
};

export default function RegaliaPage() {
  return (
    <main>
      <BuilderLoader />
    </main>
  );
}
