"use client";
import { useShallow } from "zustand/react/shallow";
import { X } from "lucide-react";
import { Placeholder } from "./ui/Placeholder";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import ProductCardImage from "./ui/ProductCardImage";
import {
  cartKey,
  fullPrice,
  unitPrice,
  useCartProducts,
} from "@/hooks/useCartProducts";
import type { CartItem } from "@/types/cart";

export default function CartPopover({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
    })),
  );

  const { products, loading, error } = useCartProducts(items);

  const lines = items.map((item) => ({
    item,
    product: products[cartKey(item)],
  }));

  // original prices total, amount to pay, and the difference
  const fullTotal = lines.reduce(
    (sum, { item, product }) =>
      product
        ? sum + (fullPrice(product) ?? unitPrice(product)) * item.quantity
        : sum,
    0,
  );
  const priceToPay = lines.reduce(
    (sum, { item, product }) =>
      product ? sum + unitPrice(product) * item.quantity : sum,
    0,
  );
  const discountTotal = fullTotal - priceToPay;

  const changeQuantity = (item: CartItem, delta: number) => {
    // the store removes the item when quantity drops to 0
    updateQuantity(item.productType, item.productId, item.quantity + delta);
  };

  return (
    <div className="absolute top-8 -right-15 z-50 mt-3 w-[min(92vw,420px)] rounded-2xl border bg-card p-5 text-foreground shadow-xl ">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold tracking-tight uppercase">
          კალათა
        </h2>
        <button
          onClick={() => clearCart()}
          className="text-sm text-muted-foreground underline hover:text-primary 
          hover:cursor-pointer"
        >
          გასუფთავება
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {lines.map(({ item, product }) => {
          const image = product?.images?.[0];

          return (
            <div
              key={cartKey(item)}
              className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-start gap-3"
            >
              {image ? (
                <ProductCardImage src={image} alt={product?.name ?? "product image"} />
              ) : (
                <Placeholder />
              )}

              <div className="min-w-0">
                {product ? (
                  <>
                    <p className="text-xs leading-tight font-extrabold uppercase">
                      {product.name}
                    </p>
                    {product.color && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        ფერი: {product.color}
                      </p>
                    )}
                  </>
                ) : loading ? (
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                ) : (
                  <p className="text-xs text-[#EA2700]">პროდუქტი მიუწვდომელია</p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  aria-label="წაშლა"
                  onClick={() => removeItem(item.productType, item.productId)}
                  className="text-muted-foreground hover:text-sale hover:cursor-pointer"
                >
                  <X className="size-4" />
                </button>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="შემცირება"
                      onClick={() => changeQuantity(item, -1)}
                      className="text-muted-foreground hover:text-primary  hover:cursor-pointer"
                    >
                      −
                    </button>
                    <span className="min-w-3 text-center">{item.quantity}</span>
                    <button
                      aria-label="გაზრდა"
                      onClick={() => changeQuantity(item, 1)}
                      className="text-muted-foreground hover:text-primary  hover:cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {product && (
                    <span className="font-medium whitespace-nowrap">
                      {unitPrice(product).toFixed(2)}₾
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            კალათა ცარიელია
          </p>
        )}

        {error && (
          <p role="alert" className="text-center text-sm text-[#EA2700]">
            პროდუქტების ჩატვირთვა ვერ მოხერხდა
          </p>
        )}
      </div>

      <dl className="mt-5 space-y-1 border-t pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">ჯამი:</dt>
          <dd className="font-medium">{fullTotal.toFixed(2)}₾</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">ფასდაკლება:</dt>
          <dd className="font-medium">{discountTotal.toFixed(2)}₾</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
        <span className="text-muted-foreground">გადასახდელი თანხა:</span>
        <span className="text-base font-extrabold">{priceToPay.toFixed(2)}₾</span>
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