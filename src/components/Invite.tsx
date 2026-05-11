import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Clock, Heart, ArrowUpRight, CalendarPlus, Navigation } from "lucide-react";
import portrait from "@/assets/joyce-invite-reference.png";

const RSVP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0KofNVIKDYWuQfUw-_fi7hlzA7Eits8XEG_U4R2YBOerMMA/viewform";

const VENUE_NAME = "Forcey Bible Church";
const VENUE_ADDRESS = "2130 E Randolph Rd, Silver Spring, MD 20904, United States";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${VENUE_NAME}, ${VENUE_ADDRESS}`
)}`;

// May 31, 2026 · 3pm – 7pm America/New_York (EDT = UTC-4)
const EVENT_DATE = new Date("2026-05-31T15:00:00-04:00");
const EVENT_TITLE = "Joyce Kawesa's 90th Birthday Celebration";
const EVENT_DETAILS =
  "Please join us in honoring Joyce Kawesa on her 90th birthday — a life of love, faith and blessings. RSVP: " +
  RSVP_URL;
const GCAL_URL =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: "20260531T190000Z/20260531T230000Z",
    details: EVENT_DETAILS,
    location: `${VENUE_NAME}, ${VENUE_ADDRESS}`,
  }).toString();

const ICS_CONTENT = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Kawesa Family//90th Birthday//EN",
  "BEGIN:VEVENT",
  "UID:joyce-kawesa-90-2026@invite",
  "DTSTAMP:20260101T000000Z",
  "DTSTART:20260531T190000Z",
  "DTEND:20260531T230000Z",
  `SUMMARY:${EVENT_TITLE}`,
  `LOCATION:${VENUE_NAME}\\, ${VENUE_ADDRESS}`,
  `DESCRIPTION:${EVENT_DETAILS}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");
const ICS_HREF = `data:text/calendar;charset=utf-8,${encodeURIComponent(ICS_CONTENT)}`;

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { d: 0, h: 0, m: 0, s: 0, ready: false };
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    ready: true,
  };
}

const Ornament = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={className} aria-hidden>
    <path d="M0 10 H80 M120 10 H200" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <g transform="translate(100 10)" stroke="currentColor" strokeWidth="0.6" fill="none">
      <circle r="4" />
      <circle r="1.2" fill="currentColor" />
      <path d="M-12 0 L-6 -3 L-6 3 Z" />
      <path d="M12 0 L6 -3 L6 3 Z" />
    </g>
  </svg>
);

const Floral = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 300" className={className} aria-hidden>
    <defs>
      <radialGradient id="rose" cx="50%" cy="50%">
        <stop offset="0%" stopColor="oklch(0.78 0.12 305)" />
        <stop offset="100%" stopColor="oklch(0.45 0.18 300)" />
      </radialGradient>
    </defs>
    <g opacity="0.5">
      <circle cx="60" cy="70" r="42" fill="url(#rose)" />
      <circle cx="60" cy="70" r="22" fill="oklch(0.92 0.06 305)" opacity="0.7" />
      <circle cx="140" cy="40" r="26" fill="url(#rose)" opacity="0.85" />
      <circle cx="200" cy="110" r="34" fill="url(#rose)" opacity="0.8" />
      <circle cx="40" cy="160" r="28" fill="url(#rose)" opacity="0.75" />
      <path
        d="M0 200 Q80 120 160 180 T300 140"
        stroke="oklch(0.65 0.16 80)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <g fill="oklch(0.65 0.16 80)" opacity="0.7">
        <ellipse cx="110" cy="150" rx="14" ry="5" transform="rotate(35 110 150)" />
        <ellipse cx="180" cy="60" rx="12" ry="4" transform="rotate(-20 180 60)" />
        <ellipse cx="240" cy="180" rx="16" ry="5" transform="rotate(60 240 180)" />
      </g>
    </g>
  </svg>
);

export default function Invite() {
  const c = useCountdown(EVENT_DATE);
  const [calOpen, setCalOpen] = useState(false);

  const details = useMemo(
    () => [
      {
        icon: MapPin,
        label: "Location",
        value: VENUE_NAME,
        sub: "2130 E Randolph Rd · Silver Spring, MD",
        href: MAPS_URL,
        cta: "Open in Maps",
      },
      {
        icon: Calendar,
        label: "Date",
        value: "Sunday, May 31",
        sub: "Two thousand twenty-six",
        href: undefined,
      },
      {
        icon: Clock,
        label: "Time",
        value: "3:00 — 7:00 pm",
        sub: "Reception to follow",
        href: undefined,
      },
      {
        icon: Heart,
        label: "Attire",
        value: "Garden Formal",
        sub: "Lavender encouraged",
        href: undefined,
      },
    ],
    []
  );

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <Floral className="pointer-events-none absolute -left-20 -top-20 h-[18rem] w-[18rem] sm:h-[28rem] sm:w-[28rem]" />
      <Floral className="pointer-events-none absolute -right-20 -bottom-20 h-[18rem] w-[18rem] rotate-180 sm:h-[28rem] sm:w-[28rem]" />

      <div className="relative z-10 flex items-center justify-between px-5 pt-6 sm:px-12 sm:pt-8">
        <span className="hairline text-[9px] text-muted-foreground sm:text-[10px]">
          Est. 1936
        </span>
        <span className="hairline text-[9px] text-muted-foreground sm:text-[10px]">
          № 90
        </span>
      </div>

      {/* HERO */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pt-10 pb-12 sm:px-12 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7 lg:pt-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hairline text-[11px] text-[color:var(--violet-deep)] sm:text-xs"
          >
            Please join us for a
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="font-display mt-4 leading-[0.85] tracking-tight sm:mt-6"
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="block text-[42vw] leading-[0.8] sm:text-[18vw] lg:text-[14rem]"
            >
              <span className="text-gold">90</span>
              <sup className="font-serif-display align-super text-[0.32em] text-[color:var(--violet-deep)]">
                th
              </sup>
            </motion.span>
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-serif-display mt-3 block text-3xl font-light text-[color:var(--violet-deep)] sm:text-5xl lg:text-6xl"
            >
              Birthday{" "}
              <em className="font-display not-italic text-[color:var(--violet)]">
                Celebration
              </em>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 flex items-center gap-4 text-[color:var(--gold-deep)]"
          >
            <Ornament className="h-3 w-32 sm:w-40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-6 sm:mt-8"
          >
            <p className="hairline text-[11px] text-muted-foreground">Honoring</p>
            <h2 className="font-display mt-3 text-5xl leading-none text-[color:var(--violet-deep)] sm:text-7xl lg:text-8xl">
              Joyce <span className="italic">Kawesa</span>
            </h2>
            <p className="font-serif-display mt-5 max-w-md text-xl italic leading-snug text-[color:var(--violet-deep)]/80 sm:text-2xl">
              A life of love, faith &amp; blessings — ninety years, gently held and
              graciously given.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 1.2 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 lg:pt-12"
        >
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            <div className="absolute -inset-3 rounded-[2px] bg-gradient-violet opacity-20 blur-2xl" />
            <div className="relative overflow-hidden border border-[color:var(--gold)]/40 bg-card p-2 shadow-elegant sm:p-3">
              <div className="absolute inset-0 m-[8px] border border-[color:var(--gold)]/20 sm:m-[10px]" />
              <img
                src={portrait}
                alt="Joyce Kawesa, honoree of the 90th birthday celebration"
                className="relative w-full"
                loading="eager"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="hairline text-[10px] text-muted-foreground">Joyce, 2026</span>
              <span className="hairline text-[10px] text-[color:var(--gold-deep)]">Ninety</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DETAILS */}
      <section className="relative z-10 border-y border-[color:var(--gold)]/30 bg-secondary/40 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[color:var(--gold)]/30 px-5 sm:grid-cols-2 sm:px-12 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {details.map((d, i) => {
            const Inner = (
              <>
                <d.icon className="h-6 w-6 text-[color:var(--gold-deep)]" strokeWidth={1.3} />
                <p className="hairline mt-5 text-[10px] text-muted-foreground">{d.label}</p>
                <p className="font-serif-display mt-2 text-2xl text-[color:var(--violet-deep)] sm:text-3xl">
                  {d.value}
                </p>
                <p className="mt-1 text-base text-muted-foreground sm:text-sm">{d.sub}</p>
                {d.cta && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--violet)] underline-offset-4 group-hover:underline">
                    <Navigation className="h-4 w-4" strokeWidth={1.5} />
                    {d.cta}
                  </span>
                )}
              </>
            );
            return (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="px-6 py-8 sm:py-10"
              >
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div>{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* COUNTDOWN + ACTIONS */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-12 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="hairline text-[11px] text-[color:var(--gold-deep)]">
              The countdown begins
            </p>
            <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-8">
              {[
                { v: c.d, l: "Days" },
                { v: c.h, l: "Hours" },
                { v: c.m, l: "Min" },
                { v: c.s, l: "Sec" },
              ].map((u) => (
                <div key={u.l} className="text-center">
                  <div className="font-display text-4xl tabular-nums text-[color:var(--violet-deep)] sm:text-6xl">
                    {c.ready ? String(u.v).padStart(2, "0") : "—"}
                  </div>
                  <div className="hairline mt-2 text-[10px] text-muted-foreground">{u.l}</div>
                </div>
              ))}
            </div>
            <Ornament className="mt-8 h-3 w-40 text-[color:var(--gold-deep)] sm:mt-10 sm:w-48" />
            <p className="font-serif-display mt-6 max-w-lg text-xl italic leading-snug text-[color:var(--violet-deep)]/80 sm:text-2xl">
              "Your presence will make this milestone even more special."
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-gradient-violet opacity-15 blur-3xl" />
            <div className="relative rounded-2xl border border-[color:var(--gold)]/40 bg-card/80 p-6 shadow-elegant backdrop-blur sm:p-10">
              <p className="hairline text-[11px] text-[color:var(--gold-deep)]">
                Kindly Respond
              </p>
              <h3 className="font-display mt-3 text-3xl text-[color:var(--violet-deep)] sm:mt-4 sm:text-4xl">
                Reserve your seat
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
                Please RSVP by May 1st so we may set a place for you at this once-in-a-lifetime celebration.
              </p>

              <a
                href={RSVP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex w-full items-center justify-between gap-4 rounded-full bg-gradient-violet px-6 py-5 text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5 sm:px-8"
              >
                <span className="hairline text-xs sm:text-sm">RSVP — Google Form</span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.6}
                />
              </a>

              {/* Add to calendar */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setCalOpen((o) => !o)}
                  aria-expanded={calOpen}
                  className="flex w-full items-center justify-between gap-4 rounded-full border border-[color:var(--violet)]/40 bg-background/60 px-6 py-5 text-[color:var(--violet-deep)] transition-colors hover:bg-secondary sm:px-8"
                >
                  <span className="hairline text-xs sm:text-sm">Add to calendar</span>
                  <CalendarPlus className="h-5 w-5" strokeWidth={1.6} />
                </button>
                {calOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 grid grid-cols-1 gap-2 overflow-hidden sm:grid-cols-2"
                  >
                    <a
                      href={GCAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-border bg-background px-4 py-4 text-center text-sm font-medium text-[color:var(--violet-deep)] hover:border-[color:var(--gold)]"
                    >
                      Google Calendar
                    </a>
                    <a
                      href={ICS_HREF}
                      download="joyce-kawesa-90th-birthday.ics"
                      className="rounded-xl border border-border bg-background px-4 py-4 text-center text-sm font-medium text-[color:var(--violet-deep)] hover:border-[color:var(--gold)]"
                    >
                      Apple / Outlook (.ics)
                    </a>
                  </motion.div>
                )}
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-between gap-4 rounded-full border border-[color:var(--gold)]/50 bg-background/60 px-6 py-5 text-[color:var(--violet-deep)] transition-colors hover:bg-secondary sm:px-8"
              >
                <span className="hairline text-xs sm:text-sm">Get directions</span>
                <Navigation className="h-5 w-5" strokeWidth={1.6} />
              </a>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                With love, <span className="italic">The Kawesa Family</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[color:var(--gold)]/30 px-5 py-8 text-center sm:px-12 sm:py-10">
        <p className="hairline text-[10px] text-muted-foreground">
          Joyce Kawesa · Ninety Years · 1936 — 2026
        </p>
      </footer>

      {/* MOBILE STICKY RSVP */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--gold)]/40 bg-background/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-violet px-4 py-3.5 text-sm font-medium text-primary-foreground shadow-gold"
          >
            RSVP <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </a>
          <a
            href={GCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Add to Google Calendar"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--violet)]/40 bg-background text-[color:var(--violet-deep)]"
          >
            <CalendarPlus className="h-5 w-5" strokeWidth={1.6} />
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open location in Google Maps"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--gold)]/50 bg-background text-[color:var(--violet-deep)]"
          >
            <Navigation className="h-5 w-5" strokeWidth={1.6} />
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden />
    </main>
  );
}
