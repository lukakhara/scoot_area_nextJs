"use client";
import { useEffect, useState } from "react";
import type { ProductType } from "@/types/product";
import type { ApiProduct, CartItem } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PRODUCT_ENDPOINTS: Record<ProductType, string> = {
  scooter: "scooters",
  accessory: "accessories",
  parts: "parts",
};

export const cartKey = (item: Pick<CartItem, "productType" | "productId">) =>
  `${item.productType}:${item.productId}`;

// price the customer pays per unit
export const unitPrice = (p: ApiProduct) => Number(p.discountPrice ?? p.price);

// original price, only when a discount exists
export const fullPrice = (p: ApiProduct) =>
  p.discountPrice != null ? Number(p.price) : null;

export function useCartProducts(items: CartItem[]) {
  const [products, setProducts] = useState<Record<string, ApiProduct>>({});
  const [loading, setLoading] = useState(items.length > 0);
  const [error, setError] = useState(false);

  // changes only when a product is added/removed, not when quantity changes
  const itemsKey = items.map(cartKey).sort().join(",");

  useEffect(() => {
    if (items.length === 0) {
      setProducts({});
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const results = await Promise.all(
          items.map(async (item) => {
            const res = await fetch(
              `${API_URL}/${PRODUCT_ENDPOINTS[item.productType]}/${item.productId}`,
              { signal: controller.signal },
            );

            if (res.status === 404) return null; // product no longer exists
            if (!res.ok) throw new Error("Failed to load product");

            const json = await res.json();
            const data: ApiProduct = json.data ?? json;
            return [cartKey(item), data] as const;
          }),
        );

        setProducts(
          Object.fromEntries(
            results.filter((r): r is readonly [string, ApiProduct] => r !== null),
          ),
        );
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  return { products, loading, error };
}