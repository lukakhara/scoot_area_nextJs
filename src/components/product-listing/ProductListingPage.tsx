// ProductListingPage.tsx
import {
  ACCESSORY_GROUPS,
  FilterPanel,
  PART_GROUPS,
  SCOOTER_GROUPS,
} from "./FilterPanel";
import { ProductCard } from "../ProductCard";
import type {
  Product,
  Scooter,
  Accessory,
  ProductUnits,
  SparePart,
} from "../../types/product";

import { SortButton } from "@/components/product-listing/SortButton";
import FilterToolbar from "@/components/product-listing/FilterToolbar";
import Pagination from "@/components/ui/Pagination";
import { getTranslations } from "next-intl/server";

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
  items: Product[];
  filterGroups: React.ComponentProps<typeof FilterPanel>["groups"];
  gridClassName: string;
  headerActions: boolean;
};

function toScooterCardProduct(s: Scooter): Product {
  return {
    productType: "scooter",
    id: s.id,
    name: s.name,
    brand: s.brand,
    price: s.price,
    images: s.images,
    releaseDate: s.releaseDate,
    weight: s.weight,
    chargingTime: s.chargingTime,
    driveType: s.driveType,
    antiSlipSystem: s.antiSlipSystem,
    engine: s.engine,
    maxSpeed: s.maxSpeed,
    maxRange: s.maxRange,
    warranty: s.warranty,
    imagePath: { mobile: s.images[0] ?? "", desktop: s.images[0] ?? "" },
  };
}

function toAccessoryCardProduct(a: Accessory): Product {
  return {
    productType: "accessory",
    id: a.id,
    name: a.name,
    brand: a.brand,
    price: a.price,
    images: a.images,
    category: a.category,
    size: a.size ?? undefined,
    sex: a.sex,
    imagePath: { mobile: a.images[0] ?? "", desktop: a.images[0] ?? "" },
  };
}

function toSparePartCardProduct(p: SparePart): Product {
  return {
    productType: "parts",
    id: p.id,
    name: p.name,
    brand: p.manufacturer ?? "",
    price: p.price,
    images: p.images,
    category: p.category,
    imagePath: { mobile: p.images[0] ?? "", desktop: p.images[0] ?? "" },
  };
}

// Endpoint + mapper live together, keyed off the same pageType the route already uses
const FETCH_CONFIG: Record<
  PageType,
  { endpoint: string; map: (raw: any) => Product }
> = {
  scooters: { endpoint: "scooters", map: toScooterCardProduct },
  accessories: { endpoint: "accessories", map: toAccessoryCardProduct },
  parts: { endpoint: "parts", map: toSparePartCardProduct }, // was `null`
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
    if (v !== undefined && v !== "") {
      query.set(key, v);
    }
  }
  

  query.set("locale", locale);
  const queryString = query.toString();

 

  let items: Product[];
  let meta: PageMeta;

  const fetchConfig = FETCH_CONFIG[pageType];

  const url = queryString
    ? `${process.env.NEXT_PUBLIC_API_URL}/${fetchConfig.endpoint}?${queryString}`
    : `${process.env.NEXT_PUBLIC_API_URL}/${fetchConfig.endpoint}`;


  const res = await fetch(url, { next: { revalidate: 60 } });


  if (!res.ok) {
    throw new Error(`Failed to fetch ${fetchConfig.endpoint}: ${res.status}`);
  }

  const { data: rawItems, meta: rawMeta } = (await res.json()) as {
    data: any[];
    meta: PageMeta;
  };

  items = rawItems.map(fetchConfig.map);
  meta = rawMeta;


  const PAGE_CONFIG: Record<PageType, Omit<PageConfig, "items">> = {
    scooters: {
      title: t("titles.scooters"),
      description: [t("description"), t("description")],
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

  const config: PageConfig = { ...PAGE_CONFIG[pageType], items };
  console.log("config", config);


  return (
    <div className="min-h-screen bg-background ">
      <main className="flex flex-col w-full pr-3.75 pl-4 pt-10 pb-20 md:pt-20 md:px-18 md:pb-30">
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:mt-8 ">
          <FilterPanel groups={config.filterGroups} />

          <div >
            <div className={config.gridClassName}>
              {items.length === 0 ? (
                <div className="col-span-full text-center text-5xl text-red-500">
                  Sorry, there isn't any items
                </div>
              ) : (
                config.items.map((item, i) => (
                  <ProductCard
                    key={item.id ?? `${item.name}-${i}`}
                    item={item}
                  />
                ))
              )}
            </div>
            {items.length === 0 ? (
              ""
            ) : (
              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
