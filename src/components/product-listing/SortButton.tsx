// SortButton.tsx
"use client";
import { ListFilter } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

import { useState } from "react";
import { cn } from "cn";

export function SortButton({
}: {
}) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const t = useTranslations("sortButton");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setSort(sort: string) {
    const params = new URLSearchParams(searchParams.toString()); // clone, don't mutate
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
    setShowSortDropdown(false);
  }

  const isScootersPage = pathname.includes("scooter");

  const sortOptions = [
    { param: "price", text: t("priceLowToHigh") },
    { param: "-price", text: t("priceHighToLow") },
    { param: "name", text: t("nameLowToHigh") },
    { param: "-name", text: t("nameHighToLow") },
    ...(isScootersPage
      ? [
          { param: "releaseDate", text: t("dateLowToHigh") },
          { param: "-releaseDate", text: t("dateHighToLow") },
        ]
      : []),
  ];

  const currentSort = searchParams.get("sort") ?? sortOptions[0].param;

  return (
    <div className="relative text-[#606060] ">
      <ActionButton
        icon={ListFilter}
        label={t("sort")}
        onClick={() => setShowSortDropdown(!showSortDropdown)}
        variant="sort"
      />

      {showSortDropdown && (
        <ul className="  bg-white border border-gray-400 rounded-sm flex flex-col justify-center gap-2  absolute z-999 py-2 text-nowrap  md:left-1/2 md:-translate-x-1/2 text-black
        left-10 -translate-x-2/3">
          {sortOptions.map((item) => (
            <li
              key={item.text}
              className={cn(
                "px-2 border border-transparent hover:border-[#2162a1] hover:shadow-[inset_3px_0_0_0_#2162a1] hover:bg-[#edf8ff] hover:cursor-pointer",
                currentSort === item.param
                  ? " border-[#2162a1] shadow-[inset_3px_0_0_0_#2162a1] bg-[#edf8ff]" // Active state for the first item
                  : "", // Hover state for the rest
              )}
              onClick={() => {
                setSort(item.param);
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
