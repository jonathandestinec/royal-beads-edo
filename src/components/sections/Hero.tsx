import { site } from "@/config/site";
import { EnquireButton } from "@/components/ui/EnquireButton";

export function Hero() {
  return (
    <section id="top" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-foreground/60">
          {site.location.area}, {site.location.city}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{site.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">{site.tagline}</p>
        <div className="mt-8">
          <EnquireButton />
        </div>
      </div>
    </section>
  );
}
