// components/ActionButton.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionButtonVariant = "ghost" | "outline" | "notHeader";

interface ActionButtonProps {
  icon: LucideIcon;
  label?: string; // now optional, for icon-only usages
  onClick?: () => void;
  compact?: boolean;
  variant?: ActionButtonVariant;
  active?: boolean; // visually indicates a toggled/selected state
}

const variantStyles: Record<ActionButtonVariant, string> = {
  ghost: "bg-[#F5F5F5]",
  outline: "bg-[#F5F5F5] border border-[#1a1a1a] px-[37.5px]! py-3",
  notHeader: "text-[10.89px]! sm:text-[13.16px]! border-[0.66px] border-[#212121]" ,
};

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  compact = false,
  variant = "ghost",
  active = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full bg-[#F5F5F5] px-6 py-2 text-xs font-semibold uppercase cursor-pointer hover:bg-[#EAEAEA]",
        variantStyles[variant],
        compact ? "lg:hidden" : "lg:bg-transparent lg:px-0 lg:text-lg",
        active && "border-primary text-primary bg-primary/10",
      )}
    >
      <Icon
        className={cn(
          "size-[13.06px] sm:size-[15.08px] shrink-0",
           variant !== "notHeader" && "size-4! sm:size-6!",
        )}
      />
      {label}
    </button>
  );
}
