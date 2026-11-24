import {
  Header,
  Hero,
  Marquee,
  Occasions,
  TryOnTeaser,
  CustomOrder,
  CultureStory,
  CoralCare,
  Enquire,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Occasions />
        <TryOnTeaser />
        <CustomOrder />
        <CultureStory />
        <CoralCare />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
