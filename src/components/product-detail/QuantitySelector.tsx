"use client";
import { cn } from "@/lib/utils";

type Props = {
  isScooter: boolean;
  value: number;
  onChange: (value: number) => void;
};

export function QuantitySelector({ isScooter, value, onChange }: Props) {
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-[#212121]",
        isScooter
          ? "px-[13px] py-[6.5px] text-[13px] md:px-[26px] md:py-[15px] md:text-[24px] max-w-[94px]"
          : "px-4 py-2.5",
      )}
    >
      <input
        type="number"
        inputMode="numeric"
        min={1}
        step={1}
        value={value}
        aria-label="რაოდენობა"
        onChange={(e) => {
          const n = Math.floor(Number(e.target.value));
          onChange(Number.isFinite(n) && n >= 1 ? n : 1);
        }}
        className="w-16 bg-transparent text-center font-semibold outline-none md:w-11"
      />
    </div>
  );
}