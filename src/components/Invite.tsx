import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, ArrowUpRight, CalendarPlus, Navigation } from "lucide-react";
/**
 * ✏️  To change the portrait, replace the file at src/assets/joyce-kawesa.jpg
 *     (or drop a new file in src/assets/ and update the path below).
 */
import portrait from "@/assets/joyce-kawesa.jpg";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

/* ─── Constants ───────────────────────────────────────────────────────────── */

const RSVP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0KofNVIKDYWuQfUw-_fi7hlzA7Eits8XEG_U4R2YBOerMMA/viewform";

const VENUE_NAME = "Forcey Bible Church";
const VENUE_ADDRESS = "2130 E Randolph Rd, Silver Spring, MD 20904, United States";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${VENUE_NAME}, ${VENUE_ADDRESS}`,
)}`;

const EVENT_DATE = new Date("2026-05-31T15:00:00-04:00");
const EVENT_TITLE = "Joyce Kawesa's 90th Birthday Celebration";
const EVENT_DETAILS =
  "Please join us in celebrating Joyce Kawesa on her 90th birthday! A joyful gathering of love, faith and family. Formal dress code. Contact Monica at 301-500-4811. RSVP: " +
  RSVP_URL;
const GCAL_URL =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: "20260531T150000/20260531T190000",
    details: EVENT_DETAILS,
    location: `${VENUE_NAME}, ${VENUE_ADDRESS}`,
  }).toString() +
  "&ctz=America/New_York";

