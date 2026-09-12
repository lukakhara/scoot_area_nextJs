// SortButton.tsx

import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { Shuffle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function CompareButton({
  onClick,
  compact = false,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  const t = useTranslations("ProductListingPage.actions");

  return (
    <Link
      href='/compare'>
      <ActionButton
        icon={Shuffle}
        label={t("compare")}
        onClick={onClick}
        compact={compact}
        variant="outline"
      />
    </Link>
  );
}
