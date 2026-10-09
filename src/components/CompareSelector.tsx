"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { ScooterCompare } from "@/types/product";
import ProductCardImage from "@/components/ui/ProductCardImage";

const MAX_SELECTED = 4;
const MIN_SELECTED = 2; // minimum needed to compare

export default function CompareSelector({
  scooters,
}: {
  scooters: ScooterCompare[];
}) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const maxReached = selectedIds.length >= MAX_SELECTED;
  const canCompare = selectedIds.length >= MIN_SELECTED;

  const toggleProduct = (id: string) =>
    setSelectedIds((cur) =>
      cur.includes(id)
        ? cur.filter((i) => i !== id)
        : cur.length >= MAX_SELECTED
          ? cur
          : [...cur, id],
    );

  const goToCompare = () => {
    if (!canCompare) return;
    const [first, ...others] = selectedIds;
    const query = others.length ? `?others=${others.join(",")}` : "";
    router.push(`/compare-products/${first}${query}`);
  };
  return (
    <section className="mt-6">
      {/* Column headings (stay fixed above the scroll area) */}
      <div className="hidden grid-cols-[minmax(0,1fr)_140px_40px] items-center gap-4 border-b pb-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase sm:grid">
        <span>პროდუქტი</span>
        <span>ფასი</span>
        <span />
      </div>

      {/* Scrollable list */}
      <ul className="max-h-[60vh] overflow-y-auto [scrollbar-width:thin]">
        {scooters.map((scooter) => {
          const active = selectedIds.includes(scooter.id);
          const disabled = maxReached && !active;

          return (
            <li
              key={scooter.id}
              className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 border-b py-4 sm:grid-cols-[minmax(0,1fr)_140px_40px]"
            >
              <div className="flex items-center gap-4 sm:col-span-1">
                <div className="size-32">
                  <ProductCardImage
                    src={scooter.images[0]}
                    alt={`${scooter.name}'s image`}
                    width={128}
                    height={128}
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase">{scooter.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    scooter.color temporarily
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold text-muted-foreground">
                {scooter.price}₾
              </span>

              <button
                type="button"
                aria-label="არჩევა"
                aria-pressed={active}
                disabled={disabled}
                onClick={() => toggleProduct(scooter.id)}
                className={`mr-5 justify-self-end flex size-4 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  active ? "border-sale bg-sale" : "border-border"
                }`}
              />
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground ">
        {selectedIds.length} / {MAX_SELECTED}
      </p>

      <button
        type="button"
        onClick={goToCompare}
        disabled={!canCompare}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-semibold uppercase transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" /> შედარება
      </button>
    </section>
  );
}
