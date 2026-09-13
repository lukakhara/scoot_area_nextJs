"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector({ isScooter }: { isScooter: boolean }) {
  const [qty, setQty] = useState(1);

  return (
    <div
      className={
        isScooter
          ? "flex items-center gap-3 rounded-full border px-3 py-2"
          : "flex items-center gap-3 rounded-full border px-4 py-2.5"
      }
    >
      <button
        aria-label="შემცირება"
        onClick={() => setQty((v) => Math.max(1, v - 1))}
        className="text-muted-foreground hover:text-primary"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-5 text-center text-sm font-semibold">{qty}</span>
      <button
        aria-label="გაზრდა"
        onClick={() => setQty((v) => v + 1)}
        className="text-muted-foreground hover:text-primary"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}