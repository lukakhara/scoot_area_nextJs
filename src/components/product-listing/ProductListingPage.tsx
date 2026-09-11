// ProductListingPage.tsx
import { FilterPanel, PART_GROUPS } from "./FilterPanel";
import { ProductCard } from "../ProductCard";
import { PARTS_ITEMS, ACCESSORY_ITEMS } from "../../data/products";
import { type Product } from "../../types/product";
import { getTranslations } from "next-intl/server";
import { SortButton } from "@/components/product-listing/SortButton";
import FilterToolbar from "@/components/product-listing/FilterToolbar";
import Pagination from "@/components/ui/Pagination";
import { object, q } from "framer-motion/client";

type PageType = "scooters" | "parts" | "accessories";

type PageConfig = {
  title: string;
  description?: string[];
  items: Product[];
  filterGroups?: React.ComponentProps<typeof FilterPanel>["groups"];
  gridClassName: string;
  headerActions: boolean;
};

export default async function ProductListingPage({
  pageType,
  searchParams,
}: {
  pageType: PageType;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = await getTranslations("ProductListingPage");

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      query.set(key, Array.isArray(value) ? value[0] : value);
    }
  }

  const queryString = query.toString(); // "sort=price" or "" if empty

  const url = queryString
    ? `${process.env.NEXT_PUBLIC_API_URL}/scooters?${queryString}`
    : `${process.env.NEXT_PUBLIC_API_URL}/scooters`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  console.log('url PRODUCT LISTING PAGE',url); // clean, no need for the dash-padding trick

  if (!res.ok) {
    throw new Error(`Failed to fetch scooters: ${res.status}`);
  }
  const { data: SCOOTER_ITEMS } = await res.json();

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
      <main className="flex flex-col w-full pr-3.75 pl-4 pt-10 pb-20 md:pt-20  md:px-18 md:pb-30">
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

          {/* PRODUCTS  */}
          <div>
            <div className={config.gridClassName}>
              {config.items.map((item, i) => (
                <ProductCard
                  key={item.id ?? item.name + i}
                  item={item}
                  productType={pageType}
                />
              ))}
            </div>
            <Pagination PAGES={PAGES} />
          </div>
        </div>
      </main>
    </div>
  );
}
