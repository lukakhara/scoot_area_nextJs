// components/HeroSection.tsx  (no "use client")
import { getImageProps } from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroControls } from "./HeroControls";

const heroImages = [
  {
    mobile: "/langindPageBgMobile.svg",
    desktop: "/langindPageBgDesktop.svg",
  },
  {
    mobile: "/landingPage.png",
    desktop: "/landingPage.png",
  },
];

export async function HeroSection() {
  const t = await getTranslations("HomePage.HeroSection");

  return (
    <section className="grid *:col-start-1 *:row-start-1">
      {heroImages.map((image, index) => {
        const isFirst = index === 0;

        return (
          <picture
            key={index}
            data-hero-slide
            data-active={isFirst}
            className="col-start-1 row-start-1 z-0 opacity-0 pointer-events-none transition-opacity duration-500 data-[active=true]:z-10 data-[active=true]:opacity-100 data-[active=true]:pointer-events-auto"
          >
            <source media="(min-width: 768px)" srcSet={image.desktop} />
            <img
              src={image.mobile}
              alt=""
              width={768}
              height={1024}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "low"}
              decoding="async"
              className="w-full h-auto object-cover xl:h-[1024px] aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] 2xl:aspect-[16/9]"
            />
          </picture>
        );
      })}


      <div className="z-20 flex w-full flex-col justify-end bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent pl-4 pr-5.5 pb-10 md:px-18">
        <div className="flex h-full w-full flex-col items-center justify-end gap-4 text-primary-foreground xl:max-w-[1400px] 2xl:max-w-full">
          <div className="flex w-full flex-col flex-wrap justify-between sm:gap-6">
            <h1 className="max-w-2xl text-[27px] font-bold uppercase tracking-tight md:max-w-[1029px] lg:text-[58px] xl:text-[64px]">
              {t("title")}
            </h1>
            <div className="flex items-end justify-between">
              <p className="min-w-[200px] flex-1 text-[16px] lg:text-[33px] xl:text-[36px]">
                {t.rich("subtitle", {
                  br: () => <br className="block md:hidden" />,
                })}
              </p>
              <HeroControls count={heroImages.length} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
