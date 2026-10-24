import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  heroAction?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  heroAction,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Refs mirror the latest interaction state so the (once-registered) wheel /
  // touch listeners never read a stale closure. On mobile this is what keeps the
  // expansion smooth: touchmove fires many times per frame and we accumulate the
  // progress synchronously through `progressRef` instead of through batched
  // React state — without it the gesture "jumps" straight past the animation.
  const progressRef = useRef<number>(0);
  const expandedRef = useRef<boolean>(false);
  const touchStartRef = useRef<number>(0);

  const applyProgress = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, 0), 1);
    progressRef.current = clamped;
    setScrollProgress(clamped);

    if (clamped >= 1) {
      expandedRef.current = true;
      setMediaFullyExpanded(true);
      setShowContent(true);
    } else if (clamped < 0.75) {
      setShowContent(false);
    }
  }, []);

  const collapse = useCallback(() => {
    expandedRef.current = false;
    setMediaFullyExpanded(false);
  }, []);

  const reset = useCallback(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    touchStartRef.current = 0;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, []);

  useEffect(() => {
    reset();
  }, [mediaType, reset]);

  // Allow external screens to reset the section back to its collapsed state.
  useEffect(() => {
    window.addEventListener("resetSection", reset);
    return () => window.removeEventListener("resetSection", reset);
  }, [reset]);

  const expand = useCallback(() => {
    applyProgress(1);
  }, [applyProgress]);

  // Allow external navigation or buttons to immediately expand the hero
  useEffect(() => {
    window.addEventListener("expandHero", expand);
    return () => window.removeEventListener("expandHero", expand);
  }, [expand]);

  // If page loads with an anchor hash in the URL, expand immediately and smooth scroll
  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#inicio") {
      expand();
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
      }
    }
  }, [expand]);

  // Intercept any anchor click on the page to expand the hero immediately and scroll smoothly
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "#inicio") return;

      expand();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [expand]);

  useEffect(() => {
    // The scroll-driven expansion runs on BOTH desktop (wheel) and mobile
    // (touch) so the cinematic transition is shown everywhere. Listeners are
    // registered ONCE and read live state from refs (see note above).
    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        applyProgress(progressRef.current + e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.006;
        applyProgress(progressRef.current + deltaY * scrollFactor);
        touchStartRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartRef.current = 0;
    };

    const handleScroll = (): void => {
      // If the page scrolled down (via anchor jump, keyboard, scrollbar, etc.),
      // ensure the hero is fully expanded instead of blocking the user at (0, 0)!
      if (!expandedRef.current && window.scrollY > 20) {
        applyProgress(1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [applyProgress, collapse]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = isMobileState
    ? 290 + scrollProgress * 660
    : 540 + scrollProgress * 950;
  const mediaHeight = isMobileState
    ? 165 + scrollProgress * 405
    : 320 + scrollProgress * 440;

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden bg-[#0b1f4d] transition-colors duration-700 ease-in-out"
    >
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={false}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Negocio peruano usando Yamassi"
              width={1920}
              height={1080}
              className="h-screen w-screen object-cover object-center"
              loading="eager"
              decoding="async"
            />
            {/* Cortina azul transparente: no aparece al inicio, solo aparece al hacer scroll cuando el video se acerca */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.min(scrollProgress * 2, 1) }}
              transition={{ duration: 0.15 }}
            >
              <div className="absolute inset-0 bg-[#0b1f4d]/72" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f4d]/40 via-transparent to-[#0b1f4d]" />
            </motion.div>
          </motion.div>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-start">
            <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-start pt-[4.5rem] pb-4 sm:justify-center sm:pt-24 sm:pb-12">
              {/* 1. TÍTULO ENCABEZADO: en PC en una sola línea, se separa a la izquierda y derecha al hacer scroll */}
              <div
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2.2),
                }}
                className="relative z-30 mb-2 sm:mb-5 flex flex-col items-center text-center px-2 sm:px-4 max-w-7xl mx-auto pointer-events-none transition-none overflow-visible w-full"
              >
                <div
                  style={{
                    opacity: Math.max(0, 1 - scrollProgress * 3),
                    transform: `translateY(-${scrollProgress * 25}px)`,
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md mb-1.5 sm:mb-3 shadow-sm transition-none"
                >
                  <span>✨</span>
                  <span>Punto de Venta, Control de Caja e Inventario</span>
                </div>

                <h1 className="flex flex-col sm:flex-row items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-0.5 sm:gap-y-1 font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] leading-tight sm:whitespace-nowrap w-full overflow-visible">
                  <span
                    className="inline-block transition-none will-change-transform"
                    style={{
                      transform: `translateX(-${scrollProgress * (isMobileState ? 70 : 85)}vw)`,
                    }}
                  >
                    Todo tu negocio
                  </span>
                  <span
                    className="inline-block transition-none will-change-transform"
                    style={{
                      transform: `translateX(${scrollProgress * (isMobileState ? 70 : 85)}vw)`,
                    }}
                  >
                    en un solo lugar
                  </span>
                </h1>

                {/* Texto descriptivo preservado únicamente para SEO y lectores de pantalla */}
                <p className="sr-only">
                  Ventas rápidas, control de inventario en tiempo real y boletas/facturas electrónicas en una sola plataforma.
                </p>
              </div>

              {/* 2. REPRODUCTOR / VIDEO: centrado en el medio, expandible cinemáticamente al hacer scroll */}
              <div
                className="relative z-20 rounded-2xl transition-none overflow-hidden mx-auto shadow-[0px_30px_80px_rgba(11,31,77,0.45),0px_0px_50px_rgba(15,23,42,0.25)]"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "96vw",
                  maxHeight: "75vh",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative h-full w-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="h-full w-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 z-10 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative h-full w-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full rounded-xl object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className="absolute inset-0 z-10 pointer-events-none" />
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full">
                    <img
                      src={mediaSrc}
                      alt={title || "Contenido"}
                      width={1280}
                      height={720}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                )}
              </div>

              {/* 3. BOTONES DE ACCIÓN: colocados DEBAJO del video con selección de rubro y llamada a la acción */}
              {heroAction && (
                <div
                  style={{
                    transform: `translateY(${scrollProgress * 25}px)`,
                    opacity: Math.max(0, 1 - scrollProgress * 2.8),
                    pointerEvents: scrollProgress > 0.05 ? "none" : "auto",
                  }}
                  className="relative z-30 mt-2 sm:mt-5 flex flex-col items-center text-center transition-none w-max max-w-[95vw] mx-auto pointer-events-auto"
                >
                  {heroAction}
                </div>
              )}
            </div>

            <motion.section
              className="flex w-full flex-col px-5 py-10 md:px-12 lg:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
export { ScrollExpandMedia };
