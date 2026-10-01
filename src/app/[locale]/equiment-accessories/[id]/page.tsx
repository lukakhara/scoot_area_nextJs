import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
<<<<<<< HEAD
import type { Accessory, ProductUnits } from "@/types/product";
import { toAccessoryCardProduct } from "@/lib/mappers/product";
import { notFound } from "next/navigation";

export default async function AccessoryDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accessories/${id}`, {
    next: { revalidate: 60 },
  });
  console.log('res',res);
  console.log('id',id);
if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch accessory ${id}: ${res.status}`);
  }

  const { data: accessoryDetail } = (await res.json()) as { data: Accessory };

  // Similar accessories — simple approach: fetch a small page, exclude current id
  const similarRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accessories?limit=4`,
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

=======
import React from "react";
>>>>>>> parent of 2f56eca (modifyied accessories detail page(need more work) modified also popoveer cart component)

const page = () => {
  return (
<<<<<<< HEAD
    <ProductDetailPage
      pageType="accessory"
      productDetailData={accessoryDetail}
      similar={similar}
      units={units}
    />
=======
    <div>
      <ProductDetailPage pageType="accessory" />
    </div>
>>>>>>> parent of 2f56eca (modifyied accessories detail page(need more work) modified also popoveer cart component)
  );
};

export default page;
