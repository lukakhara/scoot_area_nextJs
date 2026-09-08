import React from "react";
import { FilterButton } from "./FilterButton";
import { SortButton } from "./SortButton";
import { CompareButton } from "./CompareButton";
import { cn } from "@/lib/utils";

const FilterToolbar = ({
  haveFilterToolbarOnTop,
}: {
  haveFilterToolbarOnTop: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 w-full",
        haveFilterToolbarOnTop ? "mt-6 lg:mt-8" : "mt-10 pb-2"
      )}
    >
      {haveFilterToolbarOnTop ? (
        // headerActions: true → just Filter, below the title/sort row (image 2)
        <FilterButton />
      ) : (
        // headerActions: false → Filter left, Sort + Compare right (image 1)
        <>
          <FilterButton />
          <div className="flex items-center gap-8">
            <SortButton />
            <CompareButton />
          </div>
        </>
      )}
    </div>
  );
};

export default FilterToolbar;


