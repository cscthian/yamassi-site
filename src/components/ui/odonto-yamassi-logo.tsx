import { cn } from "@/lib/utils";

/** "Odonto / Yamassi" two-line wordmark of the dental sub-brand. */
export function OdontoYamassiWordmark({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "flex flex-col font-sans text-[1.05rem] font-extrabold leading-[0.95] tracking-tight",
        inverted ? "text-white" : "text-[#021D4A]",
        className
      )}
    >
      <span>Odonto</span>
      <span className={inverted ? "text-[#FCD448]" : "text-[#5D43F7]"}>Yamassi</span>
    </span>
  );
}

interface OdontoYamassiLogoProps {
  className?: string;
  /** Light wordmark for dark surfaces. */
  inverted?: boolean;
}

/** Odonto Yamassi sub-brand mark: yellow/purple yin-yang with a dental cross. */
export function OdontoYamassiLogo({ className, inverted = false }: OdontoYamassiLogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img src="/yamassi-dental.png" alt="Odonto Yamassi" width={36} height={36} className="h-9 w-9" />
      <OdontoYamassiWordmark inverted={inverted} />
    </span>
  );
}
