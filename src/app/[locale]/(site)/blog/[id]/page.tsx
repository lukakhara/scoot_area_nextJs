import { getTranslations } from "next-intl/server";
import { Placeholder } from "@/components/ui/Placeholder";
import ProductCardImage from "@/components/ui/ProductCardImage";
import { BlogPost } from "@/types/blog";
import { Play } from "lucide-react";
import { notFound } from "next/navigation";
import { parseMarkdownSections } from "@/lib/parseMarkdownSections";

async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [res, t] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`),
    getTranslations("BlogDetailPage"),
  ]);

  if (res.status === 404) {
    notFound();
  }
  console.log("res", res);
  if (!res.ok) {
    throw new Error(`Failed to fetch scooter ${id}: ${res.status}`);
  }

  const blog: BlogPost = await res.json();

  const sections = parseMarkdownSections(blog.content ?? "");

  return (
    <div className="px-4 md:pl-[75px] md:pr-[70px] pt-10 md:pt-20 pb-30 lg:pt-12 gap-8">
      <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl pb-[31px]">
        {t("title")}
      </h1>

      <div className=" flex flex-col gap-20">
        {/* Main image */}
        <div className="rounded-[20px] ">
          {blog.coverImage ? (
            <ProductCardImage
              src={blog.coverImage}
              alt={blog.title}
              className="rounded-[20px] object-cover w-full"
            />
          ) : (
            <Placeholder className="rounded-[20px]" />
          )}
        </div>

        {/* <div className="flex flex-col gap-8">
          <h1 className="text-[40px] font-bold">{blog.title}</h1>
        
          <div>{sections}</div>
        </div> */}

        {sections.map((section, i) => (
          <div
            key={`${section.title}-${i}`}
            className="flex  flex-col gap-4 "
          >
            {section.title && (
              <h1 className="text-[40px] font-bold">{section.title}</h1>
            )}
            {section.content
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, j) => (
                <p
                  key={j}
                  className="text-base leading-relaxed text-neutral-700 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
          </div>
        ))}

        {/* Image grid */}
        <div className="flex gap-8 sm:grid-cols-2 md:grid-cols-3 ">
          {blog.images.map((image) => (
            <ProductCardImage
              src={image}
              alt={t("imageAlt")}
              className="rounded-[20px] object-cover w-full"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div>{t("firstSection.p1")}</div>
          <div>{t("firstSection.p2")}</div>
          <div>{t("firstSection.p3")}</div>
          <div>{t("firstSection.p4")}</div>
          <div>{t("firstSection.p5")}</div>
        </div>
        {/* Video player */}
        <div className="hidden min-h-[640px] w-full items-center justify-center bg-[#9E9E9E] md:flex rounded-[20px]">
          <Play />
        </div>

        {/* Second text section */}
        <div>
          <p>{t("secondSection.intro1")}</p>
          <p>{t("secondSection.intro2")}</p>
          <p>{t("secondSection.intro3")}</p>

          <div className="flex flex-col gap-4">
            <div>{t("secondSection.p1")}</div>
            <div>{t("secondSection.p2")}</div>
            <div>{t("secondSection.p3")}</div>
            <div>{t("secondSection.p4")}</div>
            <div>{t("secondSection.p5")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;