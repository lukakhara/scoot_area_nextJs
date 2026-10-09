import CompareClient from "@/components/CompareClient";
import { Scooter } from "@/types/product";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ others?: string }>;
}) {
  const { id } = await params;
  const { others } = await searchParams;

  const initialSelectedIds =
    others
      ?.split(",")
      .filter((x) => x && x !== id)
      .slice(0, 3) ?? []; // 4 columns max, the main scooter takes 1

  const [res, listRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters/${id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters/?limit=100`),
  ]);

  if (!res.ok || !listRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data: scooter } = await res.json();
  const { data: allScooters } = await listRes.json();

  return <CompareClient scooter={scooter} allScooters={allScooters} />;
}
  