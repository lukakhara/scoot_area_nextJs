"use client";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";
import { CarouselSectionHeader } from "@/app/page";

interface PaginatedGridSectionProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemKey: (item: T) => string | number;
  visibleCount?: number; // used for lg/xl and above
}

// Tailwind default breakpoints: md = 768, lg = 1024
function useResponsiveVisibleCount(desktopCount: number) {
  const [visibleCount, setVisibleCount] = useState(desktopCount);

  useEffect(() => {
    function calculate() {
      const w = window.innerWidth;
      if (w < 768) {
        setVisibleCount(1); // mobile
      } else if (w < 1024) {
        setVisibleCount(2); // medium
      } else {
        setVisibleCount(desktopCount); // large/xl and up
      }
    }

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [desktopCount]);

  return visibleCount;
}

export default function PaginatedGridSection<T>({
  title,
  items,
  renderItem,
  itemKey,
  visibleCount = 3,
}: PaginatedGridSectionProps<T>) {
  const responsiveVisibleCount = useResponsiveVisibleCount(visibleCount);

  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, { width }] = useMeasure();
  const effectiveWidth = width || 1200;
  const totalPages = Math.ceil(items.length / responsiveVisibleCount);

  // keep currentPage valid when responsiveVisibleCount changes (resize)
  useEffect(() => {
    setCurrentPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const gap = 24;
  const cardWidth =
    effectiveWidth > 0
      ? (effectiveWidth - (responsiveVisibleCount - 1) * gap) /
        responsiveVisibleCount
      : 300;

  const springConfig = {
    type: "spring" as const,
    stiffness: 350,
    damping: 35,
    mass: 0.8,
  };

  return (
    <section className="w-full px-[15px] md:px-18 pt-20 relative z-100">
      <CarouselSectionHeader
        title={title}
        onPrev={() => setCurrentPage(Math.max(0, currentPage - 1))}
        onNext={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
        canGoPrev={currentPage > 0}
        canGoNext={currentPage < totalPages - 1}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          className="flex gap-6 pt-8 pb-20"
          animate={{
            x: -currentPage * (cardWidth + gap) * responsiveVisibleCount,
          }}
          transition={springConfig}
        >
          {items.map((item, i) => (
            <motion.div
              key={itemKey(item)}
              className="flex-shrink-0"
              style={{ width: cardWidth }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
