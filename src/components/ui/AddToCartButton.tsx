"use client";

import { ShoppingBasket } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types/cart";
import { ActionButton } from "./ActionButton";

const NAMESPACE = "ProductListingPage.actions";

export default function AddToCartButton({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations(NAMESPACE);

  return (
    <ActionButton
      icon={ShoppingBasket}
      variant="addToCartCompare"
      label={t("addToCart")}
      onClick={() => addItem(item)}
    />
  );
}

export function AddToCartButtonDetailedPage({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations(NAMESPACE);

  return (
    <ActionButton
      variant="addToCart"
      label={t("addToCart")}
      onClick={() => addItem(item)}
    />
  );
}

export function BuyNowButton({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations(NAMESPACE);
  const router = useRouter();

  return (
    <ActionButton
      variant="addToCart"
      label={t("buyNow")}
      onClick={() => {
        addItem(item);
        router.push("/cart");
      }}
    />
  );
}