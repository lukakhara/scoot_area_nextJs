import type { ProductKind, ProductRow } from "@/components/admin/productFields";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// adjust paths to match your backend routes
const endpoints: Record<ProductKind, string> = {
  scooter: "scooters",
  accessory: "accessories",
  part: "parts",
};

interface ApiProduct {
  id: string | number;
  name: string;
  brand?: string | null;
  category: string;
  price: number | string;
  discountPrice?: number | string | null;
  stock: number;
  sku?: string | null;
  images?: string[];
}

interface ListResponse {
  data: ApiProduct[];
  meta: { total: number };
}

function toProductRow(item: ApiProduct): ProductRow {
  const values: Record<string, string> = {};
  if (item.sku) values["sku"] = item.sku;
  if (item.discountPrice != null) {
    values["discountPrice"] = String(item.discountPrice);
  }

  return {
    id: String(item.id),
    name: item.name,
    brand: item.brand ?? "",
    category: item.category,
    price: String(item.price),
    stock: String(item.stock),
    image: item.images?.[0] ?? null,
    values,
  } as ProductRow; // align with the real ProductRow shape
}

async function request(
  kind: ProductKind,
  params: URLSearchParams,
  signal?: AbortSignal,
): Promise<ListResponse> {
  const res = await fetch(`${API_URL}/api/${endpoints[kind]}?${params}`, {
    credentials: "include",
    signal,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchProducts(
  kind: ProductKind,
  search: string,
  signal?: AbortSignal,
): Promise<ProductRow[]> {
  const params = new URLSearchParams({ limit: "100" });
  if (search) params.set("search", search);
  const json = await request(kind, params, signal);
  return json.data.map(toProductRow);
}

export async function fetchProductCount(
  kind: ProductKind,
  signal?: AbortSignal,
): Promise<number> {
  const json = await request(kind, new URLSearchParams({ limit: "5" }), signal);
  return json.meta.total;
}