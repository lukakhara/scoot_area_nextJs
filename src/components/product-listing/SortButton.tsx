// SortButton.tsx
"use client";
import { ListFilter } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

import { useState } from "react";
import { cn } from "cn";

export function SortButton({
  onClick,
  compact = false,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const t = useTranslations("ProductListingPage.actions");

  const searchParams = useSearchParams(); 
  const router = useRouter(); 
  const pathname = usePathname();
  console.log('searchParams=',searchParams)
  console.log('router=',router)
  console.log('pathname=',pathname)

  function setSort(sort: string) {
    const params = new URLSearchParams(searchParams.toString()); // clone, don't mutate
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
    setShowSortDropdown(false);
  }



  const sortBy = [
    { param: "price", text: "Price: Low To High" },
    { param: "-price", text: "Price: High To Low" },
    { param: "name", text: "Name: Low To High" },
    { param: "-name", text: "Name: High To Low" },
    { param: "releaseDate", text: "Date: Low To High" },
    { param: "-releaseDate", text: "Date: High To Low" },
  ];

  const currentSort = searchParams.get("sort") ?? sortBy[0].param;

  return (
    <div className="relative">
      <ActionButton
        icon={ListFilter}
        label={t("sort")}
        onClick={() => setShowSortDropdown(!showSortDropdown)}
      />

      {showSortDropdown && (
        <ul className="bg-white border border-gray-400 rounded-sm flex flex-col justify-center gap-2  absolute z-999 py-2 text-nowrap">
          {sortBy.map((item, i) => (
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
