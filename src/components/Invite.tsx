import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Clock, Heart, ArrowUpRight } from "lucide-react";
import portrait from "@/assets/joyce-invite-reference.png";

const RSVP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0KofNVIKDYWuQfUw-_fi7hlzA7Eits8XEG_U4R2YBOerMMA/viewform";
const EVENT_DATE = new Date("2026-05-31T15:00:00-04:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { d: 0, h: 0, m: 0, s: 0, ready: false };
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, ready: true };
}

const Ornament = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={className} aria-hidden>
    <path
      d="M0 10 H80 M120 10 H200"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />
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
    <g opacity="0.55">
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

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      {/* Floral corners */}
      <Floral className="pointer-events-none absolute -left-16 -top-16 h-[28rem] w-[28rem] rotate-0" />
      <Floral className="pointer-events-none absolute -right-16 -bottom-16 h-[28rem] w-[28rem] rotate-180" />

      {/* Top hairline bar */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8 sm:px-12">
        <span className="hairline text-[10px] text-muted-foreground">
          Est. 1936 · Honored Today
        </span>
        <span className="hairline text-[10px] text-muted-foreground">
          Invitation № 90
        </span>
      </div>

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-12 pb-24 sm:px-12 lg:grid-cols-12 lg:gap-16 lg:pt-20">
        {/* Left: editorial */}
        <div className="lg:col-span-7 lg:pt-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hairline text-xs text-[color:var(--violet-deep)]"
          >
            Please join us for a
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="font-display mt-6 leading-[0.85] tracking-tight"
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="block text-[24vw] leading-[0.8] sm:text-[18vw] lg:text-[14rem]"
            >
              <span className="text-gold">90</span>
              <sup className="font-serif-display align-super text-[0.35em] text-[color:var(--violet-deep)]">
                th
              </sup>
            </motion.span>
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-serif-display mt-2 block text-4xl font-light text-[color:var(--violet-deep)] sm:text-5xl lg:text-6xl"
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
            className="mt-10 flex items-center gap-4 text-[color:var(--gold-deep)]"
          >
            <Ornament className="h-3 w-40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-8"
          >
            <p className="hairline text-[11px] text-muted-foreground">Honoring</p>
            <h2 className="font-display mt-3 text-6xl leading-none text-[color:var(--violet-deep)] sm:text-7xl lg:text-8xl">
              Joyce <span className="italic">Kawesa</span>
            </h2>
            <p className="font-serif-display mt-6 max-w-md text-2xl italic leading-snug text-[color:var(--violet-deep)]/80">
              A life of love, faith &amp; blessings — ninety years, gently held and
              graciously given.
            </p>
          </motion.div>
        </div>

        {/* Right: framed portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 1.2 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 lg:pt-12"
        >
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 rounded-[2px] bg-gradient-violet opacity-20 blur-2xl" />
            <div className="relative overflow-hidden border border-[color:var(--gold)]/40 bg-card p-3 shadow-elegant">
              <div className="absolute inset-0 border border-[color:var(--gold)]/20 m-[10px]" />
              <img
                src={portrait}
                alt="Joyce Kawesa, honoree of the 90th birthday celebration"
                className="relative w-full"
                loading="eager"
              />
            </div>
            <div className="mt-4 flex items-center justify-between px-2">
              <span className="hairline text-[10px] text-muted-foreground">
                Joyce, 2026
              </span>
              <span className="hairline text-[10px] text-[color:var(--gold-deep)]">
                Ninety
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Details */}
      <section className="relative z-10 border-y border-[color:var(--gold)]/30 bg-secondary/40 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[color:var(--gold)]/30 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-12 lg:grid-cols-4">
          {[
            { icon: MapPin, label: "Location", value: "Forcey Bible Church", sub: "Sanctuary Hall" },
            { icon: Calendar, label: "Date", value: "Sunday", sub: "May 31, 2026" },
            { icon: Clock, label: "Time", value: "3:00 — 7:00 pm", sub: "Reception to follow" },
            { icon: Heart, label: "Attire", value: "Garden Formal", sub: "Lavender encouraged" },
          ].map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="px-6 py-10"
            >
              <d.icon className="h-5 w-5 text-[color:var(--gold-deep)]" strokeWidth={1.2} />
              <p className="hairline mt-6 text-[10px] text-muted-foreground">{d.label}</p>
              <p className="font-serif-display mt-2 text-2xl text-[color:var(--violet-deep)]">
                {d.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{d.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Countdown + RSVP */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="hairline text-[11px] text-[color:var(--gold-deep)]">
              The countdown begins
            </p>
            <div className="mt-6 grid grid-cols-4 gap-4 sm:gap-8">
              {[
                { v: c.d, l: "Days" },
                { v: c.h, l: "Hours" },
                { v: c.m, l: "Minutes" },
                { v: c.s, l: "Seconds" },
              ].map((u) => (
                <div key={u.l} className="text-center">
                  <div className="font-display text-5xl text-[color:var(--violet-deep)] sm:text-6xl tabular-nums">
                    {c.ready ? String(u.v).padStart(2, "0") : "—"}
                  </div>
                  <div className="hairline mt-2 text-[10px] text-muted-foreground">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
            <Ornament className="mt-10 h-3 w-48 text-[color:var(--gold-deep)]" />
            <p className="font-serif-display mt-8 max-w-lg text-2xl italic leading-snug text-[color:var(--violet-deep)]/80">
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
            <div className="relative rounded-2xl border border-[color:var(--gold)]/40 bg-card/80 p-10 shadow-elegant backdrop-blur">
              <p className="hairline text-[11px] text-[color:var(--gold-deep)]">
                Kindly Respond
              </p>
              <h3 className="font-display mt-4 text-4xl text-[color:var(--violet-deep)]">
                Reserve your seat
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Please RSVP by May 1st so we may set a place for you at this once-in-a-lifetime celebration.
              </p>
              <a
                href={RSVP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center justify-between gap-6 rounded-full bg-gradient-violet px-8 py-5 text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
              >
                <span className="hairline text-xs">RSVP via Google Forms</span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
              </a>
              <p className="mt-6 text-xs text-muted-foreground">
                With love, <span className="italic">The Kawesa Family</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[color:var(--gold)]/30 px-6 py-10 text-center sm:px-12">
        <p className="hairline text-[10px] text-muted-foreground">
          Joyce Kawesa · Ninety Years · 1936 — 2026
        </p>
      </footer>
    </main>
  );
}
