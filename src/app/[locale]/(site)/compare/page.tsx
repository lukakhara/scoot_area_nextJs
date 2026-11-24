import { getTranslations } from "next-intl/server";
import { ScooterCompare } from "@/types/product";
import CompareSelector from "@/components/CompareSelector";
import { API_URL } from "@/lib/config";

type ScootersResponse = {
  data: ScooterCompare[];
};

export default async function page() {
  const [res, t] = await Promise.all([
    fetch(`${API_URL}/scooters/?limit=100`),
    getTranslations("ComparePage"),
  ]);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data: scooters }: ScootersResponse = await res.json();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
        <h1 className="text-2xl font-extrabold tracking-tight capitalize sm:text-3xl">
          {t("title")}
        </h1>

        <CompareSelector scooters={scooters} />
      </main>
    </div>
  );
}