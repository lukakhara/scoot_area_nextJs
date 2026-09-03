"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    mobile: "/langindPageBgMobile.png",
    desktop: "/langindPageBgDesktop.png",
  },
  {
    mobile: "/landingPage.png",
    desktop: "/landingPage.png",
  },
  {
    mobile: "/landingPage2.png",
    desktop: "/landingPage2.png",
  },
  {
    mobile: "/landingPage3.png",
    desktop: "/landingPage3.png",
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="grid *:col-start-1 *:row-start-1 justify-between">
      {heroImages.map((image, index) => (
        <picture
          key={index}
          className={`col-start-1 row-start-1 transition-opacity duration-500 ${
            index === activeIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <source media="(min-width: 768px)" srcSet={image.desktop} />
          <Image
            src={image.mobile}
            className="w-full object-cover xl:h-[1024px]"
            alt="item image"
            width={1440}
            height={1024}
            priority={index === 0}
          />
        </picture>
      ))}

      <div className="flex flex-col justify-end bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent pl-4 pr-5.5 pb-10 md:px-18 z-20">
        <div className="mx-auto flex max-w-[1400px] h-full justify-end flex-col gap-4 text-primary-foreground">
          <div className="flex flex-wrap flex-col sm:gap-6">
            <h1
              className="max-w-2xl font-bold tracking-tight uppercase text-[27px] lg:text-[58px] xl:text-[64px]
    md:max-w-[1029px]"
            >
              ეკო-მეგობრული ელექტრო სკუტერები ScootArea-სგან
            </h1>
            <div className="flex items-end justify-between">
              <h1 className="flex-1 min-w-[200px] text-[16px] lg:text-[33px] xl:text-[36px]">
                აღმოაჩინე თანამედროვე ელექტრო
                <br className="block md:hidden" /> სკუტერები ყოველდღიური
                <br className="block md:hidden" /> გადაადგილებისთვის
              </h1>
              <div className="gap-2 flex shrink-0">
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