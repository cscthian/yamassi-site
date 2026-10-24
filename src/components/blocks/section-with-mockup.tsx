import React from "react";

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  reverseLayout?: boolean;
  /** Small floating badges layered over the mockup. */
  floatingChips?: React.ReactNode[];
  children?: React.ReactNode;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
  floatingChips = [],
  children,
}) => {
  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";

  const textOrderClass = reverseLayout ? "md:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

  return (
    <section className="relative overflow-hidden bg-ayni-soft py-20 md:py-32">
      {/* Ambient drifting glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-ayni-blue/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-ayni-green/10 blur-3xl"
      />

      <div className="container relative z-10 mx-auto w-full max-w-[1220px] px-6 md:px-10">
        <div
          className={`grid w-full grid-cols-1 items-center gap-12 md:gap-8 ${layoutClasses}`}
        >
          {/* Text content */}
          <div
            className={`mx-auto flex max-w-[546px] flex-col items-start gap-5 md:mx-0 ${textOrderClass}`}
          >
            <h2 className="font-serif text-3xl font-black leading-tight tracking-tight text-foreground md:text-[42px] md:leading-[1.12]">
              {title}
            </h2>
            <div className="text-base leading-relaxed text-muted-foreground md:text-[17px]">
              {description}
            </div>
            {children}
          </div>

          {/* Mockup / image content */}
          <div
            className={`group relative mx-auto w-full max-w-[320px] md:max-w-[471px] ${imageOrderClass}`}
          >
            <div className="relative">
              {/* Decorative background card */}
              <div
                className="absolute z-0 h-[317px] w-[300px] overflow-hidden rounded-[32px] bg-secondary md:h-[500px] md:w-[472px] transition-transform duration-700 group-hover:scale-105"
                style={{
                  top: reverseLayout ? "auto" : "8%",
                  bottom: reverseLayout ? "8%" : "auto",
                  left: reverseLayout ? "auto" : "-14%",
                  right: reverseLayout ? "-14%" : "auto",
                  transform: reverseLayout ? "translateY(-18px)" : "translateY(-26px)",
                }}
              >
                <div
                  className="h-full w-full bg-cover bg-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${secondaryImageSrc})` }}
                />
              </div>

              {/* Main mockup card — zooms in on hover */}
              <div
                className="relative z-10 h-[380px] w-full overflow-hidden rounded-[32px] border border-border bg-white shadow-soft transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-glow md:h-[600px]"
                style={{
                  transform: reverseLayout ? "translateY(18px)" : "translateY(26px)",
                }}
              >
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  style={{ backgroundImage: `url(${primaryImageSrc})` }}
                />
                {/* Sheen sweep on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
              </div>

              {/* Floating chips */}
              {floatingChips.map((chip, i) => (
                <div
                  key={i}
                  className={`absolute z-20 transition-transform duration-300 hover:scale-105 ${
                    i % 2 === 0
                      ? "-left-6 top-[18%] md:-left-12"
                      : "-right-4 bottom-[14%] md:-right-10"
                  }`}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWithMockup;
export { SectionWithMockup };
