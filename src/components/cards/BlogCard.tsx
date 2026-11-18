import { BlogCardProduct } from "@/types/product";
import Image from "next/image";
import ProductCardImage from "../ui/ProductCardImage";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Placeholder } from "../ui/Placeholder";

const BlogCard = ({ post }: { post: BlogCardProduct }) => {
  return (
    <article
      key={post.id}
      className="rounded-3xl bg-secondary flex flex-col  py-6 px-6.25"
    >
      <div className="relative ">
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="uppercase transition-opacity hover:opacity-70"
        >
          <article className="flex flex-col rounded-3xl bg-secondary  ">
            <div className="relative">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1024}
                  height={1024}
                  className="aspect-[16/9] w-full rounded-3xl object-cover"
                />
              ) : (
                <Placeholder className="aspect-[16/9] w-full rounded-3xl object-cover"></Placeholder>
              )}

              {post.publishedAt && (
                <span className="absolute bottom-0 left-0 rounded-tr-3xl bg-secondary py-2 pr-6 text-xl font-medium text-foreground/80">
                  {formatDate(post.publishedAt)}

                  {/* curve above the tab, on the image's left edge */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-full left-0 size-6"
                    style={{
                      background:
                        "radial-gradient(circle at 100% 0, transparent 24px, var(--secondary) 24.5px)",
                    }}
                  />

                  {/* curve right of the tab, on the image's bottom edge */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-full size-6"
                    style={{
                      background:
                        "radial-gradient(circle at 100% 0, transparent 24px, var(--secondary) 24.5px)",
                    }}
                  />
                </span>
              )}
            </div>
          </article>
        </Link>
      </div>
      <Link
        href={`/blog/${post.id}`}
        className="transition-colors hover:text-primary"
      >
        <h2 className="mt-5 text-lg font-extrabold tracking-tight  sm:text-xl capitalize span-1">
          {post.title}
        </h2>
      </Link>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base capitalize">
        {post.excerpt}
      </p>
    </article>
  );
};

export default BlogCard;
