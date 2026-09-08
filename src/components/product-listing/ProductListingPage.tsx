// ProductListingPage.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterPanel, PART_GROUPS } from "./FilterPanel";
import { ProductCard } from "../ProductCard";
import {
  SCOOTER_ITEMS,
  PARTS_ITEMS,
  ACCESSORY_ITEMS,
} from "../../data/products";
import { type Product } from "../../types/product";
import { useTranslations } from "next-intl";

import { SortButton } from "./SortButton";

import FilterToolbar from "./FilterToolbar";

type PageType = "scooters" | "parts" | "accessories";

type PageConfig = {
  title: string;
  description?: string[];
  items: Product[];
  filterGroups?: React.ComponentProps<typeof FilterPanel>["groups"];
  gridClassName: string;
  headerActions: boolean;
};

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

  const config = PAGE_CONFIG[pageType];

  const PAGES = ["1", "2", "3", "4", "…"];
  const itemsPerPage = 10;
  const pages = itemsPerPage;

  return (
    <div className="min-h-screen bg-background ">
      <main className="flex flex-col w-full  px-5 pt-10 pb-16 ">
        <div className="flex flex-col gap-4">
          {config.headerActions ? (
            <div className="flex items-center justify-between">
              <h1 className="max-w-xl text-[1.5rem] font-bold tracking-tight uppercase sm:text-[40px]">
                {config.title}
              </h1>
              <SortButton />
            </div>
          ) : (
            <h1 className="max-w-xl text-[1.5rem] font-bold tracking-tight uppercase sm:text-[40px]">
              {config.title}
            </h1>
          )}

          {config.description && (
            <div className="mt-6 w-full space-y-4 text-[0.875rem] text-muted-foreground sm:text-[20px]">
              {config.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          <FilterToolbar haveFilterToolbarOnTop={config.headerActions} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:mt-8">
          <FilterPanel groups={config.filterGroups} />

          <div className="">
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
