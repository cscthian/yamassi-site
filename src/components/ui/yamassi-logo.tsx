import React from "react";
import { cn } from "@/lib/utils";

interface YamassiLogoProps {
  /** Render the "Yamassi" wordmark next to the mark. */
  showWordmark?: boolean;
  className?: string;
  /** Tailwind class driver for the mark sizing. */
  markClassName?: string;
  /** Use light wordmark for dark surfaces (e.g. footer). */
  inverted?: boolean;
}

/**
 * Yamassi brand mark — sun and moon, two complementary halves around a
 * chakana: Yanantin (complementary duality) meeting at a shared center
 * (Masintin), in the spirit of Ayni (reciprocity). Vector source with the two
 * brand base colors (green sun / blue moon): /yamassi-logo.svg
 */
export function YamassiLogo({
  showWordmark = true,
  className,
  markClassName,
  inverted = false,
}: YamassiLogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src="/yamassi-logo.svg"
        alt="Yamassi"
        width={36}
        height={36}
        className={cn("h-9 w-9", markClassName)}
      />
      {showWordmark && (
        <span
          className={cn(
            "font-sans text-[1.45rem] font-extrabold leading-none tracking-tight",
            inverted ? "text-white" : "text-foreground"
          )}
        >
          Yamassi
        </span>
      )}
    </span>
  );
}
