// components/HeroControls.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroControls({ count }: { count: number }) {
  const [active, setActive] = useState(0);

  const go = (next: number) => {
    setActive(next);
    document.querySelectorAll<HTMLElement>("[data-hero-slide]").forEach((el, i) => {
      el.dataset.active = String(i === next);
    });
  };

  return (
    <div className="flex shrink-0 gap-2">
      <button
        aria-label="წინა"
        onClick={() => go(active === 0 ? count - 1 : active - 1)}
        className="flex size-4 cursor-pointer items-center justify-center rounded-full border border-white hover:opacity-60 sm:size-9 md:border-[1.28px]"
      >
        <ChevronLeft className="size-2 sm:size-6" />
      </button>
      <button
        aria-label="შემდეგი"
        onClick={() => go(active === count - 1 ? 0 : active + 1)}
        className="flex size-4 cursor-pointer items-center justify-center rounded-full border border-white hover:opacity-60 sm:size-9 md:border-[1.28px]"
      >
        <ChevronRight className="size-2 sm:size-6" />
      </button>
    </div>
  );
}