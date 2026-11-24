import { steps } from "@/data/content";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { CowriePattern } from "@/components/brand/CowriePattern";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const cardTones = [
  "bg-saoky text-cream",
  "bg-espresso text-cream",
  "bg-sand text-espresso",
];

/** The Sasa-style cream card on a cowrie pattern (reference 6), then the three steps. */
export function CustomOrder() {
  return (
    <section id="custom" aria-labelledby="custom-title" className="relative scroll-mt-20 overflow-hidden bg-maroon py-24 sm:py-32">
      <CowriePattern bg="#6a2c24" fg="#5a231d" tile={60} />
      <div className="relative mx-auto flex max-w-[1296px] flex-col gap-10 px-5 sm:px-[4vw]">
        <Reveal className="flex flex-col items-center gap-4 bg-cream px-6 py-12 text-center text-maroon sm:px-12">
          <CowrieMark variant="full" size={56} />
          <h2 id="custom-title" className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]">
            How a custom order works
          </h2>
          <p className="m-0 max-w-[34em] text-lg leading-relaxed text-saoky">
            Three steps from your first message to your finished set. Ready dates are never promised online: only our
            workshop confirms when your set will be ready.
          </p>
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <RevealItem key={s.title} className={`flex flex-col gap-3.5 rounded-3xl p-8 transition-transform duration-500 ease-silk hover:-translate-y-1.5 ${cardTones[i]}`}>
              <span className={`font-formal text-5xl leading-none ${i === 2 ? "text-rust" : "text-gold-soft"}`}>{i + 1}</span>
              <h3 className="m-0 font-display soft text-[28px] font-semibold">{s.title}</h3>
              <p className={`m-0 text-base leading-relaxed ${i === 2 ? "text-saoky" : "text-sand"}`}>{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
