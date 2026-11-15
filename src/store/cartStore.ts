// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

type ItemKey = Pick<CartItem, "productType" | "productId">;

type CartStore = {
  items: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productType: CartItem["productType"], productId: string) => void;
  updateQuantity: (
    productType: CartItem["productType"],
    productId: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
};

const isSame = (a: ItemKey, b: ItemKey) =>
  a.productType === b.productType && a.productId === b.productId;

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [{ productId:'035d17e4-941c-480c-ac98-0126299449cb',  productType: 'scooter',quantity: 1}],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => isSame(i, item));
          if (existing) {
            return {
              items: state.items.map((i) =>
                isSame(i, item)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productType, productId) =>
        set((state) => ({
          items: state.items.filter((i) => !isSame(i, { productType, productId })),
        })),

      updateQuantity: (productType, productId, quantity) =>
        set((state) => {
          const target = { productType, productId };
          // Remove the item if quantity drops to 0 or below
          if (quantity <= 0) {
            return { items: state.items.filter((i) => !isSame(i, target)) };
          }
          return {
            items: state.items.map((i) =>
              isSame(i, target) ? { ...i, quantity } : i,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      version: 1,
      partialize: (state) => ({ items: state.items }),
      // drop old-format items (full product data, no productType) saved by earlier versions
      migrate: (persisted) => {
        const old = persisted as { items?: Partial<CartItem>[] } | undefined;
        return {
          items: (old?.items ?? []).filter(
            (i): i is CartItem =>
              !!i.productType && !!i.productId && typeof i.quantity === "number",
          ),
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // fires once localStorage data has loaded
      },
    },
  ),
);