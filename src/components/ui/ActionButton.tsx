// components/ActionButton.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // or just template-literal it if you don't have this

type ActionButtonVariant = 'ghost' | 'outline' | 'smallOutline'

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  compact?: boolean; // hides on lg and switches style, like your SortButton
  variant?:ActionButtonVariant;
}

const variantStyles: Record<ActionButtonVariant, string> = {
  ghost: "bg-[#F5F5F5]",
  outline: "bg-[#F5F5F5] border border-[#1a1a1a] px-[37.5px]! py-3",
  smallOutline : "bg-[#F5F5F5] border border-[#1a1a1a]  py-3",
};

export function ActionButton({ icon: Icon, label, onClick, compact = false,variant = 'ghost' }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-6 py-2 text-xs font-semibold uppercase cursor-pointer hover:bg-[#EAEAEA] ",
        variantStyles[variant],
        compact ? "lg:hidden" : "lg:bg-transparent lg:px-0 lg:text-lg"
      )}
    >
      <Icon className="size-4 sm:size-6" /> {label}
    </button>
  );
}