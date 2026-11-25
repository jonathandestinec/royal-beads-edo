import type { Metadata } from "next";
import { SHARE_IMAGE, site } from "@/config/site";
import { TryOnLoader } from "@/features/try-on/TryOnLoader";

const title = `Try it on | ${site.brand} by ${site.name}`;
const description =
  "Try a coral bead crown and necklace on with your phone camera, then enquire about the look. The try-on runs on your device: no picture is sent anywhere.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/try-on" },
  openGraph: { type: "website", siteName: `${site.brand} by ${site.name}`, images: [SHARE_IMAGE], url: "/try-on", title, description },
  twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
};

export default function TryOnPage() {
  return (
    <main>
      <TryOnLoader />
    </main>
  );
}
