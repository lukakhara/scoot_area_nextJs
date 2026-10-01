// lib/mappers/product.ts
import type { Scooter, Product } from "@/types/product";

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