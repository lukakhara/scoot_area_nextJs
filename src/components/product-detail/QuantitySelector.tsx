"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function QuantitySelector({ isScooter }: { isScooter: boolean }) {
  const [qty, setQty] = useState("1");

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
        value={qty}
        aria-label="რაოდენობა"
        onChange={(e) => setQty(e.target.value)}
        onBlur={() => {
          const n = Math.floor(Number(qty));
          setQty(String(Number.isFinite(n) && n >= 1 ? n : 1));
        }}
        className="w-16 bg-transparent text-center font-semibold outline-none md:w-11"
      />
    </div>
  );
}