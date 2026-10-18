import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
import type { Accessory, ProductUnits } from "@/types/product";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { toAccessoryCardProduct } from "@/lib/mappers/product";

export default async function PartsDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parts/${id}`, {
    next: { revalidate: 60 },
  });
  
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch part ${id}: ${res.status}`);
  }

  const {data:partsData} = await res.json();
  

  // Similar parts — simple approach: fetch a small page, exclude current id
  const similarRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/parts?limit=4`,
    { next: { revalidate: 60 } },
  );
  const { data: rawSimilar } = similarRes.ok
    ? ((await similarRes.json()) as { data: Accessory[] })
    : { data: [] };

  const similar = rawSimilar
    .filter((a) => a.id !== id)
    .slice(0, 3)
    .map(toAccessoryCardProduct);

  const unitsT = await getTranslations("ProductListingPage.units");


  return (
    <ProductDetailPage
      pageType="parts"
      product={partsData}
      similar={similar}
    />
  );
}

