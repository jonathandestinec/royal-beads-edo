import { site } from "@/config/site";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  return (
    <footer className="bg-maroon pt-24 pb-8">
      <div className="mx-auto flex max-w-[1296px] flex-col gap-12 px-5 sm:px-[4vw]">
        <Reveal className="flex flex-wrap items-center gap-7">
          <CowrieMark variant="pattern" size={120} color="#d2503b" patternColor="#4a1d17" title="Taoué cowrie mark" />
          <Wordmark size="clamp(72px, 10vw, 150px)" by bead="#e8755f" className="text-cream" />
        </Reveal>
        <div className="grid gap-8 text-[15px] leading-relaxed text-sand md:grid-cols-3">
          <p className="m-0">
            {site.brand} by {site.name}. Coral beads and traditional attire, {site.location.area}, {site.location.city}.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#sea" className="text-sand hover:text-cream">Our story</a>
            <a href="#occasions" className="text-sand hover:text-cream">Occasions</a>
            <a href="#try-on" className="text-sand hover:text-cream">Try on</a>
            <a href="#care" className="text-sand hover:text-cream">Real coral</a>
            <a href="#enquire" className="text-sand hover:text-cream">Enquire</a>
          </nav>
          <p className="m-0 text-[13px]">
            Images marked &ldquo;Concept image&rdquo; are AI-generated concepts, not real customers or finished work.
            Photography: Sasu Photography Studio (CC BY-SA 4.0), Alvy Bih (CC BY 4.0) and Gary Todd (CC0), via Wikimedia
            Commons. Coral reef footage: Jun Ho Lee, via Pexels.
          </p>
        </div>
      </div>
    </footer>
  );
}
