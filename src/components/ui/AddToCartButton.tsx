"use client";
import { useCartStore } from "@/store/cartStore";
import { ActionButton } from "./ActionButton";
import { ShoppingBasket } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { useTranslations } from "next-intl";



export default function AddToCartButton({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations('actions')
  return (
    <ActionButton
      icon={ShoppingBasket}
      variant="addToCartCompare"
      label={t('addToCart')}
      onClick={() => addItem(item)}
    />
  );
}
