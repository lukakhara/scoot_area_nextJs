import type { ProductType } from "./product";

export interface CartItem {
  productId: string;
  productType: ProductType;
  quantity: number;
}

// what the product endpoints return
export interface ApiProduct {
  id: string;
  name: string;
  images?: string[];
  price: string | number;
  discountPrice?: string | number | null;
  color?: string | null;
}