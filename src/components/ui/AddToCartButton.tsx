"use client";
import { useCartStore } from "@/store/cartStore";
import { ActionButton } from "./ActionButton";
import { ShoppingBasket } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function AddToCartButton({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations("actions");
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
  const t = useTranslations("actions");
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
  const t = useTranslations("actions");
  const router = useRouter();
  return (
    <ActionButton
      variant="addToCart"
      label={t("buyNow")}
      onClick={() => {
        (addItem(item),
         router.push("/cart"));
      }}
    />
  );
}
