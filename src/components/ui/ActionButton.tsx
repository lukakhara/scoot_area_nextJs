// components/ActionButton.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // or just template-literal it if you don't have this

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  compact?: boolean; // hides on lg and switches style, like your SortButton
}

export function ActionButton({ icon: Icon, label, onClick, compact = false }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-4 py-2 text-xs font-semibold uppercase ",
        compact ? "lg:hidden" : "lg:bg-transparent lg:px-0 lg:text-lg"
      )}
    >
      <Icon className="size-4 sm:size-6" /> {label}
    </button>
  );
}