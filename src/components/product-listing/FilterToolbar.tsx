import React, { Suspense } from "react";
import { FilterButton } from "./FilterButton";
import { SortButton } from "./SortButton";
import { CompareButton } from "../ui/CompareButton";
import { cn } from "@/lib/utils";

const FilterToolbar = ({
  haveFilterToolbarOnTop,
}: {
  haveFilterToolbarOnTop: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 w-full ",
        haveFilterToolbarOnTop ? "mt-6 lg:mt-8" : "mt-10 pb-2",
      )}
    >
      <Suspense fallback={null}>
        {haveFilterToolbarOnTop ? (
          <FilterButton />
        ) : (
          <>
            <FilterButton />
            <div className="flex items-center gap-8">
              <SortButton />
              <CompareButton href="/compare" />
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default FilterToolbar;