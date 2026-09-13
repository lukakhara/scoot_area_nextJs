// app/[locale]/scooters/[id]/page.tsx
import { getTranslations } from "next-intl/server";
import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
import type { Scooter, ProductUnits } from "@/types/product";
import { toScooterCardProduct } from "@/lib/mappers/product"; // extracted mapper, see note below
import { notFound } from "next/navigation";

export default async function ScooterDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("params id ------------------------------", id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters/${id}`, {
    next: { revalidate: 60 },
  });
  console.log("params id ------------------------------", id);
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch scooter ${id}: ${res.status}`);
  }

  const { data: scooterDetail } = (await res.json()) as { data: Scooter };

  // Similar scooters — simple approach: fetch a small page, exclude current id
  const similarRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/scooters?limit=4`,
    { next: { revalidate: 60 } },
  );
  const { data: rawSimilar } = similarRes.ok
    ? ((await similarRes.json()) as { data: Scooter[] })
    : { data: [] };

  const similar = rawSimilar
    .filter((s) => s.id !== id)
    .slice(0, 3)
    .map(toScooterCardProduct);

  const unitsT = await getTranslations("ProductListingPage.units");
  const units: ProductUnits = {
    w: unitsT("w"),
    kmH: unitsT("kmH"),
    y: unitsT("y"),
    km: unitsT("km"),
    kg: unitsT("kg"),
  };

  return (
    <ProductDetailPage
      pageType="scooter"
      scooterDetail={scooterDetail}
      similar={similar}
      units={units}
    />
  );
}
