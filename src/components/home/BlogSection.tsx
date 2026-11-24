// src/components/home/BlogSection.tsx
import { getLocale, getTranslations } from "next-intl/server";
import BlogCard from "@/components/cards/BlogCard";
import PaginatedGridSection from "@/components/PaginatedGridSection";
import SectionMessage from "@/components/SectionMessage";
import { toBlogCardProduct } from "@/lib/mappers/product";
import type { BlogCardProduct } from "@/types/product";
import { fetchList } from "@/lib/fetchList";

export default async function BlogSection() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  let posts;
  try {
    const list = await fetchList<BlogCardProduct>("blog", locale);
    posts = list.map(toBlogCardProduct);
  } catch {
    return <SectionMessage title={t("Blog")} message={t("loadError")} />;
  }

  if (posts.length === 0) {
    return <SectionMessage title={t("Blog")} message={t("empty")} />;
  }

  return (
    <PaginatedGridSection
      title={t("Blog")}
      href="/blog"
      items={posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
      visibleCount={2}
    />
  );
}