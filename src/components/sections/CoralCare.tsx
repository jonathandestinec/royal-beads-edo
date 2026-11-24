import { careTips } from "@/data/content";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const tones = ["bg-saoky text-cream", "bg-rust text-paper", "bg-sand text-espresso"];

/** A Saoky-style bento of care and authenticity tips (reference 8). */
export function CoralCare() {
  return (
    <section id="care" aria-labelledby="care-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1296px] flex-col gap-10 px-5 sm:px-[4vw]">
        <Reveal className="grid items-end gap-6 md:grid-cols-2 md:gap-12">
          <h2 id="care-title" className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]">
            Real coral, cared for
          </h2>
          <p className="m-0 text-lg leading-relaxed text-sand">
            Many buyers worry about fake coral. Here is how to tell the real thing, and how to keep it beautiful for
            years.
          </p>
        </Reveal>
        <RevealGroup className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem className="flex flex-col justify-between gap-8 rounded-3xl bg-cream p-8 text-espresso sm:col-span-2 lg:row-span-2">
            <CowrieMark variant="full" size={60} color="#4a3022" />
            <div className="flex flex-col gap-3">
              <h3 className="m-0 font-display soft text-[38px] leading-tight font-semibold">Is it real coral?</h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[17px] leading-relaxed text-saoky">
                <li><strong>Look closely.</strong> Natural coral shows fine growth lines, tiny pits and gentle changes of colour from bead to bead. Plastic and glass look perfectly even.</li>
                <li><strong>Feel the weight.</strong> Coral is dense, so it feels cool and heavier in the hand than plastic beads of the same size.</li>
                <li><strong>Check the holes.</strong> If the colour is darker inside the drill holes or in small cracks, the bead has likely been dyed.</li>
                <li><strong>Skip the home tests.</strong> Acid, flame and scratch tests damage real coral. For a valuable set, ask a gemologist, or ask us: every Taoué set comes with a note on what it is made from.</li>
              </ul>
            </div>
          </RevealItem>
          <RevealItem className="overflow-hidden rounded-3xl bg-espresso">
            <img src="/images/placeholder/cowries.jpg" alt="Cowrie shells once used as money" className="warm h-full min-h-[220px] w-full object-cover object-[50%_62%] transition-transform duration-[1200ms] ease-silk hover:scale-105" />
          </RevealItem>
          {careTips.map((t, i) => (
            <RevealItem key={t.title} className={`flex flex-col justify-between gap-6 rounded-3xl p-7 transition-transform duration-500 ease-silk hover:-translate-y-1.5 ${tones[i]}`}>
              <h3 className="m-0 font-display soft text-[26px] font-semibold">{t.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed opacity-90">{t.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
