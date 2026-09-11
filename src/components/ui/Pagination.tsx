
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Pagination({PAGES}:{PAGES:string[]}) {
  const t = await getTranslations("ProductListingPage");

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2 md:mt-20  cursor-pointer"
      aria-label={t("pagination.pages")}
    >
      <button
        aria-label={t("pagination.previous")}
        className="flex size-[18.4px] md:size-8 items-center justify-center rounded-full border border-main hover:border-primary"
      >
        <ChevronLeft className="size-3 sm:size-4" />
      </button>
      {PAGES.map((p) => (
        <button
          key={p}
          className="flex size-[18.4px] md:size-8 items-center justify-center rounded-full border text-sm sm:text-[16px] hover:border-primary hover:text-primary text-[9.2px] cursor-pointer"
        >
          {p}
        </button>
      ))}
      <button
        aria-label={t("pagination.next")}
        className="flex size-[18.4px] md:size-8 items-center justify-center rounded-full border hover:border-primary"
      >
        <ChevronRight className="size-3 sm:size-4" />
      </button>
    </nav>
  );
};


