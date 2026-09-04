import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSectionHeaderProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  currentPage?: number;
  totalPages?: number;
}

export default function CarouselSectionHeader({
  title,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: CarouselSectionHeaderProps) {
  return (
    <div className=" flex items-center justify-between gap-4">
      <h2 className="text-[24px] font-bold tracking-wide uppercase sm:text-[40px]">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="text-[12px] md:text-[16px] text-[#888888] hover:text-primary"
        >
          ყველას ნახვა
        </a>
        <div className="flex gap-1.5 border-[#888888]">
          <button
            aria-label="წინა"
            onClick={onPrev}
            disabled={!canGoPrev}
            className="rounded-full border p-1.5 hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="size-3.5  sm:size-5" />
          </button>
          <button
            aria-label="შემდეგი"
            onClick={onNext}
            disabled={!canGoNext}
            className="rounded-full border p-1.5 hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="size-3.5 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
