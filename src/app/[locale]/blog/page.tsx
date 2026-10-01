import Pagination from "@/components/ui/Pagination";
import ProductCardImage from "@/components/ui/ProductCardImage";
import { formatDate } from "@/lib/formatDate";
import { BlogListResponse } from "@/types/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log("locale", locale);
  const queryString = `locale=${locale}`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?${queryString}`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch ${res.status}`);
  }
  const { data: posts, meta }: BlogListResponse = await res.json();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
          ბლოგი
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8 ">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={"/blog/:id"}
              className="uppercase transition-opacity hover:opacity-70"
              // activeProps={{ className: "text-primary" }}
            >
              <article
                key={i}
                className="rounded-3xl bg-secondary p-5 sm:p-6 min-h-[679px] flex flex-col "
              >
                <div className="relative  flex-1">
                  {post.coverImage ? (
                    <ProductCardImage
                      src={post.coverImage}
                      alt={`${post.title} cover image `}
                    />
                  ) : (
                    <picture>
                      <source
                        media="(min-width: 768px)"
                        srcSet="/blogDesk.png"
                      />
                      <Image
                        src="/blogMob.png"
                        className="aspect-[4/3] w-full object-cover"
                        alt="item image"
                        width={584}
                        height={312}
                      />
                    </picture>
                  )}
                  <span className="absolute bottom-0 left-0 rounded-tr-2xl bg-secondary py-2 pr-4 text-lg font-medium text-foreground/80">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-extrabold tracking-tight  sm:text-xl capitalize span-1">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base capitalize">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>

        <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
      </main>
    </div>
  );
}
