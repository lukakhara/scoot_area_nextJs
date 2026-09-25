// types/cart.ts — the single shared type, imported by cartStore, AddToCartButton, and this page
import type { Product } from "./product";

export type CartItem = {
  productId: string;
  productType: Product["productType"];
  title: string;
  color?: string;
  image?: string;
  price: number;
  oldPrice?: number;
  quantity: number;
};