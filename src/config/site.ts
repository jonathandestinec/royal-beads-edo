/**
 * Single source of truth for business details and external links.
 * Everything here is public information. Never put API keys or tokens in this file.
 */

/**
 * The Royal Beads Edo n8n Enquire form (Form Trigger, production URL).
 * If this is ever emptied, Enquire buttons fall back to the #enquire section on the page.
 */
export const ENQUIRE_FORM_URL = "https://deestnee.app.n8n.cloud/form/royal-beads-edo-enquiry";

/**
 * Name of the n8n form field to pre-fill with a chosen set (regalia builder, try-on).
 * Must match the field label in the form exactly.
 */
export const ENQUIRE_MESSAGE_FIELD = "Message";

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
 * The share image (src/app/opengraph-image.tsx). Pages that set their own Open Graph or Twitter
 * metadata list it again, because a page's openGraph replaces the site-wide one.
 */
export const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Taoué by Royal Beads Edo: Coral beads and traditional attire from Benin City",
};

/**
 * Optional background music. Put a licence-free track in public/audio/ and set its path here
 * (for example "/audio/afro-jazz.mp3") to show the play button. Empty hides it.
 */
export const MUSIC_SRC = "";

/** Link attributes for an enquiry: the external form opens in a new tab. */
export const enquireLinkProps = ENQUIRE_FORM_URL ? { target: "_blank", rel: "noopener noreferrer" } : {};

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

/**
 * Taoué Assistant chatbot (Botpress webchat). Both scripts come from the Botpress embed code.
 * These are public embed URLs, not secrets. Empty values hide the chat bubble.
 */
export const CHAT_INJECT_SRC = "https://cdn.botpress.cloud/webchat/v5.0/inject.js";
export const CHAT_CONFIG_SRC = "https://files.bpcontent.cloud/2026/11/24/14/20261124142712-I5MLIQE7.js";

/**
 * Enquiries dashboard (/dashboard). The "Enquiries" tab of the enquiries Google Sheet,
 * published to the web as CSV (File > Share > Publish to web > Enquiries > CSV).
 * The link is public by design: the sheet holds test enquiries only. Empty shows the setup steps.
 */
export const DASHBOARD_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKRP8f86cs7jpcmfr8V7WGGqmRMRg1uKlgLoKGTfqMqdA56pDXW5SEgJ16pWj0P723E-X5EzwJoCz3/pub?gid=851769811&single=true&output=csv";

/** How often the dashboard checks the sheet for new enquiries, in seconds. */
export const DASHBOARD_REFRESH_SECONDS = 20;
