"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Placeholder } from "./ui/Placeholder";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

type Item = { title: string; color: string; price: string; qty: number };

const INITIAL: Item[] = [
  {
    title: "Ninebot by Segway - F30 Plus",
    color: "შავი",
    price: "750.00₾",
    qty: 2,
  },
  {
    title: "Ninebot by Segway - F30 Plus",
    color: "შავი",
    price: "750.00₾",
    qty: 2,
  },
];

export default function CartPopover({ onClose }: { onClose: () => void }) {
  // const [items, setItems] = useState(INITIAL);
  const { items, clearCart, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = items.reduce(
    (sum, item) =>
      sum + (item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0),
    0,
  );
  const total = subtotal - discount;

  const setQty = (productId: string, delta: number, currentQty: number) => {
    const next = Math.max(1, currentQty + delta);
    updateQuantity(productId, next);
  };

  // const setQty = (i: number, d: number) =>
  //   setItems((prev) =>
  //     prev.map((it, idx) =>
  //       idx === i ? { ...it, qty: Math.max(1, it.qty + d) } : it,
  //     ),
  //   );

  return (
    <div className="absolute top-30 right-0 z-50 mt-3 w-[min(92vw,420px)] rounded-2xl border bg-card p-5 text-foreground shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold tracking-tight uppercase">
          კალათა
        </h2>
        <button
          onClick={() => clearCart()}
          className="text-sm text-muted-foreground underline hover:text-primary cursor-pointer"
        >
          გასუფთავება
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-start gap-3"
          >
            <Placeholder className="size-16 rounded-xl" label="" />
            <div className="min-w-0">
              <p className="text-xs leading-tight font-extrabold uppercase">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                ფერი: {item.color}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                aria-label="წაშლა"
                onClick={() => removeItem(item.productId)}
                className="text-muted-foreground hover:text-sale"
              >
                <X className="size-4" />
              </button>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="შემცირება"
                    onClick={() => setQty(item.productId, -1, item.quantity)}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    −
                  </button>
                  <span className="min-w-3 text-center">{item.quantity}</span>
                  <button
                    aria-label="გაზრდა"
                    onClick={() => setQty(item.productId, +1, item.quantity)}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="font-medium whitespace-nowrap">
                  {item.price}₾
                </span>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            კალათა ცარიელია
          </p>
        )}
      </div>

      <dl className="mt-5 space-y-1 border-t pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">ჯამი:</dt>
          <dd className="font-medium">{total}₾</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">ფასდაკლება:</dt>
          <dd className="font-medium">{discount}₾</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
        <span className="text-muted-foreground">გადასახდელი თანხა:</span>
        <span className="text-base font-extrabold">{subtotal}₾</span>
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
