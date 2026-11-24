import { site } from "@/config/site";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { CowriePattern } from "@/components/brand/CowriePattern";
import { Reveal } from "@/components/motion/Reveal";
import { EnquireButton } from "@/components/ui/EnquireButton";

/** Visit and enquire, styled after the Siloha note card on its envelope (reference 12). */
export function Enquire() {
  const { area, city, state, country } = site.location;
  return (
    <section id="enquire" aria-labelledby="enquire-title" className="relative scroll-mt-20 overflow-hidden bg-rust py-24 sm:py-32">
      <CowriePattern bg="#a5502f" fg="#994729" tile={72} />
      <div className="relative mx-auto grid max-w-[1296px] items-center gap-12 px-5 sm:px-[4vw] md:grid-cols-2">
        <Reveal className="flex flex-col gap-5 text-paper">
          <h2 id="enquire-title" className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]">
            Visit us or send an enquiry
          </h2>
          <p className="m-0 text-lg leading-relaxed">
            {area}, {city}, {state}, {country}. Open {site.hours}.
          </p>
          <p className="m-0 text-lg leading-relaxed">
            Tell us the occasion, your date and the look you want, and we will reply with options and price ranges. Ready
            dates are confirmed by our workshop.
          </p>
          <EnquireButton variant="brown" className="self-start !h-14 !px-8 text-[17px]" message="Hello, I'd like to enquire about a set.">
            Open the Enquire form
          </EnquireButton>
        </Reveal>
        <Reveal delay={0.15} className="relative h-[380px] sm:h-[420px]">
          <div className="absolute inset-x-[4%] top-[34%] bottom-0 rounded-md bg-envelope sm:left-[8%]" />
          <div className="absolute top-[6%] right-[14%] left-0 flex h-[260px] rotate-[-3deg] flex-col items-center justify-center gap-6 bg-paper p-6 text-center text-rust shadow-[0_18px_40px_rgba(40,12,8,0.3)] transition-transform duration-700 ease-silk hover:rotate-0 sm:h-[280px]">
            <p className="m-0 font-display soft text-[34px] leading-tight font-medium sm:text-[38px]">Strung with care, for you</p>
            <CowrieMark variant="full" size={40} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
