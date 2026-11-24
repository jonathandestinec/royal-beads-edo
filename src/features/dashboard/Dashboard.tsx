"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DASHBOARD_CSV_URL, DASHBOARD_REFRESH_SECONDS } from "@/config/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { type Enquiry, type Label, LABELS, fetchEnquiries, maskEmail, maskPhone } from "./enquiries";

const labelStyle: Record<Label, { dot: string; chip: string; bar: string; note: string }> = {
  HOT: { dot: "bg-coral", chip: "bg-coral/20 text-coral-soft ring-coral/40", bar: "bg-coral", note: "Ready to buy or book" },
  WARM: { dot: "bg-gold", chip: "bg-gold/15 text-gold-soft ring-gold/35", bar: "bg-gold", note: "Asking questions" },
  CHECK: { dot: "bg-sand", chip: "bg-sand/15 text-sand ring-sand/35", bar: "bg-sand", note: "A person must handle it" },
};

type Status = { kind: "loading" } | { kind: "ok" } | { kind: "error"; message: string };

function timeAgo(from: number, now: number): string {
  const s = Math.max(0, Math.round((now - from) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  return `${Math.round(s / 60)} min ago`;
}

function formatDate(e: Enquiry): string {
  if (!e.date) return e.dateText || "No date";
  return e.date.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function Dashboard() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "loading" });
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [fresh, setFresh] = useState<Set<string>>(new Set());
  const [business, setBusiness] = useState("all");
  const [label, setLabel] = useState<Label | "all">("all");
  const [query, setQuery] = useState("");
  const [showContacts, setShowContacts] = useState(false);
  const known = useRef<Set<string> | null>(null);
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (!DASHBOARD_CSV_URL || busy.current) return;
    busy.current = true;
    try {
      const list = await fetchEnquiries(DASHBOARD_CSV_URL);
      const ids = new Set(list.map((e) => e.id));
      if (known.current) {
        const added = list.filter((e) => !known.current!.has(e.id)).map((e) => e.id);
        if (added.length) setFresh((prev) => new Set([...prev, ...added]));
      }
      known.current = ids;
      setRows(list);
      setStatus({ kind: "ok" });
      setUpdatedAt(Date.now());
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Could not read the sheet" });
    } finally {
      busy.current = false;
    }
  }, []);

  // Poll while the tab is visible; check at once when the tab comes back.
  useEffect(() => {
    if (!DASHBOARD_CSV_URL) return;
    const first = setTimeout(load, 0);
    const poll = setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, DASHBOARD_REFRESH_SECONDS * 1000);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(first);
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const counts = useMemo(() => {
    const byLabel: Record<Label, number> = { HOT: 0, WARM: 0, CHECK: 0 };
    const byBusiness = new Map<string, number>();
    for (const e of rows) {
      if (e.label) byLabel[e.label]++;
      byBusiness.set(e.business, (byBusiness.get(e.business) ?? 0) + 1);
    }
    return { byLabel, byBusiness: [...byBusiness.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])) };
  }, [rows]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (e) =>
        (business === "all" || e.business === business) &&
        (label === "all" || e.label === label) &&
        (!q || `${e.name} ${e.message} ${e.business}`.toLowerCase().includes(q)),
    );
  }, [rows, business, label, query]);

  const total = rows.length;
  const maxBusiness = counts.byBusiness[0]?.[1] ?? 1;
  const freshCount = fresh.size;

  return (
    <div className="mx-auto max-w-[1180px] px-4 pt-6 pb-32 sm:px-6 sm:pt-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-saoky pb-5">
        <div>
          <Wordmark size={30} variant="caps" className="text-cream" />
          <h1 className="soft m-0 mt-2 font-display text-[clamp(28px,6vw,44px)] leading-none text-paper">
            Enquiries dashboard
          </h1>
          <p className="m-0 mt-2 text-[14px] text-muted">
            Every enquiry from the group&rsquo;s shared form, sorted by the AI. Read only.
          </p>
        </div>
        <LiveBadge status={status} updatedAt={updatedAt} now={now} onRefresh={load} />
      </header>

      {!DASHBOARD_CSV_URL ? (
        <SetupSteps />
      ) : (
        <>
          {status.kind === "error" && (
            <p role="alert" className="mt-5 rounded-lg bg-maroon/60 px-4 py-3 text-[14px] text-sand">
              {status.message}. Showing the last rows read{updatedAt ? ` (${timeAgo(updatedAt, now)})` : ""}. It tries
              again every {DASHBOARD_REFRESH_SECONDS} seconds.
            </p>
          )}

          {/* Counts */}
          <section aria-label="Counts" className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <button
              type="button"
              onClick={() => setLabel("all")}
              aria-pressed={label === "all"}
              className={`notch col-span-2 bg-espresso p-4 text-left transition md:col-span-1 ${label === "all" ? "ring-2 ring-gold" : "hover:bg-saoky"}`}
            >
              <span className="block text-[12px] tracking-[0.14em] text-muted uppercase">All enquiries</span>
              <span className="mt-1 block font-formal text-[44px] leading-none text-paper tabular-nums">
                {status.kind === "loading" ? "–" : total}
              </span>
              {/* Label mix, one bar */}
              <span className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-night" aria-hidden>
                {LABELS.map((l) => (
                  <span key={l} className={labelStyle[l].bar} style={{ width: `${total ? (counts.byLabel[l] / total) * 100 : 0}%` }} />
                ))}
              </span>
            </button>
            {LABELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLabel(label === l ? "all" : l)}
                aria-pressed={label === l}
                className={`notch bg-espresso p-4 text-left transition ${label === l ? "ring-2 ring-gold" : "hover:bg-saoky"}`}
              >
                <span className="flex items-center gap-2 text-[12px] tracking-[0.14em] text-muted uppercase">
                  <span className={`size-2 rounded-full ${labelStyle[l].dot}`} />
                  {l}
                </span>
                <span className="mt-1 block font-formal text-[44px] leading-none text-paper tabular-nums">
                  {status.kind === "loading" ? "–" : counts.byLabel[l]}
                </span>
                <span className="mt-1 block text-[12px] text-taupe">{labelStyle[l].note}</span>
              </button>
            ))}
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* By business */}
            <section aria-labelledby="by-business" className="rounded-xl bg-espresso/70 p-4 lg:self-start">
              <h2 id="by-business" className="m-0 text-[12px] font-medium tracking-[0.14em] text-muted uppercase">
                By business
              </h2>
              <ul className="m-0 mt-3 list-none space-y-1 p-0">
                {counts.byBusiness.map(([name, n]) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => setBusiness(business === name ? "all" : name)}
                      aria-pressed={business === name}
                      className={`w-full rounded-md px-2 py-2 text-left transition ${business === name ? "bg-saoky" : "hover:bg-saoky/60"}`}
                    >
                      <span className="flex justify-between gap-3 text-[14px] text-cream">
                        <span className="truncate">{name}</span>
                        <span className="tabular-nums text-sand">{n}</span>
                      </span>
                      <span className="mt-1.5 block h-1 rounded-full bg-night">
                        <span className="block h-1 rounded-full bg-rust" style={{ width: `${(n / maxBusiness) * 100}%` }} />
                      </span>
                    </button>
                  </li>
                ))}
                {counts.byBusiness.length === 0 && status.kind === "ok" && (
                  <li className="text-[14px] text-taupe">No enquiries yet.</li>
                )}
              </ul>
            </section>

            {/* Latest enquiries */}
            <section aria-labelledby="latest" className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="latest" className="m-0 mr-auto text-[12px] font-medium tracking-[0.14em] text-muted uppercase">
                  Latest enquiries <span className="text-taupe normal-case tracking-normal">· {shown.length} shown</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setShowContacts((v) => !v)}
                  aria-pressed={showContacts}
                  className="rounded-full px-3 py-2 text-[13px] text-sand ring-1 ring-saoky hover:bg-saoky"
                >
                  {showContacts ? "Hide contacts" : "Show contacts"}
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_200px]">
                <input
                  type="search"
                  value={query}
                  onChange={(ev) => setQuery(ev.target.value)}
                  placeholder="Search name or message"
                  aria-label="Search name or message"
                  className="min-w-0 rounded-lg bg-espresso px-3 py-2.5 text-[15px] text-cream ring-1 ring-saoky outline-none placeholder:text-taupe focus:ring-gold"
                />
                <select
                  value={business}
                  onChange={(ev) => setBusiness(ev.target.value)}
                  aria-label="Filter by business"
                  className="min-w-0 rounded-lg bg-espresso px-3 py-2.5 text-[15px] text-cream ring-1 ring-saoky outline-none focus:ring-gold"
                >
                  <option value="all">All businesses</option>
                  {counts.byBusiness.map(([name]) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {freshCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFresh(new Set())}
                  className="mt-3 w-full rounded-lg bg-coral/15 px-3 py-2 text-left text-[14px] text-coral-soft ring-1 ring-coral/40"
                >
                  {freshCount} new {freshCount === 1 ? "enquiry" : "enquiries"} since you opened this page · mark as seen
                </button>
              )}

              <ol className="m-0 mt-3 list-none space-y-2 p-0" aria-live="polite">
                {shown.map((e) => (
                  <EnquiryRow key={e.id} e={e} isNew={fresh.has(e.id)} showContacts={showContacts} />
                ))}
              </ol>
              {status.kind === "ok" && shown.length === 0 && total > 0 && (
                <p className="mt-4 text-[14px] text-taupe">No enquiries match these filters.</p>
              )}
              {status.kind === "loading" && <p className="mt-4 text-[14px] text-taupe">Reading the sheet…</p>}
            </section>
          </div>

          <p className="mt-10 max-w-[70ch] text-[12px] leading-relaxed text-taupe">
            This page reads the group Google Sheet&rsquo;s published CSV and checks it every {DASHBOARD_REFRESH_SECONDS}{" "}
            seconds. Anyone with the CSV link can read the sheet, so it holds test enquiries only. Contacts stay hidden
            until you tap &ldquo;Show contacts&rdquo;.
          </p>
        </>
      )}
    </div>
  );
}

