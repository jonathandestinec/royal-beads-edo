import { buildEnquireUrl, ENQUIRE_FORM_URL } from "@/config/site";

type Variant = "coral" | "cream" | "brown" | "ghost";

const styles: Record<Variant, string> = {
  coral: "bg-coral text-[#fff5ec] hover:bg-[#c4432e]",
  cream: "bg-cream text-espresso hover:bg-sand",
  brown: "bg-espresso text-paper hover:bg-saoky",
  ghost: "border-[1.5px] border-muted text-cream hover:bg-cream/10",
};

type EnquireButtonProps = {
  /** Optional text to pre-fill in the form's Message field. */
  message?: string;
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
};

/** The main call to action. Opens the Royal Beads Edo n8n Enquire form (or the on-page section until it exists). */
export function EnquireButton({
  message,
  children = "Enquire",
  variant = "coral",
  className = "",
}: EnquireButtonProps) {
  const external = Boolean(ENQUIRE_FORM_URL);
  return (
    <a
      href={buildEnquireUrl(message)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${pill} ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Shared pill-button classes, for links that are not Enquire buttons. */
export const pill =
  "inline-flex h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold no-underline transition-[transform,background-color] duration-300 ease-silk hover:-translate-y-0.5 active:scale-[0.98]";

export const pillStyles = styles;
