/**
 * Single source of truth for business details and external links.
 * Everything here is public information. Never put API keys or tokens in this file.
 */

/**
 * The group's shared n8n Enquire form.
 * TODO: replace with the real n8n Form Trigger URL once the group creates it.
 * While this is empty, Enquire buttons scroll to the #enquire section on the page.
 */
export const ENQUIRE_FORM_URL = "";

/**
 * Name of the n8n form field to pre-fill with a chosen set (regalia builder, try-on).
 * Must match the field label in the group's form exactly.
 */
export const ENQUIRE_MESSAGE_FIELD = "Message";

/** Value of the "Business" dropdown in the shared group form. */
export const ENQUIRE_BUSINESS_VALUE = "Royal Beads Edo";

export const site = {
  /** Brand name. Always shown with the client's real name. */
  brand: "Taoué",
  name: "Royal Beads Edo",
  owner: "Ella Ozera",
  tagline: "Coral beads and traditional attire from Benin City",
  description:
    "Taoué by Royal Beads Edo makes and sells coral bead sets and traditional attire for Edo weddings, chieftaincy, festivals and celebrations, from the Oba Market area of Benin City. We ship to the UK, US and beyond.",
  location: {
    area: "Oba Market area",
    city: "Benin City",
    state: "Edo State",
    country: "Nigeria",
  },
  hours: "Monday to Saturday, 9am to 6pm",
  /** Custom sets usually take 2 to 3 weeks. Only the workshop confirms a ready date. */
  customSetLeadTime: "2 to 3 weeks",
} as const;

/**
 * Optional background music. Put a licence-free track in public/audio/ and set its path here
 * (for example "/audio/afro-jazz.mp3") to show the play button. Empty hides it.
 */
export const MUSIC_SRC = "";

/**
 * Build a link to the Enquire form, optionally pre-filling the message.
 * n8n forms accept pre-filled values as query parameters named after the field.
 */
export function buildEnquireUrl(message?: string): string {
  if (!ENQUIRE_FORM_URL) return "#enquire";
  const url = new URL(ENQUIRE_FORM_URL);
  if (message) url.searchParams.set(ENQUIRE_MESSAGE_FIELD, message);
  return url.toString();
}
