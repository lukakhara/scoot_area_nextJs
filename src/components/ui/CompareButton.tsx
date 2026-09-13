// components/CompareButton.tsx
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { Shuffle } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ActionButtonVariant = "ghost" | "outline" | "notHeader";

interface CompareButtonProps {
  onClick?: () => void;
  compact?: boolean;
  variant?: ActionButtonVariant;
  href?: string; // if provided, wraps the button in a Link; omit for pure toggle behavior
  active?: boolean; // e.g. "already added to compare" state on a card
  showLabel?: boolean;
}

export function CompareButton({
  onClick,
  compact = false,
  variant = "outline",
  href,
  active = false,
  showLabel = true,
}: CompareButtonProps) {
  const t = useTranslations("actions");

  const button = (
    <ActionButton
      icon={Shuffle}
      label={showLabel ? t("compare") : undefined}
      onClick={onClick}
      compact={compact}
      variant={variant}
      active={active}
    />
  );

  return href ? <Link href={href}>{button}</Link> : button;
}