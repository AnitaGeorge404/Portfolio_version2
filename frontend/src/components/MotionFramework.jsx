import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/**
 * Per-theme motion presets — distinct feel per environment rather than one
 * universal easing curve applied everywhere.
 *   paper         Archive — soft, organic, slightly bouncy (paper settling)
 *   precise       Scholar — fast, snappy, minimal travel (indexed/instant)
 *   inertial      Midnight — slow, weighted, deliberate (luxury drag)
 *   environmental Herbarium — slow, breathing, natural growth
 */
export const motionPresets = {
  paper: { duration: 0.7, ease: [0.22, 1, 0.36, 1], y: 24 },
  precise: { duration: 0.22, ease: [0.4, 0, 0.2, 1], y: 8 },
  inertial: { duration: 1.0, ease: [0.83, 0, 0.17, 1], y: 30 },
  environmental: { duration: 1.1, ease: [0.37, 0, 0.63, 1], y: 20 },
};

function useMotionPreset() {
  const { theme } = useTheme();
  return motionPresets[theme?.motionPreset] || motionPresets.paper;
}

/**
 * Ambient Particles - floating dust and sparkle particles for atmospheric depth
 */
export function AmbientParticles({ count = 40, className = "" }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.1,
    size: Math.random() * 2 + 0.5,
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: 0,
            width: p.size,
            height: p.size,
            background: "var(--decoration-primary)",
            opacity: p.opacity,
          }}
          animate={{
            y: window.innerHeight,
            opacity: [p.opacity, p.opacity * 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Page transition wrapper with staggered reveal
 */
export function PageTransition({ children, delay = 0 }) {
  const preset = useMotionPreset();
  return (
    <motion.div
      initial={{ opacity: 0, y: preset.y / 2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -preset.y / 2 }}
      transition={{
        duration: preset.duration,
        delay,
        ease: preset.ease,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container for sequential animations
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Scroll-triggered reveal animation
 */
export function RevealOnScroll({ children, className = "" }) {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const preset = useMotionPreset();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: preset.y }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: preset.duration,
        ease: preset.ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hover lift effect for cards and interactive elements
 */
export function HoverLift({ children, liftAmount = 8 }) {
  return (
    <motion.div
      whileHover={{
        y: -liftAmount,
        boxShadow: "0 24px 48px -12px rgba(139, 58, 82, 0.2)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magnetic button effect - slight attraction on hover
 */
export function MagneticButton({ children, className = "" }) {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current || !isHovered) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMousePos({
        x: (e.clientX - centerX) * 0.2,
        y: (e.clientY - centerY) * 0.2,
      });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      animate={mousePos}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax scroll effect
 */
export function ParallaxElement({ children, offset = 50, className = "" }) {
  const ref = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ y: scrollY * (offset / 100) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Semantic ripple effect for AI thinking state
 */
export function SemanticRipple({ isActive, color = "var(--decoration-primary)" }) {
  return (
    <div className="relative w-4 h-4 inline-block" aria-hidden>
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
        animate={isActive ? { scale: [1, 1.8], opacity: [1, 0] } : {}}
        transition={{
          duration: 1.2,
          repeat: isActive ? Infinity : 0,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={isActive ? { scale: [0.5, 1.2] } : {}}
        transition={{
          duration: 1.2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/**
 * Elegant underline animation for links
 */
export function AnimatedUnderline({ children, className = "" }) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover="hover"
      initial="rest"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-[var(--rose)]"
        variants={{
          rest: { width: "0%" },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.span>
  );
}

/**
 * Breath animation for focus states
 */
export function BreathAnimation({ children, scale = 1.02 }) {
  return (
    <motion.div
      animate={{ scale: [1, scale, 1] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
