import React from "react";
import { profile } from "@/data/portfolio";
import { Squiggle, Sparkle, CherryBlossom, Tape, HandArrow } from "@/components/Decorations";
import { Github, Linkedin, Globe, Mail, MapPin, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightGlassSurface } from "@/components/MidnightPrimitives";
import { HerbariumFieldLabel, HerbariumSpecimenSheet, SpecimenFieldLabel } from "@/components/HerbariumPrimitives";

function HerbariumContact() {
  const links = [
    { icon: <Mail size={16} />, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false, testid: "contact-email" },
    { icon: <Github size={16} />, label: "GitHub", value: "github.com/AnitaGeorge404", href: profile.github, external: true, testid: "contact-github" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", value: "in/anita-george", href: profile.linkedin, external: true, testid: "contact-linkedin" },
    { icon: <Globe size={16} />, label: "Portfolio", value: "anitageorge.vercel.app", href: profile.portfolio, external: true, testid: "contact-portfolio" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14" data-testid="contact-page">
      <HerbariumFieldLabel>Field correspondence</HerbariumFieldLabel>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Anita George</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)]">{profile.degree} &middot; {profile.universityShort}</p>

      <HerbariumSpecimenSheet id="CORRESPONDENCE" title="Field station" className="mt-8">
        {links.map((l) => (
          <a
            key={l.testid}
            href={l.href}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noreferrer" : undefined}
            data-testid={l.testid}
            className="flex items-center gap-3 py-3 border-b border-[var(--specimen-border)] last:border-b-0 text-[var(--specimen-ink)] hover:text-[var(--burgundy)] transition-colors"
          >
            <span className="text-[var(--specimen-ink-soft)]">{l.icon}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--specimen-ink-soft)] w-20 shrink-0">{l.label}</span>
            <span className="text-[15px]">{l.value}</span>
          </a>
        ))}
      </HerbariumSpecimenSheet>

      <p className="mt-6 text-sm text-[var(--ink-soft)]">Currently open to collaborations.</p>
    </div>
  );
}

function MidnightContact() {
  const links = [
    { icon: <Mail size={16} />, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false, testid: "contact-email" },
    { icon: <Github size={16} />, label: "GitHub", value: "github.com/AnitaGeorge404", href: profile.github, external: true, testid: "contact-github" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", value: "in/anita-george", href: profile.linkedin, external: true, testid: "contact-linkedin" },
    { icon: <Globe size={16} />, label: "Portfolio", value: "anitageorge.vercel.app", href: profile.portfolio, external: true, testid: "contact-portfolio" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14" data-testid="contact-page">
      <MidnightMetaLine signal>Open a channel</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Anita George</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)]">{profile.degree} &middot; {profile.universityShort}</p>

      <MidnightGlassSurface level={2} className="mt-8 p-2">
        {links.map((l) => (
          <a
            key={l.testid}
            href={l.href}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noreferrer" : undefined}
            data-testid={l.testid}
            className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-soft)] last:border-b-0 text-[var(--ink)] hover:text-[var(--decoration-primary)] transition-colors"
          >
            <span className="text-[var(--ink-soft)]">{l.icon}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-soft)] w-20 shrink-0">{l.label}</span>
            <span className="text-[15px]">{l.value}</span>
          </a>
        ))}
      </MidnightGlassSurface>

      <p className="mt-6 text-sm text-[var(--ink-soft)]">Currently open to collaborations.</p>
    </div>
  );
}

