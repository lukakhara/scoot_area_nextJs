'use client'
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { type Product } from "@/types/product";
import PaginatedGridSection from "@/components/PaginatedGridSection";
import Image from "next/image";

interface CarouselSectionHeaderProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  currentPage?: number;
  totalPages?: number;
}

const SCOOTERS: Product[] = Array.from({ length: 15 }, (_, i) => ({
  id: `scoteer${i}`,
  productType: "scooter",
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  oldPrice: "990.00₾",
  discount: "10% ფასდაკლება",
  year: "2025",
  installment: "თვეში 55 ლარიდან",
  specs: ["ინდი - 125 კმ/სთ", "სიმძლავრე 350W", "წონა 15 კგ", "გარბენი 65 კმ"],
  imagePath: {
    mobile: "/scooterMobile.png",
    desktop: "/scooterDesktop.png",
  },
}));

const ACCESSORIES: Product[] = Array.from({ length: 15 }, (_, i) => ({
  id: `accessory${i}`,
  productType: "accessory",
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  oldPrice: "900.00₾",
  discount: "10% ფასდაკლება",
  imagePath: {
    mobile: "/helmetMobile.png",
    desktop: "/helmetDesktop.png",
  },
}));

export function CarouselSectionHeader({
  title,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: CarouselSectionHeaderProps) {
  return (
    <div className=" flex items-center justify-between gap-4">
      <h2 className="text-[24px] font-bold tracking-wide uppercase sm:text-[40px]">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="text-[12px] md:text-[16px] text-[#888888] hover:text-primary"
        >
          ყველას ნახვა
        </a>
        <div className="flex gap-1.5 border-[#888888]">
          <button
            aria-label="წინა"
            onClick={onPrev}
            disabled={!canGoPrev}
            className="rounded-full border p-1.5 hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="size-3.5  sm:size-5" />
          </button>
          <button
            aria-label="შემდეგი"
            onClick={onNext}
            disabled={!canGoNext}
            className="rounded-full border p-1.5 hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="size-3.5 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background  ">
      {/* Hero */}
      <section className="grid *:col-start-1 *:row-start-1 justify-between ">
        <picture>
          <source media="(min-width: 768px)" srcSet='/langindPageBgDesktop.png' />
          <Image
            src='/langindPageBgMobile.png'
            className=" w-full object-cover xl:h-[1024px] "
            alt="item image"
            width={1440}
            height={1024}
          />
        </picture>

        <div className="flex flex-col justify-end bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent pl-4 pr-5.5 pb-10 md:px-18">
          <div
            className="mx-auto flex max-w-[1400px] h-full  justify-end flex-col gap-4 text-primary-foreground
          "
          >
            <div className="flex flex-wrap flex-col  sm:gap-6">
              <h1
                className="max-w-2xl font-bold tracking-tight uppercase  text-[27px] lg:text-[58px]  xl:text-[64px]
    md:max-w-[1029px]  "
              >
                ეკო-მეგობრული ელექტრო სკუტერები ScootArea-სგან
              </h1>
              <div className="flex items-end justify-between">
                <h1 className="flex-1 min-w-[200px] text-[16px] lg:text-[33px] xl:text-[36px] ">
                  აღმოაჩინე თანამედროვე ელექტრო
                  <br className="block md:hidden" /> სკუტერები ყოველდღიური
                  <br className="block md:hidden" /> გადაადგილებისთვის
                </h1>
                <div className="gap-2 flex shrink-0">
                  <button
                    aria-label="წინა"
                    className="rounded-full border md:border-[1.28px] border-white size-4 sm:size-9 flex items-center justify-center"
                  >
                    <ChevronLeft className="size-2 sm:size-6" />
                  </button>
                  <button
                    aria-label="შემდეგი"
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

      {/* Promo banner */}
      <section className="w-full  pt-[60px] md:pt-[99px] pr-[15px] pl-4 md:px-[72px] test">
        <div className="relative overflow-hidden rounded-2xl">
          <picture>
            <source media="(min-width: 768px)" srcSet="/landingPageBannerDesktop.png" />
            <Image
              src="/landingPageBannerMobile.png"
              className="h-[128] w-full object-cover md:h-[304px] "
              alt="item image"
              width={1296}
              height={304}
            />
          </picture>

          <div className="absolute inset-0 flex items-end pl-[15px] pb-[8px] md:pl-[30px] md:pb-[19px]">
            <div className="w-full text-[20px] md:text-[36px] leading-[110%] md:leading-[100%] font-medium text-primary-foreground sm:text-2xl">
              -10% ახალი თიბისი
              <br />
              ბარათით გადახდისას
            </div>
          </div>
        </div>
      </section>

      {/* Scooters */}
      <PaginatedGridSection
        title="სკუტერები"
        items={SCOOTERS}
        itemKey={(item) => item.id}
        renderItem={(item) => <ProductCard item={item} />}
      />

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
          className="md:bg-[#F5F5F5] pr-3.75  pl-4 pb-0 pt-3  md:px-18 md:py-12 flex items-center justify-center  relative z-100 "
          style={{ zIndex: 1 }}
        >
          {/* <div className="px-18 py-12 flex items-center justify-center relative z-100 flex-col gap-8 md:gap-16 max-w-[1400px] w-full"> */}
          {/* HEADING WRAPPER */}
          <div className=" flex items-center justify-center relative z-100 flex-col  max-w-[1400px] w-full gap-8">
            <h2 className=" text-xl font-bold tracking-wide uppercase sm:text-2xl md:text-[40px] w-full">
              შეკეთება
            </h2>

            {/* PARENT — now correctly holds BOTH image and text as flex children */}
            <div className="flex flex-col items-stretch gap-8.75  md:flex-row w-full justify-center ">
              {/* Image + ICON */}
              <div className="relative w-full xl:max-w-[853px] flex-shrink-0 self-stretch min-h-0">
                <picture className="block w-full h-full">
                  <source media="(min-width: 768px)" srcSet="/repairDes.png" />
                  <Image
                    src="/repairMob.png"
                    className="w-full h-full object-cover rounded-[20px]"
                    alt="service image"
                    width={853}
                    height={411}
                  />
                </picture>
                {/* ICON WITH NUMBER */}
                <div className="absolute left-1 bottom-1 flex items-center gap-3 whitespace-nowrap">
                  <div className="size-7.5 bg-[#2C3E50] flex flex-shrink-0 rounded-full items-center justify-center">
                    <Phone className="size-3.5 text-white rounded-full" />
                  </div>
                  <div className="text-[18px] text-[#212121]">+995 55 55 55</div>
                </div>
              </div>

              {/* TEXT */}
              <div className="flex flex-col justify-between gap-4 text-[#212121]">
                <h3 className="leading-[120%] font-bold lg:text-[40px] text-[16px]">
                  სერვისი,
                  <br className="hidden xl:block" /> რომელსაც{" "}
                  <br className="hidden xl:block" />
                  შეგიძლია ენდო
                </h3>
                <div className="flex flex-col gap-[21px]">
                  <p className="md:text-[22px] font-medium leading-[120%] text-[14px]">
                    SCOOTAREA გთავაზობს
                    <br className="hidden xl:block" /> სკუტერების სწრაფ და
                    <br className="hidden xl:block" /> პროფესიონალურ შეკეთებას.
                  </p>
                  <p className="md:text-[18px] text-[14px]">
                    სერტიფიცირებული სპეციალისტები, სწრაფი{" "}
                    <br className="hidden xl:block" />
                    მომსახურება და მაღალი ხარისხის ნაწილები{" "}
                    <br className="hidden xl:block" />— ყველაფერი იმისთვის, რომ
                    ისევ მშვიდად <br className="hidden xl:block" />
                    განაგრძო გზის გაგრძელება.
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

      {/* Accessories */}
      <PaginatedGridSection
        title="აქსესუარები"
        items={ACCESSORIES}
        itemKey={(item) => item.id}
        renderItem={(item) => <ProductCard item={item} />}
      />

      {/* Blog */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-5 pb-16">
        <h2 className="mb-6 text-xl font-bold tracking-wide uppercase sm:text-2xl text-[#212121] md:text-[40px]">
          ბლოგი
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <article
              key={i}
              className="overflow-hidden rounded-xl    p-7 bg-[#F5F5F5]"
            >
              <div className="relative ">
                <picture className=" block w-full h-full">
                  <source media="(min-width: 768px)" srcSet="/blogDesktop.png" />
                  <Image
                    src="/blogMobile.png"
                    className=" w-full h-auto object-cover rounded-[20px] border-black border"
                    alt="product image"
                    width={583.5}
                    height={411}
                  />
                </picture>
                <div className="absolute left-6 bottom-3 flex items-center gap-3 whitespace-nowrap">
                  30/05/2025
                </div>
              </div>

              {/* <Placeholder className="aspect-[16/9] w-full" label="blog" /> */}

              <div className="px- md:py-3 p-5 ">
                <span className="text-xs text-muted-foreground">
                  30/05/2025
                </span>
                <h3 className="text-base font-bold uppercase">
                  ელექტრო სკუტერები — მოგზაურობა ყოველდღიურად
                </h3>
                <p className="text-sm text-muted-foreground">
                  ელექტრო სკუტერები აღარ არის მხოლოდ ტრენდი — ისინი თანამედროვე
                  ქალაქის ყოველდღიური გადაადგილების ნაწილია. ისწავლე როგორ
                  მოუაროთ სკუტერს და გაზარდოთ მისი რესურსი.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
