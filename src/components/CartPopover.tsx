'use client'

import { useState } from "react";
import { X } from "lucide-react";
import { Placeholder } from "../components/Placeholder";
import Link from "next/link";


type Item = { title: string; color: string; price: string; qty: number };

const INITIAL: Item[] = [
  { title: "Ninebot by Segway - F30 Plus", color: "შავი", price: "750.00₾", qty: 2 },
  { title: "Ninebot by Segway - F30 Plus", color: "შავი", price: "750.00₾", qty: 2 },
];

export default function CartPopover({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState(INITIAL);

  const setQty = (i: number, d: number) =>
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, qty: Math.max(1, it.qty + d) } : it)),
    );

  return (
    <div className="absolute top-full right-0 z-50 mt-3 w-[min(92vw,420px)] rounded-2xl border bg-card p-5 text-foreground shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold tracking-tight uppercase">კალათა</h2>
        <button
          onClick={() => setItems([])}
          className="text-sm text-muted-foreground underline hover:text-primary"
        >
          გასუფთავება
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-start gap-3">
            <Placeholder className="size-16 rounded-xl" label="" />
            <div className="min-w-0">
              <p className="text-xs leading-tight font-extrabold uppercase">{item.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">ფერი: {item.color}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                aria-label="წაშლა"
                onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))}
                className="text-muted-foreground hover:text-sale"
              >
                <X className="size-4" />
              </button>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="შემცირება"
                    onClick={() => setQty(i, -1)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    −
                  </button>
                  <span className="min-w-3 text-center">{item.qty}</span>
                  <button
                    aria-label="გაზრდა"
                    onClick={() => setQty(i, 1)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    +
                  </button>
                </div>
                <span className="font-medium whitespace-nowrap">{item.price}</span>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">კალათა ცარიელია</p>
        )}
      </div>

      <dl className="mt-5 space-y-1 border-t pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">ჯამი:</dt>
          <dd className="font-medium">9000.00₾</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">ფასდაკლება:</dt>
          <dd className="font-medium">2000.00₾</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
        <span className="text-muted-foreground">გადასახდელი თანხა:</span>
        <span className="text-base font-extrabold">7000.00₾</span>
      </div>

      <Link
        href="/cart"
        onClick={onClose}
        className="mt-5 block rounded-full border py-3 text-center text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
      >
        შეამოწმე კალათა
      </Link>
    </div>
  );
}