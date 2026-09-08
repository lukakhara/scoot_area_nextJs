"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const heroImages = [
  {
    mobile: "/langindPageBgMobile.png",
    desktop: "/langindPageBgDesktop.png",
  },
  {
    mobile: "/landingPage.png",
    desktop: "/landingPage.png",
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("HomePage.HeroSection");

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className=" grid *:col-start-1 *:row-start-1 ">
      {heroImages.map((image, index) => (
        <picture
          key={index}
          className={`col-start-1 row-start-1 transition-opacity duration-500  ${
            index === activeIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <source media="(min-width: 768px)" srcSet={image.desktop} />
          <Image
            src={image.mobile}
            className="w-full h-auto object-cover xl:h-[1024px] "
            alt="item image"
            width={1440}
            height={1024}
            priority={index === 0}
          />
        </picture>
      ))}

      <div className="w-full flex flex-col justify-end bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent pl-4 pr-5.5 pb-10 md:px-18 z-20  ">
        <div className="items-center w-full flex  xl:max-w-[1400px] 2xl:max-w-full h-full justify-end flex-col gap-4 text-primary-foreground">
          <div className="flex w-full justify-between  flex-wrap flex-col sm:gap-6">
            <h1
              className="max-w-2xl font-bold tracking-tight uppercase text-[27px] lg:text-[58px] xl:text-[64px]
    md:max-w-[1029px]"
            >
              {t("title")}
            </h1>
            <div className="flex items-end justify-between">
              <h1 className="flex-1 min-w-[200px] text-[16px] lg:text-[33px] xl:text-[36px]">
                {t.rich("subtitle", {
                  br: () => <br className="block md:hidden" />,
                })}
              </h1>
              <div className="gap-2 flex  shrink-0">
                <button
                  aria-label="წინა"
                  onClick={goPrev}
                  className="rounded-full border md:border-[1.28px] border-white size-4 sm:size-9 flex items-center justify-center"
                >
                  <ChevronLeft className="size-2 sm:size-6" />
                </button>
                <button
                  aria-label="შემდეგი"
                  onClick={goNext}
                  className="rounded-full border md:border-[1.28px] border-white size-4 sm:size-9 flex items-center justify-center"
                >
                  <ChevronRight className="size-2 sm:size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
