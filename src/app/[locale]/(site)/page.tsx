import { Phone } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import PaginatedGridSection from "@/components/PaginatedGridSection";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import type {
  ScooterCardProduct,
  BlogCardProduct,
  BaseCardFields,
  ScooterProduct,
  AccessoryProduct,
} from "@/types/product";
import { getTranslations } from "next-intl/server";
import BlogCard from "@/components/cards/BlogCard";
import {
  toAccessoryCardProduct,
  toBlogCardProduct,
  toScooterCardProduct,
} from "@/lib/mappers/product";
import SectionMessage from "@/components/SectionMessage";

async function fetchList<T>(path: string, locale?: string): Promise<T[]> {
  const query = locale ? `?locale=${locale}` : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${path}${query}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : json.data;
}

async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("HomePage");
  const { locale } = await params;

  const [scootersRes, accessoriesRes, blogRes] = await Promise.allSettled([
    fetchList<ScooterCardProduct>("scooters"),
    fetchList<BaseCardFields>("accessories"),
    fetchList<BlogCardProduct>("blog", locale),
  ]);
  console.log("scootersRes", scootersRes);
  console.log("accessoriesRes", accessoriesRes);
  console.log("blogRes", blogRes);

  const scooters: ScooterProduct[] =
    scootersRes.status === "fulfilled"
      ? scootersRes.value.map(toScooterCardProduct)
      : [];
  const accessories: AccessoryProduct[] =
    accessoriesRes.status === "fulfilled"
      ? accessoriesRes.value.map(toAccessoryCardProduct)
      : [];
  const blogPosts: BlogCardProduct[] =
    blogRes.status === "fulfilled" ? blogRes.value.map(toBlogCardProduct) : [];

  const br = () => <br className="hidden xl:block" />;

  return (
    <div className=" min-w-screen bg-background">
      <HeroSection />

      {/* Promo banner */}
      <section className="w-full  pt-[60px] md:pt-[99px] pr-[15px] pl-4 md:px-[72px] ">
        <div className="relative overflow-hidden rounded-2xl">
          {/* <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/landingPageBannerDesktop.png"
            />
            <Image
              src="/landingPageBannerMobile.png"
              className="h-[128] w-full object-cover md:h-[304px] "
              alt="item image"
              width={1296}
              height={304}
            />
          </picture> */}
          <Image
            src="/landingPageBannerDesktop.png"
            className=" w-full object-cover  "
            alt="item image"
            width={1296}
            height={304}
          ></Image>

          <div className="absolute inset-0 flex items-end pl-[15px] pb-[8px] md:pl-[30px] md:pb-[19px]">
            <div className="w-full text-[20px] md:text-[36px] leading-[110%] md:leading-[100%] font-medium text-primary-foreground sm:text-2xl">
              {t("newTBC")}
              <br />
              {t("buyingWithCard")}
            </div>
          </div>
        </div>
      </section>

      {/* Scooters */}
      {/* <PaginatedGridSection
        title={t("scooters")}
        href="/scooters"
        items={scooters.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      /> */}

      {/* Scooters */}
      {scootersRes.status === "rejected" ? (
        <SectionMessage title={t("scooters")} message={t("loadError")} />
      ) : scooters.length === 0 ? (
        <SectionMessage title={t("scooters")} message={t("empty")} />
      ) : (
        <PaginatedGridSection
          title={t("scooters")}
          href="/scooters"
          items={scooters.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        />
      )}

      {/* Service */}
      <div className="relative border-none sm:border-2 sm:border-b-[#EA6200]">
        {/* CIRCLE */}
        <div
          className="size-[86px] md:size-[203px] rounded-full border-[#EA6200] md:border-[30px] absolute  md:-top-43 md:-left-5 z-2
          -top-35 -left-10  border-[12.71px]"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        ></div>
        <section
          className="md:bg-[#F5F5F5] pr-3.75  pl-4 pb-0 pt-3  md:px-18 md:py-12 flex items-center justify-center  relative z-100  "
          style={{ zIndex: 1 }}
        >
          {/* <div className="px-18 py-12 flex items-center justify-center relative z-100 flex-col gap-8 md:gap-16 max-w-[1400px] w-full"> */}
          {/* HEADING WRAPPER */}
          <div className=" flex items-center justify-center relative z-100 flex-col   w-full gap-8  ">
            <h2 className=" text-xl font-bold tracking-wide uppercase sm:text-2xl md:text-[40px] w-full">
              {t("repair")}
            </h2>

            {/* PARENT — now correctly holds BOTH image and text as flex children */}
            <div className="flex w-full flex-col items-stretch justify-center gap-8.75 lg:flex-row">
              {/* Image + ICON */}
              <div className="relative w-full min-w-0 self-stretch  md:flex-2 ">
                <Image
                  src="/langindPageServiceDesktop.png"
                  className="h-full w-full rounded-[20px] object-cover"
                  alt="service image"
                  width={853}
                  height={411}
                />
                {/* ICON WITH NUMBER */}
                <span className="flex items-center gap-3 absolute bottom-0 left-0 rounded-tr-3xl bg-secondary py-2 pr-6 text-xl font-medium text-foreground/80">
                  <div className="size-7.5 bg-[#2C3E50] flex flex-shrink-0 rounded-full items-center justify-center">
                    <Phone className="size-3.5 text-white rounded-full rotate-270" />
                  </div>
                  <div className="text-[14px] md:text-[16px] text-[#212121]">
                    +995 55 55 55
                  </div>
                </span>
              </div>

              {/* TEXT */}
              <div className="flex min-w-0 flex-col justify-between gap-4 text-[#212121] md:flex-1">
                <h3 className="leading-[120%] font-bold lg:text-[40px] md:text-[30px] text-[16px]">
                  <p>{t.rich("Service.title", { br })}</p>
                </h3>
                <div className="flex flex-col gap-[21px]">
                  <p className="md:text-[22px] font-medium leading-[120%] text-[14px]">
                    {t.rich("Service.subtitle", { br })}
                  </p>
                  <p className="md:text-[18px] text-[14px]">
                    {t.rich("Service.description", { br })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CIRCLE */}
          <div
            className="size-[86px] md:size-[263px] rounded-full border-[#EA6200] md:border-[30px] absolute md:top-4 md:-right-17.5 overflow-hidden top-4 -right-17.5 border-[16.55px]"
            aria-hidden="true"
          ></div>
          {/* </div> */}
        </section>
      </div>

      <PaginatedGridSection
        title={t("accessories")}
        href="/equiment-accessories"
        items={accessories.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      />
      {/* Blog */}

      <PaginatedGridSection
        title={t("Blog")}
        href="/blog"
        items={blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
        visibleCount={2}
      />
    </div>
  );
}

export default Home;
