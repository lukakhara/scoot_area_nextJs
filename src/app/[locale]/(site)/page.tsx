// src/app/[locale]/page.tsx
import { Suspense } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import SectionSkeleton from "@/components/SectionSkeleton";
import ScootersSection from "@/components/home/ScootersSection";
import AccessoriesSection from "@/components/home/AccessoriesSection";
import BlogSection from "@/components/home/BlogSection";

export default async function Home() {
  const t = await getTranslations("HomePage");

  const br = () => <br className="hidden xl:block" />;

  return (
    <div className="min-w-screen bg-background">
      <HeroSection />

      {/* Promo banner */}
      <section className="w-full pt-[60px] md:pt-[99px] pr-[15px] pl-4 md:px-[72px]">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/landingPageBannerDesktop.png"
            className="w-full object-cover"
            alt="item image"
            width={1296}
            height={304}
            priority
           
          />

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
      <Suspense fallback={<SectionSkeleton />}>
        <ScootersSection />
      </Suspense>

      {/* Service */}
      <div className="relative border-none sm:border-2 sm:border-b-[#EA6200]">
        <div
          className="size-[86px] md:size-[203px] rounded-full border-[#EA6200] md:border-[30px] absolute md:-top-43 md:-left-5 -top-35 -left-10 border-[12.71px]"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />
        <section
          className="md:bg-[#F5F5F5] pr-3.75 pl-4 pb-0 pt-3 md:px-18 md:py-12 flex items-center justify-center relative"
          style={{ zIndex: 1 }}
        >
          <div className="flex items-center justify-center relative flex-col w-full gap-8">
            <h2 className="text-xl font-bold tracking-wide uppercase sm:text-2xl md:text-[40px] w-full">
              {t("repair")}
            </h2>

            <div className="flex w-full flex-col items-stretch justify-center gap-8.75 lg:flex-row">
              <div className="relative w-full min-w-0 self-stretch md:flex-2">
                <Image
                  src="/langindPageServiceDesktop.png"
                  className="h-full w-full rounded-[20px] object-cover"
                  alt="service image"
                  width={853}
                  height={411}
                />
                <span className="flex items-center gap-3 absolute bottom-0 left-0 rounded-tr-3xl bg-secondary py-2 pr-6 text-xl font-medium text-foreground/80">
                  <div className="size-7.5 bg-[#2C3E50] flex flex-shrink-0 rounded-full items-center justify-center">
                    <Phone className="size-3.5 text-white rounded-full rotate-270" />
                  </div>
                  <div className="text-[14px] md:text-[16px] text-[#212121]">
                    +995 55 55 55
                  </div>
                </span>
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-4 text-[#212121] md:flex-1">
                <h3 className="leading-[120%] font-bold lg:text-[40px] md:text-[30px] text-[16px]">
                  {t.rich("Service.title", { br })}
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

          <div
            className="size-[86px] md:size-[263px] rounded-full border-[#EA6200] md:border-[30px] absolute md:top-4 md:-right-17.5 overflow-hidden top-4 -right-17.5 border-[16.55px]"
            aria-hidden="true"
          />
        </section>
      </div>

      {/* Accessories */}
      <Suspense fallback={<SectionSkeleton />}>
        <AccessoriesSection />
      </Suspense>

      {/* Blog */}
      <Suspense fallback={<SectionSkeleton />}>
        <BlogSection />
      </Suspense>
    </div>
  );
}