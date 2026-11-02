import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_WORDS = [
  "vender",
  "facturar a SUNAT",
  "controlar tu stock",
  "ordenar tus compras",
  "crecer ordenado",
];

interface AnimatedHeadlineProps {
  /** Fixed leading text rendered before the rotating word. */
  prefix?: string;
  /** Words that cycle in the highlighted slot. */
  words?: string[];
  className?: string;
}

/**
 * Rotating-word headline — derived from the 21st.dev "Animated Hero" (3.txt),
 * rewritten in TypeScript for Yamassi's Spanish CRO copy. The verbs cycle to tell
 * the full Co-piloto value story: vende → factura → predice → decide.
 */
export function AnimatedHeadline({
  prefix = "Con Yamassi tu negocio puede",
  words: wordsProp,
  className,
}: AnimatedHeadlineProps) {
  const words = useMemo(() => wordsProp ?? DEFAULT_WORDS, [wordsProp]);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    }, 2100);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, words]);

  return (
    <h2
      className={`font-serif text-[1.75rem] leading-tight sm:text-4xl md:text-6xl font-black tracking-tight text-center text-white ${
        className ?? ""
      }`}
    >
      <span className="block text-white/90">{prefix}</span>
      <span className="relative flex w-full justify-center overflow-hidden pt-2 md:pt-3 md:pb-2">
        &nbsp;
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="absolute whitespace-nowrap bg-gradient-to-r from-emerald-300 via-white to-emerald-200 bg-clip-text font-black text-transparent"
            initial={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 50 }}
            animate={
              titleNumber === index
                ? { y: 0, opacity: 1 }
                : { y: titleNumber > index ? -150 : 150, opacity: 0 }
            }
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h2>
  );
}
