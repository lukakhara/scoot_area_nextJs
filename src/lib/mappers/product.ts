// lib/mappers/product.ts
import type {
  Scooter,
  Product,
  AccessoryCardProduct,
  Accessory,
} from "@/types/product";

export function toScooterCardProduct(s: Scooter): Product {
  return {
    productType: "scooter",
    id: s.id,
    name: s.name,
    brand: s.brand,
    price: s.price,
    images: s.images,
    releaseDate: s.releaseDate,
    weight: s.weight,
    chargingTime: s.chargingTime,
    driveType: s.driveType,
    antiSlipSystem: s.antiSlipSystem,
    engine: s.engine,
    maxSpeed: s.maxSpeed,
    maxRange: s.maxRange,
    warranty: s.warranty,
    imagePath: { mobile: s.images[0] ?? "", desktop: s.images[0] ?? "" },
  };
}

// lib/mappers/product.ts

export function toAccessoryCardProduct(
  accessory: Accessory,
): AccessoryCardProduct {
  return {
    id: accessory.id,
    name: accessory.name,
    brand: accessory.brand,
    price: accessory.price,
    images: accessory.images,
    category: accessory.category,
    size: accessory.size,
    sex: accessory.sex,
    productType: "accessory",
  };
}
