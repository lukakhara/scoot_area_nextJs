// FilterButton.tsx
import { Funnel } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";

export function FilterButton({ onClick }: { onClick: () => void }) {
  const t = useTranslations("ProductListingPage.actions");
  return <ActionButton icon={Funnel} label={t("filter")} onClick={onClick} />;
}