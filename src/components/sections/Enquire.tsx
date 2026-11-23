import { ENQUIRE_FORM_URL } from "@/config/site";
import { EnquireButton } from "@/components/ui/EnquireButton";
import { Section } from "./Section";

export function Enquire() {
  return (
    <Section id="enquire" title="Enquire or order">
      <p>Tell us the occasion, the date and the look you want, and we will get back to you.</p>
      <div className="mt-6">
        {ENQUIRE_FORM_URL ? (
          <EnquireButton>Open the enquiry form</EnquireButton>
        ) : (
          <p className="text-sm italic">Enquiry form link coming soon.</p>
        )}
      </div>
    </Section>
  );
}