function ScholarContact() {
  const links = [
    { icon: <Mail size={16} />, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false, testid: "contact-email" },
    { icon: <Github size={16} />, label: "GitHub", value: "github.com/AnitaGeorge404", href: profile.github, external: true, testid: "contact-github" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", value: "in/anita-george", href: profile.linkedin, external: true, testid: "contact-linkedin" },
    { icon: <Globe size={16} />, label: "Portfolio", value: "anitageorge.vercel.app", href: profile.portfolio, external: true, testid: "contact-portfolio" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12" data-testid="contact-page">
      <ScholarMetaLine>Anita George · Contact</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Anita George</h1>
      <p className="mt-1 text-[15px] text-[var(--ink-soft)]">
        {profile.degree} &middot; {profile.universityShort}
      </p>
      <p className="mt-1 text-[15px] text-[var(--ink-soft)]">Kerala, India</p>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Contact</ScholarMetaLine>
        <div className="mt-2">
          {links.map((l) => (
            <a
              key={l.testid}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              data-testid={l.testid}
              className="flex items-center gap-3 py-3 border-b border-[var(--border-soft)] text-[var(--ink)] hover:text-[var(--link)] transition-colors"
            >
              <span className="text-[var(--ink-soft)]">{l.icon}</span>
              <span className="font-mono text-[11px] text-[var(--ink-soft)] w-20 shrink-0">{l.label}</span>
              <span className="text-[15px]">{l.value}</span>
            </a>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--ink-soft)]">Currently open to collaborations.</p>
    </div>
  );
}

export default function Contact() {
  const { currentTheme } = useTheme();
  if (currentTheme === "search") {
    return <ScholarContact />;
  }
  if (currentTheme === "midnight") {
    return <MidnightContact />;
  }
  if (currentTheme === "herbarium") {
    return <HerbariumContact />;
  }
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12" data-testid="contact-page">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--plum)]">/ contact</div>
          <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
            the <span className="italic" style={{ color: "#C96B84" }}>door</span> is open.
          </h1>
          <Squiggle width={220} className="mt-3" color="#EDAABB" />
          <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
            i don&apos;t have a contact form because forms feel like talking to a wall.
            here&apos;s where i actually am.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                href: `mailto:${profile.email}`,
                icon: <Mail size={20} className="text-[var(--plum)]" />,
                label: "email",
                value: profile.email,
                testid: "contact-email",
                external: false,
              },
              {
                href: profile.github,
                icon: <Github size={20} className="text-[var(--plum)]" />,
                label: "github",
                value: "github.com/AnitaGeorge404",
                testid: "contact-github",
                external: true,
              },
              {
                href: profile.linkedin,
                icon: <Linkedin size={20} className="text-[var(--plum)]" />,
                label: "linkedin",
                value: "in/anita-george",
                testid: "contact-linkedin",
                external: true,
              },
              {
                href: profile.portfolio,
                icon: <Globe size={20} className="text-[var(--plum)]" />,
                label: "portfolio",
                value: "anitageorge.vercel.app",
                testid: "contact-portfolio",
                external: true,
              },
            ].map((item) => (
              <a
                key={item.testid}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="group flex items-center gap-4 border-b border-[var(--border-soft)] pb-4 hover:bg-[var(--bg-petal)]/30 rounded-lg px-2 transition-colors"
                data-testid={item.testid}
              >
                {item.icon}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">{item.label}</div>
                  <div className="font-serif text-2xl text-ink group-hover:text-[var(--plum)] transition-colors truncate">
                    {item.value}
                  </div>
                </div>
                <span className="font-hand text-[var(--rose)] text-lg group-hover:translate-x-1 transition-transform">↗</span>
              </a>
            ))}

            <div className="group flex items-center gap-4 border-b border-[var(--border-soft)] pb-4">
              <MapPin size={20} className="text-[var(--plum)]" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">based</div>
                <div className="font-serif text-2xl text-ink">Kerala, India</div>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-md">
            <HandArrow className="rotate-[-30deg]" color="#C96B84" />
            <p className="font-hand text-[var(--plum)] text-2xl mt-2">
              — write me a long letter, not a quick message.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div
            className="relative bg-white/85 border border-[var(--border-soft)] rounded-3xl p-6"
            data-testid="contact-card"
          >
            <span
              className="tape tape-pink absolute -top-3 left-10"
              style={{ width: 88, height: 20, transform: "rotate(-8deg)" }}
              aria-hidden
            />
            <span
              className="tape tape-mint absolute -top-3 right-10"
              style={{ width: 64, height: 20, transform: "rotate(6deg)" }}
              aria-hidden
            />
            <CherryBlossom className="absolute -bottom-8 -right-4 opacity-75" size={88} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">paper card</div>
            <h3 className="font-serif text-4xl text-ink mt-1 leading-tight">{profile.name}</h3>
            <div className="font-hand text-[var(--rose)] text-xl">{profile.tagline}</div>
            <Squiggle width={160} className="mt-3" color="#EDAABB" />
            <dl className="mt-4 grid grid-cols-3 gap-y-3 text-sm">
              {[
                { k: "she/her", v: "— full-stack · design-aware", italic: true },
                { k: "degree", v: profile.degree },
                { k: "at", v: `${profile.universityShort} · ${profile.years}` },
                { k: "gpa", v: profile.gpa },
                { k: "timezone", v: "IST · India" },
              ].map(({ k, v, italic }) => (
                <React.Fragment key={k}>
                  <dt className="col-span-1 text-[var(--plum)] text-[11px] uppercase tracking-[0.2em]">{k}</dt>
                  <dd className={`col-span-2 text-ink${italic ? " italic text-ink-soft" : ""}`}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-petal)] border border-[var(--border-soft)] text-xs">
              <Sparkles size={12} className="text-rose" />
              <span className="text-[var(--plum)]">currently</span>
              <span className="text-ink">open to collaborations</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
