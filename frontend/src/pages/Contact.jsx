import React from "react";
import { profile } from "@/data/portfolio";
import { Squiggle, Sparkle, Rose, Tape, HandArrow } from "@/components/Decorations";
import { Github, Linkedin, Globe, Mail, MapPin, Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12" data-testid="contact-page">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ contact</div>
          <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
            the <span className="italic">door</span> is open.
          </h1>
          <Squiggle width={220} className="mt-3" />
          <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
            i don't have a contact form because forms feel like talking to a wall.
            here's where i actually am.
          </p>

          <div className="mt-10 space-y-5">
            <a href={profile.github} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-[var(--border-soft)] pb-4" data-testid="contact-github">
              <Github size={20} className="text-plum" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum">github</div>
                <div className="font-serif text-2xl text-ink group-hover:text-plum transition-colors">github.com/AnitaGeorge404</div>
              </div>
              <span className="font-hand text-plum text-lg group-hover:translate-x-1 transition-transform">↗</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-[var(--border-soft)] pb-4" data-testid="contact-linkedin">
              <Linkedin size={20} className="text-plum" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum">linkedin</div>
                <div className="font-serif text-2xl text-ink group-hover:text-plum transition-colors">in/anita-george</div>
              </div>
              <span className="font-hand text-plum text-lg group-hover:translate-x-1 transition-transform">↗</span>
            </a>
            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-[var(--border-soft)] pb-4" data-testid="contact-portfolio">
              <Globe size={20} className="text-plum" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum">portfolio (v0)</div>
                <div className="font-serif text-2xl text-ink group-hover:text-plum transition-colors">anitageorge.vercel.app</div>
              </div>
              <span className="font-hand text-plum text-lg group-hover:translate-x-1 transition-transform">↗</span>
            </a>
            <div className="group flex items-center gap-4 border-b border-[var(--border-soft)] pb-4">
              <MapPin size={20} className="text-plum" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum">based</div>
                <div className="font-serif text-2xl text-ink">Kerala, India</div>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-md">
            <HandArrow className="rotate-[-30deg]" />
            <p className="font-hand text-plum text-2xl mt-2">
              — write me a long letter, not a quick message.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="relative bg-white/85 border border-[var(--border-soft)] rounded-sm p-6" data-testid="contact-card">
            <Tape className="-top-3 left-10" w={90} rotate={-8} />
            <Tape className="-top-3 right-10" w={70} rotate={6} />
            <Rose className="absolute -bottom-8 -right-6 opacity-80" size={90} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">paper card</div>
            <h3 className="font-serif text-4xl text-ink mt-1 leading-tight">{profile.name}</h3>
            <div className="font-hand text-plum text-xl">{profile.tagline}</div>
            <Squiggle width={160} className="mt-3" />
            <dl className="mt-4 grid grid-cols-3 gap-y-3 text-sm">
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">she/her</dt>
              <dd className="col-span-2 text-ink-soft italic">— softly</dd>
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">role</dt>
              <dd className="col-span-2 text-ink">{profile.role}</dd>
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">studying</dt>
              <dd className="col-span-2 text-ink">{profile.studying}</dd>
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">timezone</dt>
              <dd className="col-span-2 text-ink">IST · awake at 2am</dd>
            </dl>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tag border border-lavender text-xs">
              <Sparkles size={12} className="text-sage" />
              <span className="text-plum">currently</span>
              <span className="text-ink">open to research collabs</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
