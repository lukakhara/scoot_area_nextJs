// ProductListingPage.tsx
import { useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Shuffle,
  SlidersHorizontal,
} from "lucide-react";
import { FilterPanel, PART_GROUPS } from "../components/FilterPanel";
import { ProductCard } from "../components/ProductCard";
import { SCOOTER_ITEMS, PARTS_ITEMS, ACCESSORY_ITEMS } from "../data/products";
import { type Product } from "../types/product";

type PageType = "scooters" | "parts" | "accessories";

type PageConfig = {
  title: string;
  description?: string[];
  items: Product[];
  filterGroups?: React.ComponentProps<typeof FilterPanel>["groups"];
  gridClassName: string;
  headerActions: boolean;
};

const PAGE_CONFIG: Record<PageType, PageConfig> = {
  scooters: {
    title: "სკუტერები",
    description: [
      "ელექტრო სკუტერი ხშირად აჩნევს 25-დან 50 კმ/სთ-მდე სიჩქარეს. წაქცევის ან შეჯახების შემთხვევაში, ჩაფხუტი მნიშვნელოვნად ამცირებს თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს აუცილებლობაა.",
      "ელექტრო სკუტერი ხშირად აჩნევს 25-დან 50 კმ/სთ-მდე სიჩქარეს. წაქცევის ან შეჯახების შემთხვევაში, ჩაფხუტი მნიშვნელოვნად ამცირებს თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს აუცილებლობაა.",
    ],
    items: SCOOTER_ITEMS,
    filterGroups: undefined,
    gridClassName: "grid gap-6 sm:grid-cols-2",
    headerActions: false,
  },
  parts: {
    title: "სათადარიგო ნაწილები",
    items: PARTS_ITEMS,
    filterGroups: PART_GROUPS,
    gridClassName: "grid grid-cols-2 gap-4 sm:gap-6",
    headerActions: true,
  },
  accessories: {
    title: "აქსესუარები", // TODO: confirm real heading text
    items: ACCESSORY_ITEMS,
    filterGroups: undefined,
    gridClassName: "grid grid-cols-2 gap-4 sm:gap-6",
    headerActions: true,
  },
};

export default function ProductListingPage({ pageType }: { pageType: PageType }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const config = PAGE_CONFIG[pageType];

  console.log('rendered +')

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-10 pb-16">
        <div className="flex items-start justify-between gap-4">
          <h1 className="max-w-xl text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            {config.title}
          </h1>

          {config.headerActions && (
            <div className="hidden items-center gap-6 lg:flex">
              <button className="inline-flex items-center gap-2 text-lg font-semibold">
                <ListFilter className="size-5" /> სორტირება
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base font-semibold transition-colors hover:border-primary hover:text-primary">
                <ArrowLeftRight className="size-4" /> შედარება
              </button>
            </div>
          )}
        </div>

        {config.description && (
          <div className="mt-6 max-w-4xl space-y-4 text-sm text-muted-foreground sm:text-base">
            {config.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {config.headerActions ? (
          <div className="mt-6 flex items-center justify-between gap-3 lg:mt-8">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase lg:bg-transparent lg:px-0 lg:text-lg"
            >
              <SlidersHorizontal className="size-4 lg:size-5" /> ფილტრი
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold lg:hidden">
              <ListFilter className="size-4" /> სორტირება
            </button>
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-between gap-3 border-b pb-6">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase lg:bg-transparent lg:px-0 lg:text-lg"
            >
              <SlidersHorizontal className="size-4 lg:size-5" /> ფილტრი
            </button>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold lg:bg-transparent lg:px-0 lg:text-lg">
                <ListFilter className="size-4 lg:size-5" /> სორტირება
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary sm:px-6 sm:py-3">
                <Shuffle className="size-4" />
                <span className="hidden sm:inline">შედარება</span>
              </button>
            </div>
          </div>
        )}

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
              className="mt-12 flex items-center justify-center gap-2"
              aria-label="გვერდები"
            >
              <button
                aria-label="წინა"
                className="flex size-9 items-center justify-center rounded-full border hover:border-primary"
              >
                <ChevronLeft className="size-4" />
              </button>
              {["1", "2", "3", "4", "…"].map((p) => (
                <button
                  key={p}
                  className="flex size-9 items-center justify-center rounded-full border text-sm hover:border-primary hover:text-primary"
                >
                  {p}
                </button>
              ))}
              <button
                aria-label="შემდეგი"
                className="flex size-9 items-center justify-center rounded-full border hover:border-primary"
              >
                <ChevronRight className="size-4" />
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}