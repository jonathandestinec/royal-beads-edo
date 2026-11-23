import {
  Hero,
  Collections,
  Gallery,
  CustomOrder,
  CultureStory,
  CoralCare,
  Location,
  Enquire,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Collections />
      <Gallery />
      <CustomOrder />
      <CultureStory />
      <CoralCare />
      <Location />
      <Enquire />
    </main>
  );
}
