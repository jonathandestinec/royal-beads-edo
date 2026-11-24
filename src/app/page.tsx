import { Header, Hero, Sea, Court, Hands, Occasions, TryOnTeaser, CoralCare, Enquire, Footer } from "@/components/sections";
import { ChapterRail } from "@/components/film/ChapterRail";

/**
 * The site is told as one story in eight chapters, ending at the enquiry:
 * Taoué → the sea → the court → the hands → occasions → try it on → real coral → your day.
 */
export default function Home() {
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <Header />
      <ChapterRail />
      <main>
        <Hero />
        <Sea />
        <Court />
        <Hands />
        <Occasions />
        <TryOnTeaser />
        <CoralCare />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
