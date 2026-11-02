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
    <>
      {/* MOBILE & TABLET (< lg): Compact, app-like feature cards with 100% visibility */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="flex flex-col overflow-hidden rounded-3xl bg-[#0b1f4d] p-5 ring-1 ring-white/10 shadow-xl"
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/15">
                  {item.icon}
                </span>
              )}
              <h3 className="font-serif text-xl font-black text-white">
                {item.title}
              </h3>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
              {item.description}
            </p>
            {item.content && (
              <div
                style={{
                  background: linearGradients[index % linearGradients.length],
                }}
                className="mt-4 h-48 w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10"
              >
                <div className="h-full w-full origin-center scale-[0.85]">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP (lg+): Sticky scroll reveal */}
      <motion.div
        ref={ref}
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        transition={{ duration: 0.6 }}
        className="relative hidden lg:flex lg:flex-row lg:justify-center lg:gap-10 rounded-[32px] lg:px-12 lg:py-16"
      >
        {/* Visual panel — pinned on the right on desktop */}
        <motion.div
          animate={{
            background: linearGradients[activeCard % linearGradients.length],
          }}
          transition={{ duration: 0.6 }}
          className={cn(
            "sticky z-10 self-start overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10",
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
              className="h-full w-full origin-center"
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative flex max-w-2xl flex-1 items-start">
          <div className="w-full">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                className="flex min-h-[55vh] flex-col justify-center py-10"
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
                  <h3 className="font-serif text-3xl font-black text-white">
                    {item.title}
                  </h3>
                </motion.div>
                <motion.p
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                    y: activeCard === index ? 0 : 6,
                  }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 max-w-md text-lg leading-relaxed text-slate-300"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
