// lib/mappers/product.ts
import type {
  ScooterProduct,
  AccessoryProduct,
  SparePartProduct,
  BlogProduct,
  BlogApi,
  SparePartApi,
  AccessoryApi,
  ScooterApi,
} from "@/types/product";

export function toScooterCardProduct(s: ScooterApi): ScooterProduct {
  return {
    productType: "scooter",
    id: s.id,
    name: s.name,
    price: s.price,
    images: s.images,
    releaseDate: s.releaseDate,
    weight: s.weight,
    engine: s.engine,
    maxSpeed: s.maxSpeed,
    maxRange: s.maxRange,
    warranty: s.warranty,
    discountPrice: s.discountPrice,
    discountEndsAt: s.discountEndsAt,
    installment: s.installment,
  };
}

export function toAccessoryCardProduct(a: AccessoryApi): AccessoryProduct {
  return {
    id: a.id,
    name: a.name,
    price: a.price,
    discountPrice: a.discountPrice,
    discountEndsAt: a.discountEndsAt,
    images: a.images,
    productType: "accessory",
  };
}

export function toSparePartCardProduct(p: SparePartApi): SparePartProduct {
  return {
    discountPrice: p.discountPrice,
    discountEndsAt: p.discountEndsAt,
    productType: "parts",
    id: p.id,
    name: p.name,
    price: p.price,
    images: p.images,
  };
}

export function toBlogCardProduct(b: BlogApi): BlogProduct {
  return {
    productType: "blog" as const,
    id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    publishedAt: b.publishedAt,
    coverImage: b.coverImage,
  };
}


