// src/components/home/ScootersSection.tsx
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/cards/ProductCard";
import PaginatedGridSection from "@/components/PaginatedGridSection";
import SectionMessage from "@/components/SectionMessage";
import { toScooterCardProduct } from "@/lib/mappers/product";
import type { ScooterCardProduct } from "@/types/product";
import { fetchList } from "@/lib/fetchList";


export default async function ScootersSection() {
  const t = await getTranslations("HomePage");

  let scooters;
  try {
    const list = await fetchList<ScooterCardProduct>("scooters");
    scooters = list.map(toScooterCardProduct);
  } catch {
    return <SectionMessage title={t("scooters")} message={t("loadError")} />;
  }

  if (scooters.length === 0) {
    return <SectionMessage title={t("scooters")} message={t("empty")} />;
  }

  return (
    <PaginatedGridSection
      title={t("scooters")}
      href="/scooters"
      items={scooters.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    />
  );
}