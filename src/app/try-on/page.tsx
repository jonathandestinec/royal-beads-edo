import type { Metadata } from "next";
import { site } from "@/config/site";
import { TryOnLoader } from "@/features/try-on/TryOnLoader";

export const metadata: Metadata = {
  title: `Try it on | ${site.brand} by ${site.name}`,
  description:
    "Try a coral bead crown and necklace on with your phone camera, then enquire about the look. The try-on runs on your device: no picture is sent anywhere.",
};

export default function TryOnPage() {
  return (
    <main>
      <TryOnLoader />
    </main>
  );
}
