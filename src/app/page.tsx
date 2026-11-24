import { Header, Hero, Opening, Sea, Court, Hands, Occasions, TryOnTeaser, CoralCare, Gallery, Enquire, Footer } from "@/components/sections";
import { ChapterRail } from "@/components/film/ChapterRail";

/**
 * The site is told as one story in ten chapters, ending at the enquiry. The AI hero comes first:
 * Taoué → the cowrie → the sea → the court → the hands → occasions → try it on → real coral →
 * gallery → your day.
 */
export default function Home() {
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <Header />
      <ChapterRail />
      <main>
        <Hero />
        <Opening />
        <Sea />
        <Court />
        <Hands />
        <Occasions />
        <TryOnTeaser />
        <CoralCare />
        <Gallery />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
