import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
import type { Accessory, ProductUnits } from "@/types/product";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

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

const page = () => {
  return (
    <ProductDetailPage
      pageType="accessory"
      productDetailData={accessoryDetail}
      similar={similar}
      units={units}
    />
  );
};
}

