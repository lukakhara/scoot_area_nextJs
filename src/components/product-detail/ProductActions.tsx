"use client";
import { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";
import { AddToCartButtonDetailedPage, BuyNowButton } from "../ui/AddToCartButton";

export function ProductActions({
  productId,
  pageType,
  isScooter,
}: {
  productId: string; // match your actual type
  pageType: string; // match your actual type
  isScooter: boolean;
}) {
  const [quantity, setQuantity] = useState(1);

  const item = { productId, productType: pageType, quantity };

  return (
    <>
      <QuantitySelector
        isScooter={isScooter}
        value={quantity}
        onChange={setQuantity}
      />
      <AddToCartButtonDetailedPage item={item} />
      <BuyNowButton item={item} />
    </>
  );
}
