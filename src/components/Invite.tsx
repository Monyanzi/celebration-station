import { motion } from "motion/react";
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
        <div className="flex w-full items-center justify-between">
          <span className="hairline text-xs text-muted-foreground">Est. 1936</span>
          <span className="hairline text-xs text-muted-foreground">№ 90</span>
        </div>

        {/* ─ ROW 2: Primary CTA — RSVP above the portrait ─ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full"
        >
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-between rounded-full bg-gradient-violet px-6 py-3.5 text-primary-foreground shadow-gold transition-all duration-300 hover:shadow-[0_0_60px_oklch(0.74_0.13_80/0.6)] active:scale-[0.98] sm:py-4"
          >
            <span className="hairline text-sm sm:text-base">Click here to RSVP · by May 15</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.6}
            />
          </a>
        </motion.div>

        {/* ─ ROW 3: Portrait + Title overlay ─ */}
        <div className="relative flex flex-col items-center">
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
              className="hairline text-xs text-[color:var(--violet-deep)] sm:text-sm"
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
              <span className="font-serif-display block text-xl font-light text-[color:var(--violet-deep)] sm:text-3xl lg:text-4xl">
                Birthday{" "}
                <em className="font-display not-italic text-[color:var(--violet)]">Celebration</em>
              </span>
            </motion.h1>

            <Ornament className="mx-auto mt-2 h-2.5 w-28 text-[color:var(--gold-deep)] sm:mt-3 sm:w-36" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-serif-display mt-2 text-4xl font-semibold leading-none text-[color:var(--violet-deep)] sm:mt-3 sm:text-5xl lg:text-6xl"
            >
              Joyce <span className="italic">Kawesa</span>
            </motion.p>
          </div>
        </div>

        {/* ─ ROW 4: Date + Add to Calendar card ─ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full"
        >
          <Drawer>
            <DrawerTrigger asChild>
              <button
                type="button"
                className="group w-full glass-panel rounded-2xl border border-[color:var(--gold)]/20 px-5 py-3.5 sm:px-6 sm:py-4 text-left transition-all duration-200 hover:border-[color:var(--gold)]/40 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5">
                      <Calendar className="h-5 w-5 text-[color:var(--gold-deep)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-serif-display text-lg font-semibold text-[color:var(--violet-deep)] leading-tight sm:text-xl">
                        Sunday, May 31, 2026
                      </p>
                      <p className="text-base text-muted-foreground sm:text-lg">3:00 PM – 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[color:var(--violet)] transition-transform duration-200 group-hover:translate-x-0.5">
                    <CalendarPlus className="h-4 w-4" strokeWidth={1.5} />
                    <span className="hidden sm:inline text-xs font-medium">Save</span>
                  </div>
                </div>
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-background/90 backdrop-blur-2xl border-t border-[color:var(--gold)]/20">
              <CalendarDrawerInner />
            </DrawerContent>
          </Drawer>
        </motion.div>

        {/* ─ ROW 5: Location + Get Directions card ─ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="w-full"
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full glass-panel rounded-2xl border border-[color:var(--gold)]/20 px-5 py-3.5 sm:px-6 sm:py-4 transition-all duration-200 hover:border-[color:var(--gold)]/40 active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5">
                  <MapPin className="h-5 w-5 text-[color:var(--gold-deep)]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif-display text-lg font-semibold text-[color:var(--violet-deep)] leading-tight sm:text-xl">
                    {VENUE_NAME}
                  </p>
                  <p className="text-base text-muted-foreground sm:text-lg">Silver Spring, MD</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[color:var(--violet)] transition-transform duration-200 group-hover:translate-x-0.5">
                <Navigation className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden sm:inline text-xs font-medium">Map</span>
              </div>
            </div>
          </a>
        </motion.div>

        {/* ─ ROW 6: Footer info ─ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center gap-0.5"
        >
          <p className="text-sm text-muted-foreground sm:text-base">
            Formal attire · Contact Monica{" "}
            <a
              href="tel:+13015004811"
              className="font-medium text-[color:var(--violet)] underline-offset-4 hover:underline"
            >
              301-500-4811
            </a>
          </p>
          <p className="text-xs text-muted-foreground/50 sm:text-sm">
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
