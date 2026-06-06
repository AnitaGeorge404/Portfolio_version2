import React from "react";
import { profile } from "@/data/portfolio";
import { Squiggle, Sparkle, CherryBlossom, Tape, HandArrow } from "@/components/Decorations";
import { Github, Linkedin, Globe, Mail, MapPin, Sparkles } from "lucide-react";

export default function Contact() {
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
