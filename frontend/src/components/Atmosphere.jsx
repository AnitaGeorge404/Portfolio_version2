import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

const animationUrl = (file) => {
  const base = process.env.PUBLIC_URL || "";
  return `${base}/animations/${encodeURIComponent(file)}`;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return prefersReducedMotion;
}

export function LottieAtmosphere({
  file,
  className = "",
  loop = true,
  lazy = true,
  rootMargin = "180px",
  speed = 0.28,
  preserveAspectRatio = "xMidYMid slice",
}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInRange, setIsInRange] = useState(!lazy);

  useEffect(() => {
    if (!lazy || !containerRef.current) {
      setIsInRange(true);
      return undefined;
    }

    const observedElement = containerRef.current.parentElement || containerRef.current;
    const margin = Number.parseInt(rootMargin, 10) || 0;
    const updateRange = () => {
      const rect = observedElement.getBoundingClientRect();
      setIsInRange(
        rect.bottom >= -margin &&
          rect.top <= window.innerHeight + margin &&
          rect.right >= -margin &&
          rect.left <= window.innerWidth + margin,
      );
    };

    updateRange();
    window.addEventListener("scroll", updateRange, { passive: true });
    window.addEventListener("resize", updateRange);
    return () => {
      window.removeEventListener("scroll", updateRange);
      window.removeEventListener("resize", updateRange);
    };
  }, [lazy, rootMargin]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion || !isInRange) return undefined;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "canvas",
      loop,
      autoplay: true,
      path: animationUrl(file),
      rendererSettings: {
        preserveAspectRatio,
        clearCanvas: true,
      },
    });

    animation.setSpeed(speed);
    return () => animation.destroy();
  }, [file, isInRange, loop, preserveAspectRatio, prefersReducedMotion, speed]);

  return (
    <span
      ref={containerRef}
      className={`motion-asset ${className}`}
      aria-hidden="true"
    />
  );
}

export function SiteAtmosphere() {
  return (
    <div className="site-atmosphere" aria-hidden="true">
      <LottieAtmosphere
        file="slow animation.json"
        className="site-atmosphere__particles"
        lazy={false}
        speed={0.12}
      />
    </div>
  );
}

export function BotanicalVeil({ variant = "corner", className = "" }) {
  return (
    <span className={`botanical-veil botanical-veil--${variant} ${className}`} aria-hidden="true">
      <LottieAtmosphere
        file="Botanical Wreath.json"
        className="botanical-veil__motion"
        speed={0.16}
      />
    </span>
  );
}

export function EditorialFloralWash({ variant = "wide", className = "" }) {
  return (
    <span className={`floral-wash floral-wash--${variant} ${className}`} aria-hidden="true">
      <LottieAtmosphere
        file="Floral Animated Design.json"
        className="floral-wash__motion"
        speed={0.1}
      />
    </span>
  );
}

export function NotebookBloom({ variant = "margin", className = "" }) {
  return (
    <span className={`notebook-bloom notebook-bloom--${variant} ${className}`} aria-hidden="true">
      <LottieAtmosphere
        file="Flower drawing.json"
        className="notebook-bloom__motion"
        speed={0.45}
        loop={false}
        preserveAspectRatio="xMidYMid meet"
      />
    </span>
  );
}
