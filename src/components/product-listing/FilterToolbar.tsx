import { Suspense } from "react";
import { FilterButton } from "./FilterButton";
import { SortButton } from "./SortButton";
import { CompareButton, CompareButtonMobile } from "../ui/CompareButton";
import { cn } from "@/lib/utils";

const FilterToolbar = ({
  haveFilterToolbarOnTop,
}: {
  haveFilterToolbarOnTop: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-start  md:justify-between gap-2 md:gap-3 w-full text-[#606060] ",
        haveFilterToolbarOnTop ? "mt-6 lg:mt-8" : "mt-10 pb-2 ",
      )}
    >
      <Suspense fallback={null}>
        {haveFilterToolbarOnTop ? (
          <FilterButton />
        ) : (
          <>
            <FilterButton />
            <div className="flex items-center gap-2 md:gap-8">
              <SortButton />
              <div className="hidden md:flex"><CompareButton href="/compare" /></div>
               <div className="md:hidden flex"><CompareButtonMobile href="/compare" variant="iconButton"/></div>
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default FilterToolbar;