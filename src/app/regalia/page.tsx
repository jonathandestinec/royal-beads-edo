import type { Metadata } from "next";
import { SHARE_IMAGE, site } from "@/config/site";
import { BuilderLoader } from "@/features/regalia-builder/BuilderLoader";

const title = `Build your wedding set | ${site.brand} by ${site.name}`;
const description =
  "Build a coral bead wedding set for the bride, the groom or both: crown, neck piece, wrist beads and attire, with a price range for every piece. Buy or rent, then enquire.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/regalia" },
  openGraph: { type: "website", siteName: `${site.brand} by ${site.name}`, images: [SHARE_IMAGE], url: "/regalia", title, description },
  twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
};

export default function RegaliaPage() {
  return (
    <main>
      <BuilderLoader />
    </main>
  );
}
