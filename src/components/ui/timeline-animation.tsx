import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type TimelineContentProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
  animationNum: number;
  /** Kept for API compatibility with the original component (unused). */
  timelineRef?: React.RefObject<HTMLElement>;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "className">;

const defaultVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

/**
 * Reveals its content (staggered by `animationNum`) when THIS element scrolls
 * into view. Observing each element on its own (instead of one shared section
 * ref) keeps the reveal visible on mobile, where tall sections would otherwise
 * finish animating before the lower items are ever on screen.
 */
export function TimelineContent<T extends keyof JSX.IntrinsicElements = "div">({
  as,
  animationNum,
  timelineRef: _timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const MotionComponent = (motion as unknown as Record<string, React.ElementType>)[
    (as as string) ?? "div"
  ];

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={customVariants ?? defaultVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
