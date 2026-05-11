import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { MapPin, Calendar, Heart, ArrowUpRight, CalendarPlus, Navigation } from "lucide-react";
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

const DETAILS = [
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
    label: "Date & Time",
    value: "Sunday, May 31, 2026",
    sub: "3:00 pm to 7:00 pm",
    href: undefined as string | undefined,
  },
];

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

/* ─── Desktop Magnetic Hover ──────────────────────────────────────────────── */

function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Calendar Drawer Content (shared) ────────────────────────────────────── */

function CalendarDrawerInner({ variant = "full" }: { variant?: "full" | "compact" }) {
  return (
    <>
      <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted-foreground/20" />
      <div className={variant === "full" ? "px-6 py-8 sm:px-12 sm:py-10" : "px-6 py-8"}>
        <DrawerTitle className="font-display text-2xl text-[color:var(--violet-deep)] text-center mb-1">
          Save the Date
        </DrawerTitle>
        <DrawerDescription className="text-center text-sm text-muted-foreground mb-8">
          Add Joyce's 90th Birthday to your calendar
        </DrawerDescription>
        <div
          className={`grid gap-3 ${variant === "full" ? "grid-cols-1 sm:grid-cols-2 max-w-md mx-auto" : "grid-cols-1"}`}
        >
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

  // Parallax
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 50 });
  const floralY1 = useTransform(smoothProgress, [0, 1], [0, -120]);
  const floralY2 = useTransform(smoothProgress, [0, 1], [0, 120]);

  // Mobile Pill Visibility
  const [showPill, setShowPill] = useState(true);
  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof window === "undefined") return;
    const atBottom = window.innerHeight + current >= document.body.offsetHeight - 200;
    if (atBottom) {
      setShowPill(true);
      return;
    }
    const previous = scrollY.getPrevious() || 0;
    if (current > previous && current > 150) {
      setShowPill(false);
    } else {
      setShowPill(true);
    }
  });

  const details = DETAILS;

  return (
    <main className="grain relative min-h-screen overflow-hidden selection:bg-[color:var(--violet)] selection:text-white">
      {/* Parallax florals — GPU-promoted */}
      <motion.div
        style={{ y: floralY1, willChange: "transform" }}
        className="pointer-events-none absolute -left-20 -top-20 h-[18rem] w-[18rem] sm:h-[32rem] sm:w-[32rem]"
      >
        <Floral className="h-full w-full" />
      </motion.div>
      <motion.div
        style={{ y: floralY2, willChange: "transform" }}
        className="pointer-events-none absolute -right-20 -bottom-20 h-[18rem] w-[18rem] rotate-180 sm:h-[32rem] sm:w-[32rem]"
      >
        <Floral className="h-full w-full" />
      </motion.div>

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6 sm:px-12 sm:pt-8">
        <span className="hairline text-[9px] text-muted-foreground sm:text-[10px]">Est. 1936</span>
        <span className="hairline text-[9px] text-muted-foreground sm:text-[10px]">№ 90</span>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pt-6 sm:px-12 sm:pt-10">
        {/* Portrait with gradient fade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-lg"
        >
          <img
            src={portrait}
            alt="Joyce Kawesa, celebrating her 90th birthday"
            className="relative w-full mix-blend-multiply dark:mix-blend-screen"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 92%)",
              maskImage: "linear-gradient(to bottom, black 35%, transparent 92%)",
            }}
            loading="eager"
          />
        </motion.div>

        {/* Text content — overlapping portrait bottom */}
        <div className="relative -mt-12 text-center sm:-mt-20 lg:-mt-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
            className="hairline text-[11px] text-[color:var(--violet-deep)] sm:text-xs"
          >
            You're invited to a
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-display mt-3 leading-[0.85] tracking-tight sm:mt-5"
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 40, damping: 25, delay: 0.35 }}
              className="block text-[32vw] leading-[0.8] sm:text-[16vw] lg:text-[12rem]"
            >
              <span className="text-gold-shimmer tracking-tight">90</span>
              <sup className="font-serif-display align-super text-[0.32em] text-[color:var(--violet-deep)]">
                th
              </sup>
            </motion.span>
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 25, delay: 0.5 }}
              className="font-serif-display mt-2 block text-2xl font-light text-[color:var(--violet-deep)] sm:mt-3 sm:text-5xl lg:text-6xl"
            >
              Birthday{" "}
              <em className="font-display not-italic text-[color:var(--violet)]">Celebration</em>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.7 }}
            className="mx-auto mt-6 flex justify-center text-[color:var(--gold-deep)] sm:mt-8"
          >
            <Ornament className="h-3 w-32 sm:w-40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.8 }}
            className="mt-5 sm:mt-7"
          >
            <p className="hairline text-[11px] text-muted-foreground">Honoring</p>
            <h2 className="font-display mt-3 text-5xl leading-none text-[color:var(--violet-deep)] sm:text-7xl lg:text-8xl">
              Joyce <span className="italic">Kawesa</span>
            </h2>
            <p className="font-serif-display mx-auto mt-5 max-w-md text-lg leading-relaxed italic text-[color:var(--violet-deep)]/80 sm:text-2xl sm:leading-snug">
              Celebrating ninety beautiful years of love, faith and family. Come rejoice with us!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="relative z-10 mt-12 border-y border-[color:var(--gold)]/20 glass-panel sm:mt-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[color:var(--gold)]/15 px-5 sm:grid-cols-2 sm:px-12 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {details.map((d, i) => {
            const Inner = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5">
                  <d.icon className="h-5 w-5 text-[color:var(--gold-deep)]" strokeWidth={1.3} />
                </div>
                <p className="hairline mt-5 text-[10px] text-muted-foreground">{d.label}</p>
                <p className="font-serif-display mt-2 text-2xl text-[color:var(--violet-deep)] sm:text-3xl">
                  {d.value}
                </p>
                <p className="mt-1 text-base text-muted-foreground sm:text-sm">{d.sub}</p>
                {d.cta && (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--violet)] underline-offset-4 transition-all duration-200 group-hover:underline group-hover:gap-2">
                    <Navigation className="h-4 w-4" strokeWidth={1.5} />
                    {d.cta}
                  </span>
                )}
              </>
            );
            return (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  delay: i * 0.12,
                }}
                className="px-4 py-10 sm:px-6 sm:py-12"
              >
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-2xl p-2 -m-2 transition-colors duration-200 hover:bg-[color:var(--gold)]/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div className="h-full p-2 -m-2">{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── COUNTDOWN + ACTIONS ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-12 sm:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Countdown */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="hairline text-[11px] text-[color:var(--gold-deep)]"
            >
              The celebration is almost here
            </motion.p>
            <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-8">
              {(
                [
                  { v: c.d, l: "Days" },
                  { v: c.h, l: "Hours" },
                  { v: c.m, l: "Min" },
                  { v: c.s, l: "Sec" },
                ] as const
              ).map((u, i) => (
                <motion.div
                  key={u.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    delay: i * 0.08,
                  }}
                  className="text-center"
                >
                  <div className="font-display text-4xl font-light tracking-tight text-[color:var(--violet-deep)] tabular-nums sm:text-6xl">
                    {c.ready ? (
                      String(u.v)
                        .padStart(2, "0")
                        .split("")
                        .map((ch, idx) => (
                          <AnimatedDigit key={idx} value={ch} />
                        ))
                    ) : (
                      <span className="opacity-30">--</span>
                    )}
                  </div>
                  <div className="hairline mt-3 text-[10px] text-muted-foreground">{u.l}</div>
                </motion.div>
              ))}
            </div>
            <Ornament className="mx-auto mt-10 h-3 w-40 text-[color:var(--gold-deep)] sm:mt-12 sm:w-48 lg:mx-0" />
            <p className="font-serif-display mt-8 mx-auto max-w-lg text-lg italic leading-relaxed text-[color:var(--violet-deep)]/80 sm:text-2xl sm:leading-snug lg:mx-0">
              "Your presence is the greatest gift of all."
            </p>
          </div>

          {/* RSVP Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-violet opacity-[0.07] blur-3xl" />
            <div className="glass-panel relative rounded-[2rem] border border-[color:var(--gold)]/20 p-8 sm:p-12">
              <p className="hairline text-[11px] text-[color:var(--gold-deep)]">Kindly Respond</p>
              <h3 className="font-display mt-4 text-3xl text-[color:var(--violet-deep)] sm:text-5xl">
                Join the celebration
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[15px]">
                Kindly respond by May 15th. Formal dress code.
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-[15px]">
                Contact Monica at{" "}
                <a
                  href="tel:+13015004811"
                  className="font-medium text-[color:var(--violet)] underline-offset-4 hover:underline"
                >
                  301-500-4811
                </a>
              </p>

              {/* Primary CTA */}
              <MagneticButton className="mt-8">
                <a
                  href={RSVP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-between gap-4 rounded-full bg-gradient-violet px-8 py-5 text-primary-foreground shadow-gold transition-all duration-300 hover:shadow-[0_0_60px_oklch(0.74_0.13_80/0.6)] active:scale-[0.98]"
                >
                  <span className="hairline text-xs sm:text-sm">RSVP Now</span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.6}
                  />
                </a>
              </MagneticButton>

              {/* Secondary Actions */}
              <div className="mt-4 flex gap-3">
                <Drawer>
                  <DrawerTrigger asChild>
                    <button
                      type="button"
                      className="group flex flex-1 items-center justify-center gap-2.5 rounded-full border border-[color:var(--violet)]/15 bg-background/40 px-5 py-4 text-[color:var(--violet-deep)] transition-all duration-200 hover:bg-white/60 hover:border-[color:var(--violet)]/30 active:scale-[0.98]"
                    >
                      <CalendarPlus
                        className="h-4 w-4 text-[color:var(--gold-deep)] transition-transform duration-200 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                      <span className="hairline text-[10px] sm:text-xs">Calendar</span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-background/90 backdrop-blur-2xl border-t border-[color:var(--gold)]/20">
                    <CalendarDrawerInner variant="full" />
                  </DrawerContent>
                </Drawer>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-full border border-[color:var(--gold)]/20 bg-background/40 px-5 py-4 text-[color:var(--violet-deep)] transition-all duration-200 hover:bg-white/60 hover:border-[color:var(--gold)]/40 active:scale-[0.98]"
                >
                  <Navigation
                    className="h-4 w-4 text-[color:var(--gold-deep)] transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                  <span className="hairline text-[10px] sm:text-xs">Directions</span>
                </a>
              </div>

              <p className="mt-8 text-center text-xs text-muted-foreground">
                With love,{" "}
                <span className="font-serif-display text-sm italic text-[color:var(--violet-deep)]/60">
                  The Kawesa Family
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-[color:var(--gold)]/20 px-5 py-12 sm:px-12 sm:py-16">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Heart
              className="h-5 w-5 text-[color:var(--rose)]"
              strokeWidth={1.3}
              fill="oklch(0.7 0.12 350 / 0.3)"
            />
          </motion.div>
          <Ornament className="h-3 w-24 text-[color:var(--gold-deep)]/40" />
          <p className="hairline text-[10px] text-muted-foreground">
            Celebrating Joyce Kawesa · 90 Years Young
          </p>
        </div>
      </footer>

      {/* ── MOBILE FLOATING ACTION PILL ── */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: showPill ? 0 : 100,
          opacity: showPill ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none lg:hidden"
      >
        <div className="glass-panel flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/30 p-1.5 shadow-elegant pointer-events-auto">
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-cta flex items-center gap-2 rounded-full bg-gradient-violet px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold transition-transform active:scale-95"
          >
            RSVP <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </a>

          <Drawer>
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Add to Calendar"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--violet)]/15 bg-white/50 text-[color:var(--violet-deep)] transition-transform active:scale-90"
              >
                <CalendarPlus className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-background/95 backdrop-blur-2xl border-t border-[color:var(--gold)]/30">
              <CalendarDrawerInner variant="compact" />
            </DrawerContent>
          </Drawer>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open location in Google Maps"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/20 bg-white/50 text-[color:var(--violet-deep)] transition-transform active:scale-90"
          >
            <Navigation className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </a>
        </div>
      </motion.div>
      <div className="h-24 lg:hidden" aria-hidden />
    </main>
  );
}
