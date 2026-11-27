// ProductListingPage.tsx
import {
  ACCESSORY_GROUPS,
  FilterPanel,
  PART_GROUPS,
  SCOOTER_GROUPS,
} from "./FilterPanel";
import { ProductCard } from "../cards/ProductCard";
import type { Product } from "../../types/product";
import { SortButton } from "@/components/product-listing/SortButton";
import FilterToolbar from "@/components/product-listing/FilterToolbar";
import Pagination from "@/components/ui/Pagination";
import { getTranslations } from "next-intl/server";
import {
  toAccessoryCardProduct,
  toScooterCardProduct,
  toSparePartCardProduct,
} from "@/lib/mappers/product";
import { Suspense } from "react";
import { API_URL } from "@/lib/config";

type PageType = "scooters" | "parts" | "accessories";

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type PageConfig = {
  title: string;
  description?: string[];
  filterGroups: React.ComponentProps<typeof FilterPanel>["groups"];
  gridClassName: string;
  headerActions: boolean;
};

const FETCH_CONFIG: Record<
  PageType,
  { endpoint: string; map: (raw: any) => Product }
> = {
  scooters: { endpoint: "scooters", map: toScooterCardProduct },
  accessories: { endpoint: "accessories", map: toAccessoryCardProduct },
  parts: { endpoint: "parts", map: toSparePartCardProduct },
};

export default async function ProductListingPage({
  pageType,
  searchParams,
  locale,
}: {
  pageType: PageType;
  searchParams: { [key: string]: string | string[] | undefined };
  locale: string;
}) {
  const t = await getTranslations("ProductListingPage");

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    const v = Array.isArray(value) ? value[0] : value;
    if (v) query.set(key, v);
  }
  query.set("locale", locale);

  const { endpoint, map } = FETCH_CONFIG[pageType];
  const res = await fetch(
    `${API_URL}/${endpoint}?${query.toString()}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }

  const { data: rawItems, meta } = (await res.json()) as {
    data: unknown[];
    meta: PageMeta;
  };
  const items = rawItems.map(map);

  const PAGE_CONFIG: Record<PageType, PageConfig> = {
    scooters: {
      title: t("titles.scooters"),
      description: [t("description")],
      filterGroups: SCOOTER_GROUPS,
      gridClassName: "grid gap-6 sm:grid-cols-2",
      headerActions: false,
    },
    parts: {
      title: t("titles.spareParts"),
      filterGroups: PART_GROUPS,
      gridClassName: "grid grid-cols-2 gap-4 sm:gap-6",
      headerActions: true,
    },
    accessories: {
      title: t("titles.accessories"),
      filterGroups: ACCESSORY_GROUPS,
      gridClassName: "grid grid-cols-2 gap-4 sm:gap-6",
      headerActions: true,
    },
  };

  const config = PAGE_CONFIG[pageType];

  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col w-full pr-3.75 pl-4 pt-10 pb-20 md:pt-20 md:px-18 md:pb-30 ">
        <div className="flex flex-col gap-4 ">
          {config.headerActions ? (
            <div className="flex items-center justify-between">
              <h1 className="max-w-xl text-[1.5rem] font-bold tracking-tight uppercase sm:text-[40px]">
                {config.title}
              </h1>
              <Suspense>
                <SortButton />
              </Suspense>
            </div>
          ) : (
            <h1 className="max-w-xl text-[1.5rem] font-bold tracking-tight uppercase sm:text-[40px]">
              {config.title}
            </h1>
          )}

          {config.description && (
            <div className="mt-6 w-full space-y-4 text-[0.875rem] text-muted-foreground sm:text-[20px] ">
              {config.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        <FilterToolbar haveFilterToolbarOnTop={config.headerActions} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:mt-8 ">
          <Suspense>
            <FilterPanel groups={config.filterGroups} />
          </Suspense>

          <div>
            {items.length === 0 ? (
              <p className="py-16 text-center text-lg text-muted-foreground sm:text-2xl">
                {t("empty")}
              </p>
            ) : (
              <>
                <div className={config.gridClassName}>
                  {items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
                <Suspense>
                  <Pagination
                    currentPage={meta.page}
                    totalPages={meta.totalPages}
                  />
                </Suspense>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
