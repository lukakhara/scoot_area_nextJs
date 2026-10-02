import { BlogCardProduct } from "@/types/product";
import Image from "next/image";
import ProductCardImage from "../ui/ProductCardImage";
import { formatDate, formatDate } from "@/lib/formatDate";

const BlogCard = (post:BlogCardProduct) => {
  return (
    <article
      key={i}
      className="rounded-3xl bg-secondary p-5 sm:p-6 min-h-[679px] flex flex-col "
    >
      <div className="relative  flex-1">
        {post.coverImage ? (
          <ProductCardImage
            src={post.coverImage}
            alt={`${post.title} cover image`}
          />
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/blogDesk.png"
              alt="Blog post cover image"
              fill
              className="hidden object-cover md:block"
              sizes="(min-width: 768px) 584px, 100vw"
            />
            <Image
              src="/blogMob.png"
              alt="Blog post cover image"
              fill
              className="block object-cover md:hidden"
              sizes="(min-width: 768px) 584px, 100vw"
            />
          </div>
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
  );
};

export default BlogCard;
