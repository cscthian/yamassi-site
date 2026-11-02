import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");

  // Keep the "tubelight" in sync with the section in view while scrolling.
  useEffect(() => {
    const sectionIds = items
      .map((i) => i.url)
      .filter((u) => u.startsWith("#"))
      .map((u) => u.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = items.find((i) => i.url === `#${visible.target.id}`);
          if (match) setActiveTab(match.name);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.5, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "hidden xl:block fixed top-0 left-1/2 -translate-x-1/2 z-40 pt-3.5",
        className
      )}
    >
      <div className="flex items-center gap-1 border border-border bg-background/80 backdrop-blur-lg py-1 px-1.5 rounded-full shadow-soft">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                setActiveTab(item.name);
                if (item.url.startsWith("#")) {
                  window.dispatchEvent(new CustomEvent("expandHero"));
                  const target = document.querySelector(item.url);
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                    history.pushState(null, "", item.url);
                  }
                }
              }}
              className={cn(
                "relative cursor-pointer text-xs 2xl:text-sm font-semibold px-3 2xl:px-5 py-1.5 2xl:py-2 rounded-full transition-colors whitespace-nowrap",
                "text-foreground/70 hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
