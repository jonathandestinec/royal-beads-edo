import { buildEnquireUrl, ENQUIRE_FORM_URL } from "@/config/site";

type EnquireButtonProps = {
  /** Optional text to pre-fill in the form's Message field. */
  message?: string;
  children?: React.ReactNode;
  className?: string;
};

export function EnquireButton({
  message,
  children = "Enquire",
  className = "",
}: EnquireButtonProps) {
  const external = Boolean(ENQUIRE_FORM_URL);
  return (
    <a
      href={buildEnquireUrl(message)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </a>
  );
}
