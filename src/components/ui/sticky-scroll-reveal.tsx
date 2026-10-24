import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

// Yamassi brand palette: deep navy backgrounds, blue → green accents.
const backgroundColors = ["#0b1f4d", "#080C14", "#112264"];
const linearGradients = [
  "linear-gradient(to bottom right, #1e4fbd, #10B981)",
  "linear-gradient(to bottom right, #10B981, #0e7490)",
  "linear-gradient(to bottom right, #1E3A8A, #6366f1)",
];

/**
 * Sticky scroll reveal (Aceternity), adapted to follow the PAGE scroll instead
 * of an inner scroll box — no nested scroll trap, and the visual panel stays
 * pinned while each feature's text scrolls past.
 */
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(cardLength - 1, Math.floor(latest * cardLength));
    setActiveCard(Math.max(0, index));
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col gap-6 rounded-[32px] px-5 py-6 sm:px-8 lg:flex-row lg:justify-center lg:gap-10 lg:px-12 lg:py-16"
    >
      {/* Visual panel — pinned at the top on mobile, on the right on desktop */}
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        transition={{ duration: 0.6 }}
        className={cn(
          "sticky top-20 z-10 order-first h-60 w-full self-start overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 sm:h-72",
          "lg:order-last lg:top-[calc(50vh-11rem)] lg:h-[22rem] lg:w-[26rem] lg:flex-shrink-0",
          contentClassName
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full origin-center scale-[0.8] sm:scale-100"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
          {content.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full bg-white transition-all duration-300",
                i === activeCard ? "w-5 opacity-100" : "w-1.5 opacity-50"
              )}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative flex max-w-2xl flex-1 items-start">
        <div className="w-full">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="flex min-h-[55vh] flex-col justify-center py-8 lg:min-h-[60vh] lg:py-10"
            >
              <motion.div
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  x: activeCard === index ? 0 : -8,
                }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                {item.icon && (
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/15">
                    {item.icon}
                  </span>
                )}
                <h3 className="font-serif text-2xl font-black text-white md:text-3xl">
                  {item.title}
                </h3>
              </motion.div>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 6,
                }}
                transition={{ duration: 0.4 }}
                className="mt-5 max-w-md text-base leading-relaxed text-slate-300 lg:mt-6 lg:text-lg"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-[20vh] lg:hidden" />
        </div>
      </div>
    </motion.div>
  );
};
