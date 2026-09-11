// SortButton.tsx

import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { Shuffle } from "lucide-react";

export function CompareButton({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  const t = useTranslations("ProductListingPage.actions");
  return <ActionButton icon={Shuffle} label={t("compare")} onClick={onClick} compact={compact} variant="outline" />;
}

