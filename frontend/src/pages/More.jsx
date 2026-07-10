import React from "react";
import { Link } from "react-router-dom";
import { Squiggle, Sparkle, Tape, HandArrow } from "@/components/Decorations";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightGlassSurface } from "@/components/MidnightPrimitives";
import { profile, skills, experience, achievements, themes } from "@/data/portfolio";

function MidnightMore() {
  const links = [
    { to: "/archive", label: "System history" },
    { to: "/research", label: "Analysis workspace" },
    { to: "/ai-mode", label: "AI intelligence interface" },
    { to: "/images", label: "Visual intelligence index" },
    { to: "/videos", label: "Motion intelligence index" },
    { to: "/shopping", label: "Personal-interest index" },
  ];
  const sections = [
    ["Education", <>
      <div className="text-[15px] text-[var(--ink)]">{profile.degree} &middot; {profile.universityShort}</div>
      <div className="text-[13px] text-[var(--ink-soft)]">{profile.years} &middot; GPA {profile.gpa}</div>
    </>],
    ["Skills", <div className="space-y-1.5">
      {skills.map((g) => (
        <div key={g.group} className="text-[14px]">
          <span className="font-mono text-[10px] uppercase text-[var(--sage)] mr-2">{g.group}</span>
          <span className="text-[var(--ink)]">{g.items.join(", ")}</span>
        </div>
      ))}
    </div>],
    ["Experience", <div className="space-y-2">
      {experience.map((e) => (
        <div key={`${e.when}-${e.where}`}>
          <div className="text-[15px] text-[var(--ink)]">{e.role} &middot; {e.where}</div>
          <div className="text-[13px] text-[var(--ink-soft)]">{e.when}</div>
        </div>
      ))}
    </div>],
    ["Achievements", <div className="space-y-1">
      {achievements.map((a) => (
        <div key={a.title} className="text-[14px] text-[var(--ink)]">{a.result} — {a.title} ({a.year})</div>
      ))}
    </div>],
    ["Technical interests", <div className="flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-[var(--ink)]">
      {themes.map((t) => <span key={t.title}>{t.title}</span>)}
    </div>],
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid="more-page">
      <MidnightMetaLine signal>System index</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">More</h1>

      {sections.map(([title, body]) => (
        <MidnightGlassSurface key={title} level={2} className="mt-6 p-6">
          <MidnightMetaLine>{title}</MidnightMetaLine>
          <div className="mt-2">{body}</div>
        </MidnightGlassSurface>
      ))}

      <MidnightGlassSurface level={2} className="mt-6 p-6">
        <MidnightMetaLine>Links</MidnightMetaLine>
        <div className="mt-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block py-2 text-[15px] text-[var(--decoration-primary)] hover:underline underline-offset-4">
              {l.label} →
            </Link>
          ))}
        </div>
      </MidnightGlassSurface>
    </div>
  );
}

function ScholarMore() {
  const links = [
    { to: "/archive", label: "Indexed history" },
    { to: "/research", label: "Research & technical exploration" },
    { to: "/ai-mode", label: "AI synthesis" },
    { to: "/images", label: "Visual artifact index" },
    { to: "/videos", label: "Media records" },
    { to: "/shopping", label: "Wishlist record" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12" data-testid="more-page">
      <ScholarMetaLine>Anita George · Indexed profile directory</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">More</h1>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Education</ScholarMetaLine>
        <p className="mt-1.5 text-[15px] text-[var(--ink)]">{profile.degree} &middot; {profile.universityShort}</p>
        <p className="text-[13px] text-[var(--ink-soft)]">{profile.years} &middot; GPA {profile.gpa}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Skills</ScholarMetaLine>
        <div className="mt-2 space-y-2">
          {skills.map((g) => (
            <div key={g.group} className="text-[15px]">
              <span className="font-mono text-[12px] uppercase text-[var(--ink-soft)] mr-2">{g.group}</span>
              <span className="text-[var(--ink)]">{g.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Experience</ScholarMetaLine>
        <div className="mt-2 space-y-3">
          {experience.map((e) => (
            <div key={`${e.when}-${e.where}`}>
              <div className="text-[15px] text-[var(--ink)]">{e.role} &middot; {e.where}</div>
              <div className="text-[13px] text-[var(--ink-soft)]">{e.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Achievements</ScholarMetaLine>
        <div className="mt-2 space-y-1">
          {achievements.map((a) => (
            <div key={a.title} className="text-[15px] text-[var(--ink)]">{a.result} — {a.title} ({a.year})</div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Technical interests</ScholarMetaLine>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-[var(--ink)]">
          {themes.map((t) => (
            <span key={t.title}>{t.title}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <ScholarMetaLine>Links</ScholarMetaLine>
        <div className="mt-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block py-2 text-[15px] text-[var(--link)] hover:underline underline-offset-4">
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const corners = [
  { to: "/archive", title: "Hidden Archive", note: "old html pages, embarrassing usernames", testid: "more-archive" },
  { to: "/research", title: "Research / Notes", note: "papers, manifestos, soft thinking", testid: "more-research" },
  { to: "/ai-mode", title: "AI Mode", note: "ask the archive a question", testid: "more-ai" },
  { to: "/images", title: "Image Archive", note: "her scanned moodboard", testid: "more-images" },
  { to: "/videos", title: "Videos", note: "soft demos of small things", testid: "more-videos" },
  { to: "/shopping", title: "Soft Wishlist", note: "tiny ironic shopping", testid: "more-shopping" },
];

export default function More() {
  const { currentTheme } = useTheme();
  if (currentTheme === "search") {
    return <ScholarMore />;
  }
  if (currentTheme === "midnight") {
    return <MidnightMore />;
  }
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12" data-testid="more-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ more · the back rooms</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        small <span className="italic">corners</span>, gently linked.
      </h1>
      <Squiggle width={220} className="mt-3" />
      <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-2xl">
        not everything fits in a tab. these are the rooms i don't put on the home page.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {corners.map((c, idx) => (
          <Link
            to={c.to}
            key={c.to}
            data-testid={c.testid}
            className="pin-card relative bg-white border border-[var(--border-soft)] p-5 block"
            style={{ transform: `rotate(${(idx % 3 - 1) * 0.4}deg)` }}
          >
            <Tape className="-top-3 left-8" w={60} rotate={-7} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">corner {String(idx + 1).padStart(2, "0")}</div>
            <div className="mt-1 flex items-baseline justify-between">
              <h3 className="font-serif text-2xl text-ink leading-tight">{c.title}</h3>
              <ArrowUpRight size={16} className="text-plum" />
            </div>
            <div className="mt-1 font-hand text-plum text-lg leading-tight">— {c.note}</div>
          </Link>
        ))}
      </div>

      <div className="mt-14 max-w-md">
        <HandArrow className="rotate-[-25deg]" />
        <p className="font-hand text-plum text-2xl">— still building. always.</p>
      </div>
    </div>
  );
}
