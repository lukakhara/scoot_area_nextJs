"use client";
// ProductListingPage.tsx
import { useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Shuffle,
  Funnel,
} from "lucide-react";
import { FilterPanel, PART_GROUPS } from "../components/FilterPanel";
import { ProductCard } from "../components/ProductCard";
import { SCOOTER_ITEMS, PARTS_ITEMS, ACCESSORY_ITEMS } from "../data/products";
import { type Product } from "../types/product";
import { useTranslations } from "next-intl";

type PageType = "scooters" | "parts" | "accessories";

type PageConfig = {
  title: string;
  description?: string[];
  items: Product[];
  filterGroups?: React.ComponentProps<typeof FilterPanel>["groups"];
  gridClassName: string;
  headerActions: boolean;
};

const PAGES = ["1", "2", "3", "4", "…"];

function FilterButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations("ProductListingPage.actions");

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-4 py-2 text-xs font-semibold uppercase lg:bg-transparent lg:px-0 lg:text-lg "
    >
      <Funnel className="size-4 sm:size-6" /> {t("filter")}
    </button>
  );
}

function SortButton({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("ProductListingPage.actions");

  return (
    <button
      className={
        compact
          ? "inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-4 py-2 text-xs font-semibold lg:hidden"
          : "inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-4 py-2 text-xs font-semibold lg:bg-transparent lg:px-0 lg:text-lg"
      }
    >
      <ListFilter className="size-4 sm:size-6 " /> {t("sort")}
    </button>
  );
}

export default function ProductListingPage({
  pageType,
}: {
  pageType: PageType;
}) {
  const t = useTranslations("ProductListingPage");

  const PAGE_CONFIG: Record<PageType, PageConfig> = {
    scooters: {
      title: t("titles.scooters"),
      description: [t("description"), t("description")],
      items: SCOOTER_ITEMS,
      gridClassName: "grid gap-6 sm:grid-cols-2",
      headerActions: false,
    },
    parts: {
      title: t("titles.spareParts"),
      items: PARTS_ITEMS,
      filterGroups: PART_GROUPS,
      gridClassName: "grid grid-cols-2 gap-4 sm:gap-6",
      headerActions: true,
    },
    accessories: {
      title: t("titles.accessories"),
      items: ACCESSORY_ITEMS,
      gridClassName: "grid grid-cols-2 gap-4 sm:gap-6",
      headerActions: true,
    },
  };

  const [filtersOpen, setFiltersOpen] = useState(false);
  const config = PAGE_CONFIG[pageType];
  const toggleFilters = () => setFiltersOpen((v) => !v);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-10 pb-16">
        <div className="flex items-start justify-between gap-4">
          <h1 className="max-w-xl text-[1.5rem] font-bold tracking-tight uppercase sm:text-[40px]">
            {config.title}
          </h1>

          {config.headerActions && (
            <div className="hidden items-center gap-6 lg:flex sm:text-[24px]">
              <button className="inline-flex items-center gap-2 text-lg font-normal">
                <ListFilter className="size-5" /> {t("actions.sort")}
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base transition-colors hover:border-primary hover:text-primary font-medium">
                <ArrowLeftRight className="size-4" /> {t("actions.compare")}
              </button>
            </div>
          )}
        </div>

        {config.description && (
          <div className="mt-6 max-w-4xl space-y-4 text-[0.875rem] text-muted-foreground sm:text-[20px]">
            {config.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        <div
          className={
            config.headerActions
              ? "mt-6 flex items-center justify-between gap-3 lg:mt-8"
              : "mt-10 flex items-center justify-between gap-3 border-b pb-6"
          }
        >
          <FilterButton onClick={toggleFilters} />
          {config.headerActions ? (
            <SortButton compact />
          ) : (
            <div className="flex items-center gap-3">
              <SortButton />
              <button className="size-[30px]  inline-flex  gap-2  border  text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary sm:px-6 sm:py-3 rounded-full items-center justify-center ">
                <Shuffle className="size-4 sm:size-6" />
                <span className="hidden sm:inline text-[24px]">
                  {t("actions.compare")}
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:mt-8">
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
            <FilterPanel groups={config.filterGroups} />
          </aside>

          <div>
            <div className={config.gridClassName}>
              {config.items.map((item, i) => (
                <ProductCard key={item.title + i} item={item} />
              ))}
            </div>

            <nav
              className="mt-12 flex items-center justify-center gap-2 md:mt-20"
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
                  className="flex size-[18.4px] md:size-8 items-center justify-center rounded-full border text-sm sm:text-[16px] hover:border-primary hover:text-primary text-[9.2px]"
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
          </div>
        </div>
      </main>
    </div>
  );
}