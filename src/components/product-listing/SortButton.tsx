// SortButton.tsx
import { ListFilter } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";

export function SortButton({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  const t = useTranslations("ProductListingPage.actions");
  return <ActionButton icon={ListFilter} label={t("sort")} onClick={onClick} compact={compact} />;
}