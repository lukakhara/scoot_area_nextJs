import Pagination from "@/components/ui/Pagination";
import { Placeholder } from "@/components/ui/Placeholder";
import ProductCardImage from "@/components/ui/ProductCardImage";
import { formatDate } from "@/lib/formatDate";
import { BlogListResponse } from "@/types/blog";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("");
  const { locale } = await params;

  const queryString = `locale=${locale}`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?${queryString}`,
  );
  console.log("res", res);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${res.status}`);
  }
  const { data: posts, meta }: BlogListResponse = await res.json();

  console.log("posts", posts[0].publishedAt);

  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(
      date.getUTCDate() + 1 ? date.getUTCMonth() + 1 : 1,
    ).padStart(2, "0"); // getUTCMonth() is 0-indexed
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen bg-background px-4 py-10 md:px-16 md:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          ბლოგი
        </h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="uppercase transition-opacity hover:opacity-70"
            >
              <article className="flex flex-col rounded-3xl bg-secondary ">
                <div className="relative">
                  {post.coverImage ?  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={1024}
                    height={1024}
                    className="aspect-[16/9] w-full rounded-3xl object-cover"
                  /> :
                  <Placeholder className="aspect-[16/9] w-full rounded-3xl object-cover"></Placeholder>}
                 
                  {post.publishedAt && (
                    <span className="date-tab absolute bottom-0 left-0 rounded-tr-3xl bg-secondary py-2 pr-6 text-xl font-medium text-foreground/80">
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                </div>
                <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
