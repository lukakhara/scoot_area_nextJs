// lib/pricing.ts
export function getDiscountInfo(item: {
  price: number | string;
  discountPrice?: number | string | null;
  discountEndsAt?: Date | string | null;
}) {
  const price = Number(item.price);
  const discountPrice =
    item.discountPrice != null ? Number(item.discountPrice) : null;

  const active =
    discountPrice !== null &&
    discountPrice < price &&
    (!item.discountEndsAt || new Date(item.discountEndsAt) > new Date());

  return {
    hasDiscount: active,
    finalPrice: active ? discountPrice! : price,
    discountPercent: active
      ? Math.round(((price - discountPrice!) / price) * 100)
      : 0,
  };
}