"use client";
import { cn } from "cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const t = useTranslations("ProductListingPage");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  console.log(currentPage);

  // function onPageChange(page:number){
  //   const stringPage = page.toString();
  //   const params = new URLSearchParams(queryParams.toString())
  //   params.set("page",stringPage);
  //   router.push(`${pathName}?${params.toString()}`);
  // }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  function getPageNumbers(
    currentPage: number,
    totalPages: number,
  ): (number | "…")[] {
    const delta = 1; // how many neighbors to show around currentPage
    const pages: (number | "…")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }

    return pages;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2 md:mt-20  cursor-pointer"
      aria-label={t("pagination.pages")}
    >
      <button
        aria-label={t("pagination.previous")}
        disabled={isFirstPage}
        onClick={() => goToPage(currentPage - 1)}
        className="flex size-[18.4px]  hover:cursor-pointer md:size-8 items-center justify-center rounded-full border border-main hover:border-primary"
      >
        <ChevronLeft className="size-3 sm:size-4" />
      </button>
      {getPageNumbers(currentPage, totalPages).map((page, idx) =>
        page === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-sm text-muted-foreground hover:cursor-auto"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex size-[18.4px] md:size-8 items-center justify-center rounded-full border text-sm sm:text-[16px] hover:border-primary hover:text-primary text-[9.2px] cursor-pointer",
              page === currentPage && "border-primary text-primary",
            )}
          >
            {page}
          </button>
        ),
      )}
      <button
        aria-label={t("pagination.next")}
        disabled={isLastPage}
        onClick={() => goToPage(currentPage+1)}
        className="flex size-[18.4px] hover:cursor-pointer md:size-8 items-center justify-center rounded-full border hover:border-primary"
      >
        <ChevronRight className="size-3 sm:size-4" />
      </button>
    </nav>
  );
}
