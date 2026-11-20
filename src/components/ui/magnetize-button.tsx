import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

import { cn } from "@/lib/utils";

interface MagnetizeButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  /** Render a <button> (e.g. to open a menu) instead of a link. */
  as?: "a" | "button";
  type?: "button" | "submit";
  particleCount?: number;
  children: React.ReactNode;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

/**
 * Magnetize button — particle "magnet" hover effect from hover.txt, restyled to
 * Yamassi's green ("gratis"/success) palette. Rendered as an anchor so it works as a
 * conversion CTA link. Particles snap toward the center on hover / touch.
 */
const MagnetizeButton = React.forwardRef<HTMLElement, MagnetizeButtonProps>(function MagnetizeButton({
  className,
  particleCount = 12,
  children,
  as = "a",
  ...props
}, ref) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }));
  }, [particlesControl, particles]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={cn(
        "group relative inline-flex h-16 min-w-40 touch-none items-center justify-center overflow-hidden rounded-full px-9 text-lg font-bold transition-all duration-300",
        "bg-accent text-accent-foreground shadow-glow-green",
        "hover:-translate-y-0.5 active:translate-y-0",
        // Advanced hover: deep indigo/violet glow blooms around the CTA
        "hover:shadow-[0_0_46px_-6px_rgba(139,92,246,0.7),0_18px_50px_-18px_rgba(16,185,129,0.45)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {/* Indigo/violet wash that fades in on hover (kept within brand palette) */}
      <span
        aria-hidden
        className="touch-wash absolute inset-0 z-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Diagonal sheen sweep */}
      <span
        aria-hidden
        className="touch-sheen absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "absolute z-[1] h-1.5 w-1.5 rounded-full transition-opacity duration-300",
            index % 2 === 0 ? "bg-white" : "bg-violet-200",
            isAttracting ? "opacity-100" : "opacity-40"
          )}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Tag>
  );
});

export { MagnetizeButton };
