type SectionProps = {
  id: string;
  title: string;
  children?: React.ReactNode;
};

/** Temporary section shell. Each section gets its real design once references arrive. */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-foreground/10 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="mt-4 text-foreground/70">{children}</div>
      </div>
    </section>
  );
}
