import { API_URL } from "./config";

export async function fetchList<T>(path: string, locale?: string): Promise<T[]> {
  const query = locale ? `?locale=${locale}` : "";
  const res = await fetch(
    `${API_URL}/${path}${query}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : json.data;
}