"use client";
import { useCartStore } from "@/store/cartStore";
import { ActionButton } from "./ActionButton";
import { ShoppingBasket } from "lucide-react";
import type { CartItem } from "@/types/cart";



export default function AddToCartButton({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <ActionButton
      icon={ShoppingBasket}
      variant="notHeader"
      label=" კალათაში დამატება"
      onClick={() => addItem(item)}
    />
  );
}
