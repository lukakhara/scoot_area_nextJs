import CompareClient from "@/components/CompareClient";
import { Scooter } from "@/types/product";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [res, listRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters/${id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters/?limit=100`),
  ]);
  const { data: scooter } = await res.json();
  const { data: allScooters } = await listRes.json();
  console.log(allScooters)

  return <CompareClient scooter={scooter} allScooters={allScooters} />;
}
