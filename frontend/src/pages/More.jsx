import React from "react";
import { Link } from "react-router-dom";
import { Squiggle, Sparkle, Tape, HandArrow } from "@/components/Decorations";
import { ArrowUpRight } from "lucide-react";

const corners = [
  { to: "/archive", title: "Hidden Archive", note: "old html pages, embarrassing usernames", testid: "more-archive" },
  { to: "/research", title: "Research / Notes", note: "papers, manifestos, soft thinking", testid: "more-research" },
  { to: "/ai-mode", title: "AI Mode", note: "ask the archive a question", testid: "more-ai" },
  { to: "/images", title: "Image Archive", note: "her scanned moodboard", testid: "more-images" },
  { to: "/videos", title: "Videos", note: "soft demos of small things", testid: "more-videos" },
  { to: "/shopping", title: "Soft Wishlist", note: "tiny ironic shopping", testid: "more-shopping" },
];

export default function More() {
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
