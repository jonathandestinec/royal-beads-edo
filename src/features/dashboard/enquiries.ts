/**
 * Reading the "Enquiries" sheet (published CSV) into typed rows.
 * Columns: Date, Name, Email, Phone, Message, Label. Other columns are ignored.
 */

export const LABELS = ["HOT", "WARM", "CHECK"] as const;
export type Label = (typeof LABELS)[number];

export type Enquiry = {
  /** Stable key for a row, so new rows can be spotted between refreshes. */
  id: string;
  date: Date | null;
  dateText: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  label: Label | null;
};

/** RFC 4180 CSV: quoted fields, doubled quotes, commas and line breaks inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** The sheet writes "2026-11-25 0:06" (n8n) but a person may type other forms. */
function parseDate(text: string): Date | null {
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (m) {
    const [, y, mo, d, h = "0", mi = "0", s = "0"] = m;
    return new Date(+y, +mo - 1, +d, +h, +mi, +s);
  }
  const t = Date.parse(text);
  return Number.isNaN(t) ? null : new Date(t);
}

/** Cells Google Sheets shows when a formula breaks (a phone typed as "+234..." becomes #ERROR!). */
function clean(value: string | undefined): string {
  const v = (value ?? "").trim();
  return /^#(ERROR!|N\/A|VALUE!|REF!|NAME\?)$/.test(v) ? "" : v;
}

export function toEnquiries(rows: string[][]): Enquiry[] {
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const idx = {
    date: col("date"),
    name: col("name"),
    email: col("email"),
    phone: col("phone"),
    message: col("message"),
    label: col("label"),
  };
  const seen = new Map<string, number>();
  return rows.slice(1).map((r) => {
    const get = (i: number) => (i >= 0 ? clean(r[i]) : "");
    const labelText = get(idx.label).toUpperCase();
    const dateText = get(idx.date);
    const base = [dateText, get(idx.name), get(idx.email), get(idx.message)].join("|");
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return {
      id: `${base}#${n}`,
      date: parseDate(dateText),
      dateText,
      name: get(idx.name),
      email: get(idx.email),
      phone: get(idx.phone),
      message: get(idx.message),
      label: (LABELS as readonly string[]).includes(labelText) ? (labelText as Label) : null,
    };
  });
}

/** Newest first. Rows without a readable date keep sheet order, after dated rows of the same position. */
export function newestFirst(list: Enquiry[]): Enquiry[] {
  return list
    .map((e, i) => ({ e, i }))
    .sort((a, b) => {
      const ta = a.e.date?.getTime() ?? -Infinity;
      const tb = b.e.date?.getTime() ?? -Infinity;
      return tb === ta ? b.i - a.i : tb - ta;
    })
    .map(({ e }) => e);
}

export async function fetchEnquiries(url: string, signal?: AbortSignal): Promise<Enquiry[]> {
  const u = new URL(url);
  // Skip the browser cache so each check asks Google for the current sheet.
  u.searchParams.set("_", Date.now().toString());
  const res = await fetch(u.toString(), { cache: "no-store", signal });
  if (!res.ok) throw new Error(`The sheet answered ${res.status}`);
  const text = await res.text();
  if (/^\s*</.test(text)) throw new Error("The link returned a web page, not CSV. Publish the sheet as CSV.");
  return newestFirst(toEnquiries(parseCsv(text)));
}

/** "j•••@gmail.com" and "•••• 6386": enough to tell people apart on a projector. */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return email ? "•••" : "";
  return `${user.slice(0, 1)}•••@${domain}`;
}
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length > 4 ? `•••• ${digits.slice(-4)}` : phone ? "••••" : "";
}
