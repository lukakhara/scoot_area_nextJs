// src/components/home/AccessoriesSection.tsx
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/cards/ProductCard";
import PaginatedGridSection from "@/components/PaginatedGridSection";
import SectionMessage from "@/components/SectionMessage";
import { toAccessoryCardProduct } from "@/lib/mappers/product";
import type { BaseCardFields } from "@/types/product";
import { fetchList } from "@/lib/fetchList";

export default async function AccessoriesSection() {
  const t = await getTranslations("HomePage");

  let accessories;
  try {
    const list = await fetchList<BaseCardFields>("accessories");
    accessories = list.map(toAccessoryCardProduct);
  } catch {
    return <SectionMessage title={t("accessories")} message={t("loadError")} />;
  }

  if (accessories.length === 0) {
    return <SectionMessage title={t("accessories")} message={t("empty")} />;
  }

  return (
    <PaginatedGridSection
      title={t("accessories")}
      href="/equiment-accessories"
      items={accessories.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    />
  );
}