function LiveBadge({
  status,
  updatedAt,
  now,
  onRefresh,
}: {
  status: Status;
  updatedAt: number | null;
  now: number;
  onRefresh: () => void;
}) {
  if (!DASHBOARD_CSV_URL) return null;
  const ok = status.kind === "ok";
  return (
    <div className="flex items-center gap-3 text-[13px] text-sand">
      <span className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          {ok && <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-60 motion-reduce:hidden" />}
          <span className={`relative inline-flex size-2.5 rounded-full ${ok ? "bg-coral" : "bg-taupe"}`} />
        </span>
        {status.kind === "loading" ? "Connecting" : ok ? "Live" : "Offline"}
        {updatedAt && <span className="text-taupe">· updated {timeAgo(updatedAt, now)}</span>}
      </span>
      <button type="button" onClick={onRefresh} className="rounded-full px-3 py-1.5 ring-1 ring-saoky hover:bg-saoky">
        Refresh
      </button>
    </div>
  );
}

function EnquiryRow({ e, isNew, showContacts }: { e: Enquiry; isNew: boolean; showContacts: boolean }) {
  const s = e.label ? labelStyle[e.label] : null;
  const email = showContacts ? e.email : maskEmail(e.email);
  const phone = showContacts ? e.phone : maskPhone(e.phone);
  return (
    <li
      className={`rounded-xl bg-espresso p-4 transition-colors duration-[2000ms] ${isNew ? "bg-saoky ring-1 ring-coral/50" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium tracking-[0.08em] ring-1 ${s ? s.chip : "text-taupe ring-saoky"}`}
        >
          {e.label ?? "No label"}
        </span>
        <span className="text-[15px] font-medium text-paper">{e.name || "No name"}</span>
        {isNew && <span className="text-[12px] text-coral-soft">New</span>}
        <time className="ml-auto text-[13px] text-taupe tabular-nums" dateTime={e.date?.toISOString()}>
          {formatDate(e)}
        </time>
      </div>
      <p className="m-0 mt-2 text-[15px] leading-relaxed break-words text-cream">{e.message || "No message"}</p>
      <p className="m-0 mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
        <span className="text-sand">{e.business}</span>
        {email && <span className="break-all">{email}</span>}
        {phone && <span>{phone}</span>}
      </p>
    </li>
  );
}

function SetupSteps() {
  return (
    <section className="mt-8 max-w-[640px] rounded-xl bg-espresso p-5 text-[15px] leading-relaxed text-cream">
      <h2 className="m-0 font-display text-[22px] text-paper">Connect the group sheet</h2>
      <ol className="mt-3 space-y-2 pl-5">
        <li>Open the group Google Sheet.</li>
        <li>File, Share, Publish to web.</li>
        <li>Choose the &ldquo;Enquiries&rdquo; tab and &ldquo;Comma-separated values (.csv)&rdquo;, then Publish.</li>
        <li>
          Copy the link and set it as <code className="text-gold-soft">DASHBOARD_CSV_URL</code> in{" "}
          <code className="text-gold-soft">src/config/site.ts</code>.
        </li>
      </ol>
    </section>
  );
}
