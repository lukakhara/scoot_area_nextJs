import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
import type { SparePartApi } from "@/types/product";
import { notFound } from "next/navigation";
import { toSparePartCardProduct } from "@/lib/mappers/product";

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function PartsDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${API}/api/parts/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to fetch part ${id}: ${res.status}`);

  const json = await res.json();
  const part: SparePartApi | undefined = json.data ?? json;
  if (!part) notFound();

  const similarRes = await fetch(`${API}/api/parts?limit=4`, {
    next: { revalidate: 60 },
  });
  const rawSimilar: SparePartApi[] = similarRes.ok
    ? ((await similarRes.json()).data ?? [])
    : [];

  const similar = rawSimilar
    .filter((p) => p.id !== id)
    .slice(0, 3)
    .map(toSparePartCardProduct);

  return (
    <ProductDetailPage
      pageType="parts"
      product={toSparePartCardProduct(part)}
      similar={similar}
    />
  );
}