// Escape per RFC 5545: backslash, semicolon, comma, and newlines.
const icsEscape = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const nowStamp = new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\.\d{3}/, "");
const ICS_CONTENT = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Kawesa Family//90th Birthday//EN",
  "BEGIN:VEVENT",
  "UID:joyce-kawesa-90-2026@invite",
  `DTSTAMP:${nowStamp}`,
  "DTSTART;TZID=America/New_York:20260531T150000",
  "DTEND;TZID=America/New_York:20260531T190000",
  `SUMMARY:${icsEscape(EVENT_TITLE)}`,
  `LOCATION:${icsEscape(`${VENUE_NAME}, ${VENUE_ADDRESS}`)}`,
  `DESCRIPTION:${icsEscape(EVENT_DETAILS)}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");
const ICS_HREF = `data:text/calendar;charset=utf-8,${encodeURIComponent(ICS_CONTENT)}`;

/* ─── Hooks ───────────────────────────────────────────────────────────────── */

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

/* ─── Decorative Components ───────────────────────────────────────────────── */

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

/* ─── Animated Countdown Digit ────────────────────────────────────────────── */

function AnimatedDigit({ value }: { value: string }) {
  return (
    <span className="digit-slot inline-flex h-[1.1em] items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Calendar Drawer Content ─────────────────────────────────────────────── */

function CalendarDrawerInner() {
  return (
    <>
      <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted-foreground/20" />
      <div className="px-6 py-8">
        <DrawerTitle className="font-display text-2xl text-[color:var(--violet-deep)] text-center mb-1">
          Save the Date
        </DrawerTitle>
        <DrawerDescription className="text-center text-sm text-muted-foreground mb-8">
          Add Joyce's 90th Birthday to your calendar
        </DrawerDescription>
        <div className="grid gap-3 grid-cols-1 max-w-sm mx-auto">
          <a
            href={GCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 rounded-2xl border border-[color:var(--violet)]/15 bg-white/50 px-6 py-4 text-sm font-medium text-[color:var(--violet-deep)] transition-all duration-200 hover:border-[color:var(--gold)] hover:bg-white/80 hover:shadow-sm active:scale-[0.98]"
          >
            <Calendar
              className="h-4 w-4 text-[color:var(--gold-deep)] transition-transform duration-200 group-hover:scale-110"
              strokeWidth={1.5}
            />
            Google Calendar
          </a>
          <a
            href={ICS_HREF}
            download="joyce-kawesa-90th-birthday.ics"
            className="group flex items-center justify-center gap-3 rounded-2xl border border-[color:var(--violet)]/15 bg-white/50 px-6 py-4 text-sm font-medium text-[color:var(--violet-deep)] transition-all duration-200 hover:border-[color:var(--gold)] hover:bg-white/80 hover:shadow-sm active:scale-[0.98]"
          >
            <CalendarPlus
              className="h-4 w-4 text-[color:var(--gold-deep)] transition-transform duration-200 group-hover:scale-110"
              strokeWidth={1.5}
            />
            Apple / Outlook (.ics)
          </a>
        </div>
      </div>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── Main Component ──────────────────────────────────────────────────────── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function Invite() {
  const c = useCountdown(EVENT_DATE);

  return (
    <main className="invite-screen grain relative overflow-hidden selection:bg-[color:var(--violet)] selection:text-white">
      {/* Decorative florals */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-[14rem] w-[14rem] sm:h-[24rem] sm:w-[24rem] opacity-50">
        <Floral className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-[14rem] w-[14rem] rotate-180 sm:h-[24rem] sm:w-[24rem] opacity-50">
        <Floral className="h-full w-full" />
      </div>

      {/* ── SINGLE-SCREEN LAYOUT ── */}
      <div className="invite-layout relative z-10">
        {/* ─ ROW 1: Header ─ */}
        <div className="flex w-full items-center justify-between px-5 sm:px-8">
          <span className="hairline text-[8px] text-muted-foreground sm:text-[10px]">
            Est. 1936
          </span>
          <span className="hairline text-[8px] text-muted-foreground sm:text-[10px]">№ 90</span>
        </div>

        {/* ─ ROW 2: Primary CTA — RSVP above the portrait ─ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full px-5 mt-2 sm:px-8 sm:mt-3"
        >
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-between rounded-full bg-gradient-violet px-6 py-3 text-primary-foreground shadow-gold transition-all duration-300 hover:shadow-[0_0_60px_oklch(0.74_0.13_80/0.6)] active:scale-[0.98] sm:py-3.5"
          >
            <span className="hairline text-[10px] sm:text-xs">Click here to RSVP</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.6}
            />
          </a>
        </motion.div>

        {/* ─ ROW 3: Portrait + Title overlay ─ */}
        <div className="relative mt-3 flex flex-col items-center sm:mt-4">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="invite-portrait relative"
          >
            <img
              src={portrait}
              alt="Joyce Kawesa, celebrating her 90th birthday"
              className="relative w-full mix-blend-multiply dark:mix-blend-screen"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 25%, transparent 95%)",
                maskImage: "linear-gradient(to bottom, black 25%, transparent 95%)",
              }}
              loading="eager"
            />
          </motion.div>

          {/* Title block — overlaps portrait bottom */}
          <div className="relative -mt-10 text-center sm:-mt-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hairline text-[8px] text-[color:var(--violet-deep)] sm:text-[10px]"
            >
              You're invited to
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-display leading-[0.85] tracking-tight"
            >
              <span className="block text-[20vw] leading-[0.8] sm:text-[12vw] lg:text-[9rem]">
                <span className="text-gold-shimmer tracking-tight">90</span>
                <sup className="font-serif-display align-super text-[0.3em] text-[color:var(--violet-deep)]">
                  th
                </sup>
              </span>
              <span className="font-serif-display block text-base font-light text-[color:var(--violet-deep)] sm:text-2xl lg:text-4xl">
                Birthday{" "}
                <em className="font-display not-italic text-[color:var(--violet)]">Celebration</em>
              </span>
            </motion.h1>

            <Ornament className="mx-auto mt-1.5 h-2 w-24 text-[color:var(--gold-deep)] sm:mt-2 sm:w-32" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display mt-1.5 text-2xl leading-none text-[color:var(--violet-deep)] sm:mt-2 sm:text-4xl lg:text-5xl"
            >
              Joyce <span className="italic">Kawesa</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-serif-display mt-1 text-xs italic text-[color:var(--violet-deep)]/60 sm:mt-2 sm:text-sm"
            >
              Ninety years of love, faith &amp; family
            </motion.p>
          </div>
        </div>

        {/* ─ ROW 4: Details + Countdown — compact horizontal bar ─ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-3 w-full px-5 sm:mt-5 sm:px-8"
        >
          <div className="glass-panel rounded-2xl border border-[color:var(--gold)]/20 px-4 py-3 sm:px-6 sm:py-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              {/* When */}
              <div className="flex items-center gap-2">
                <Calendar
                  className="h-4 w-4 shrink-0 text-[color:var(--gold-deep)]"
                  strokeWidth={1.3}
                />
                <div>
                  <p className="font-serif-display text-[13px] font-medium text-[color:var(--violet-deep)] leading-tight sm:text-sm">
                    Sun, May 31
                  </p>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">3 – 7 PM</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-[color:var(--gold)]/20" />

              {/* Where */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <MapPin
                  className="h-4 w-4 shrink-0 text-[color:var(--gold-deep)]"
                  strokeWidth={1.3}
                />
                <div>
                  <p className="font-serif-display text-[13px] font-medium text-[color:var(--violet-deep)] leading-tight sm:text-sm">
                    {VENUE_NAME}
                  </p>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">Silver Spring, MD</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ─ ROW 5: Countdown ─ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-3 sm:mt-5"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {(
              [
                { v: c.d, l: "Days" },
                { v: c.h, l: "Hrs" },
                { v: c.m, l: "Min" },
                { v: c.s, l: "Sec" },
              ] as const
            ).map((u) => (
              <div key={u.l} className="text-center">
                <div className="font-display text-xl font-light tracking-tight text-[color:var(--violet-deep)] tabular-nums sm:text-3xl">
                  {c.ready ? (
                    String(u.v)
                      .padStart(2, "0")
                      .split("")
                      .map((ch, idx) => <AnimatedDigit key={idx} value={ch} />)
                  ) : (
                    <span className="opacity-30">--</span>
                  )}
                </div>
                <div className="hairline mt-0.5 text-[7px] text-muted-foreground sm:text-[8px]">
                  {u.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─ ROW 6: Secondary CTAs ─ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-3 w-full px-5 sm:mt-4 sm:px-8"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  type="button"
                  className="group flex items-center justify-center gap-2 rounded-full border border-[color:var(--violet)]/15 bg-background/40 px-4 py-2.5 text-[color:var(--violet-deep)] transition-all duration-200 hover:bg-white/60 hover:border-[color:var(--violet)]/30 active:scale-[0.98]"
                >
                  <CalendarPlus
                    className="h-3.5 w-3.5 text-[color:var(--gold-deep)] transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <span className="hairline text-[8px] sm:text-[10px]">Add to Calendar</span>
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-background/90 backdrop-blur-2xl border-t border-[color:var(--gold)]/20">
                <CalendarDrawerInner />
              </DrawerContent>
            </Drawer>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/20 bg-background/40 px-4 py-2.5 text-[color:var(--violet-deep)] transition-all duration-200 hover:bg-white/60 hover:border-[color:var(--gold)]/40 active:scale-[0.98]"
            >
              <Navigation
                className="h-3.5 w-3.5 text-[color:var(--gold-deep)] transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
              <span className="hairline text-[8px] sm:text-[10px]">Get Directions</span>
            </a>
          </div>
        </motion.div>

        {/* ─ ROW 7: Footer info ─ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-3 flex flex-col items-center gap-0.5 sm:mt-4"
        >
          <p className="text-[9px] text-muted-foreground sm:text-[11px]">
            Formal attire · RSVP by May 15 · Monica{" "}
            <a
              href="tel:+13015004811"
              className="font-medium text-[color:var(--violet)] underline-offset-4 hover:underline"
            >
              301-500-4811
            </a>
          </p>
          <p className="text-[8px] text-muted-foreground/50 sm:text-[9px]">
            With love,{" "}
            <span className="font-serif-display italic text-[color:var(--violet-deep)]/40">
              The Kawesa Family
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
