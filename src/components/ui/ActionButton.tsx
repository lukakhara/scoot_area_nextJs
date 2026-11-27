// components/ActionButton.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionButtonVariant =
  | "ghost"
  | "outline"
  | "notHeader"
  | "filter"
  | "addToCartCompare"
  | "addToCart"
  | "iconButton"
  | "sort";

interface ActionButtonProps {
  icon?: LucideIcon;
  label?: string; // now optional, for icon-only usages
  onClick?: () => void;
  compact?: boolean;
  variant?: ActionButtonVariant;
  active?: boolean; // visually indicates a toggled/selected state
}

const variantStyles: Record<ActionButtonVariant, string> = {
  ghost: "bg-[#F5F5F5]",
  iconButton: "bg-[#F5F5F5] border border-[#1a1a1a] p-[5.6px] border-[#606060]",
  outline:
    "bg-[#F5F5F5] border border-[#1a1a1a] px-[37.5px]! py-3 border-[#606060]",
  notHeader:
    "text-[10.89px]! sm:text-[13.16px]! border-[0.66px] border-[#212121]",
  filter: "cursor-pointer hover:opacity-70 md:cursor-default",
  addToCartCompare:
    "text-[10.89px]! sm:text-[13.16px]! border-[0.66px] border-[#212121] active:scale-95  w-full ",
  addToCart:
    "flex cursor-pointer items-center justify-center rounded-[100px] border border-[#212121] px-[13px] py-[6.5px] text-[13px] md:px-6 md:py-[12.5px] md:text-[24px]",
  sort:"px-2"
};

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  compact = false,
  variant = "ghost",
  active = false,
}: ActionButtonProps) {
  const hasOwnSizing = variant === "addToCart";

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F5F5F5] px-4 md:px-6 py-2 text-xs font-semibold capitalize ",
        compact
          ? "lg:hidden"
          : !hasOwnSizing && "lg:bg-transparent lg:px-0 lg:text-lg",
        onClick && "hover:bg-[#EAEAEA]",
        variantStyles[variant],
        active && "border-primary bg-primary/10 text-primary",
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "size-[13.06px] sm:size-[15.08px] shrink-0",
            variant !== "notHeader" && "size-4! sm:size-6!",
          )}
        />
      )}

      {label}
    </button>
  );
}
