import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import "./CustomCursor.css";

export default function CustomCursor() {
  const { currentTheme } = useTheme();
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Track actual mouse position
    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;

      setPosition({ x: newX, y: newY });

      // Calculate velocity for inertia
      velocityRef.current = {
        x: (newX - position.x) * 0.7,
        y: (newY - position.y) * 0.7,
      };

      // Detect what element is being hovered
      detectHoveredElement(e);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("visible");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("visible");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [position]);

  // Smooth animation with inertia and lag
  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => {
        // Apply easing and inertia
        const easing = 0.12;
        const newX = prev.x + (position.x - prev.x) * easing;
        const newY = prev.y + (position.y - prev.y) * easing;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [position]);

  // Detect hovered element for interactions
  const detectHoveredElement = (e) => {
    const element = e.target;
    const isButton =
      element.tagName === "BUTTON" ||
      element.closest("button") ||
      element.hasAttribute("role") === "button";
    const isLink =
      element.tagName === "A" || element.closest("a");
    const isCard =
      element.classList.contains("card") ||
      element.closest("[class*='card']");
    const isProject =
      element.classList.contains("project") ||
      element.closest("[class*='project']");
    const isSearchBar =
      element.classList.contains("search-bar") ||
      element.closest("[class*='search']");
    const isImage = element.tagName === "IMG";

    setIsHovering(
      isButton || isLink || isCard || isProject || isSearchBar || isImage
    );
    setHoveredElement({
      button: isButton,
      link: isLink,
      card: isCard,
      project: isProject,
      searchBar: isSearchBar,
      image: isImage,
    });
  };

  // Build cursor CSS classes based on theme and hover state
  const getCursorClasses = () => {
    const classes = [
      "custom-cursor",
      `cursor-${currentTheme}`,
    ];

    if (isHovering) {
      if (hoveredElement.button) classes.push("hover-button");
      if (hoveredElement.link) classes.push("hover-link");
      if (hoveredElement.card) classes.push("hover-card");
      if (hoveredElement.project) classes.push("hover-project");
      if (hoveredElement.searchBar) classes.push("hover-search");
      if (hoveredElement.image) classes.push("hover-image");
    }

    return classes.join(" ");
  };

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={getCursorClasses()}
      style={{
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {/* Archive - Pressed Flower */}
      {currentTheme === "archive" && (
        <svg viewBox="0 0 80 80" className="cursor-svg">
          <g className="flower-petals">
            <ellipse cx="40" cy="20" rx="12" ry="15" fill="#C96B84" opacity="0.8" />
            <ellipse cx="60" cy="32" rx="12" ry="15" fill="#D9939F" opacity="0.8" transform="rotate(72 40 40)" />
            <ellipse cx="58" cy="60" rx="12" ry="15" fill="#C96B84" opacity="0.8" transform="rotate(144 40 40)" />
            <ellipse cx="22" cy="60" rx="12" ry="15" fill="#D9939F" opacity="0.8" transform="rotate(216 40 40)" />
            <ellipse cx="20" cy="32" rx="12" ry="15" fill="#C96B84" opacity="0.8" transform="rotate(288 40 40)" />
          </g>
          <circle cx="40" cy="40" r="10" fill="#EDAABB" className="flower-center" />
          <circle cx="40" cy="40" r="5" fill="#8B3A52" />
        </svg>
      )}

      {/* Search - Precision Lens */}
      {currentTheme === "search" && (
        <svg viewBox="0 0 80 80" className="cursor-svg">
          <circle cx="35" cy="35" r="22" fill="none" stroke="#202124" strokeWidth="2" className="search-ring" />
          <circle cx="35" cy="35" r="15" fill="none" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.5" />
          <line x1="52" y1="52" x2="68" y2="68" stroke="#202124" strokeWidth="2.5" strokeLinecap="round" className="search-handle" />
          <circle cx="35" cy="35" r="2" fill="#202124" />
        </svg>
      )}

      {/* Midnight - Luxury Intelligence */}
      {currentTheme === "midnight" && (
        <svg viewBox="0 0 80 80" className="cursor-svg">
          <circle cx="40" cy="40" r="18" fill="none" stroke="#D4AF37" strokeWidth="2" className="luxury-ring" />
          <line x1="40" y1="22" x2="40" y2="58" stroke="#D4AF37" strokeWidth="1.5" opacity="0.7" />
          <line x1="22" y1="40" x2="58" y2="40" stroke="#D4AF37" strokeWidth="1.5" opacity="0.7" />
          <circle cx="40" cy="40" r="6" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
          <circle cx="40" cy="40" r="3" fill="#FFFAF5" className="luxury-center" />
        </svg>
      )}

      {/* Herbarium - Botanical Explorer */}
      {currentTheme === "herbarium" && (
        <svg viewBox="0 0 80 80" className="cursor-svg">
          {/* Four-leaf clover shape */}
          <g className="clover-leaf">
            <ellipse cx="40" cy="25" rx="9" ry="14" fill="#7EC66F" opacity="0.85" />
            <ellipse cx="55" cy="40" rx="14" ry="9" fill="#7EC66F" opacity="0.85" transform="rotate(90 55 40)" />
            <ellipse cx="40" cy="55" rx="9" ry="14" fill="#7EC66F" opacity="0.85" />
            <ellipse cx="25" cy="40" rx="14" ry="9" fill="#7EC66F" opacity="0.85" transform="rotate(90 25 40)" />
          </g>
          {/* Center circle */}
          <circle cx="40" cy="40" r="6" fill="#F0EDE8" />
          {/* Stem */}
          <line x1="40" y1="40" x2="40" y2="65" stroke="#7EC66F" strokeWidth="1.5" opacity="0.6" />
        </svg>
      )}
    </div>
  );
}
