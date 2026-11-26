"use client";
// FilterButton.tsx
import { Funnel } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { useFilterStore } from "@/store/filterStore";

export function FilterButton({ onClick }: { onClick?: () => void }) {
  const filtersOpen = useFilterStore((s) => s.filtersOpen);
  const toggleFilters = useFilterStore((s) => s.toggleFilters);

  const t = useTranslations("ProductListingPage.actions");
  return (
    <ActionButton
      onClick={toggleFilters}
      aria-expanded={filtersOpen}
      icon={Funnel}
      label={t("filter")}
      variant="filter"
    />
  );
}
