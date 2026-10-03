import { Phone } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Scooter, type Product } from "@/types/product";
import PaginatedGridSection from "@/components/PaginatedGridSection";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import type {
  ScooterCardProduct,
  Accessory,
  BlogCardProduct,
  blogProduct,
  BaseCardFields
} from "@/types/product";
import { getTranslations } from "next-intl/server";
import BlogCard from "@/components/cards/BlogCard";

type HomePageProductSections = "scooters" | "accessories" | "blog";

const toScooterCard = ({
  id,
  name,
  price,
  images,
  discountPrice,
  discountEndsAt,
  releaseDate,
  engine,
  maxSpeed,
  maxRange,
  weight,
  warranty,
}: ScooterCardProduct) => ({
  productType: "scooter" as const,
  id,
  name,
  images,
  price,
  discountPrice,
  discountEndsAt,
  releaseDate,
  engine,
  maxSpeed,
  maxRange,
  weight,
  warranty,
});


const toAccessoryCard = ({
  id,
  name,
  price,
  discountPrice,
  discountEndsAt,
  images,
}: BaseCardFields) => ({
  productType: "accessory" as const,
  id,
  name,
  price,
  discountPrice,
  discountEndsAt,
  images,
});


const toBlogCard = ({
  id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
}: BlogCardProduct) => ({
  productType: "blog" as const,
  id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
});


async function getScooters(): Promise<ScooterCardProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch scooters");

  const json = await res.json();
  const list: Scooter[] = Array.isArray(json) ? json : json.data;

  return list.map(toScooterCard);
}

async function getAccessories(): Promise<BaseCardFields[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accessories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch accessories");
  const json = await res.json();
  const list: BaseCardFields[] = Array.isArray(json) ? json : json.data;
  return list.map(toAccessoryCard);
}


async function getBlogPosts(): Promise<BlogCardProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  const json = await res.json();
  const list: BlogCardProduct[] = Array.isArray(json) ? json : json.data;
  return list.map(toBlogCard);
}

async function Home() {
  const t = await getTranslations("HomePage");
  const [scooters, accessories, blogPosts] = await Promise.all([
    getScooters(),
    getAccessories(),
    getBlogPosts(),
  ]);

  console.log("scooters", scooters);
  console.log("accessories", accessories);
  console.log("blogPosts", blogPosts);

  return (
    <div className=" min-w-screen bg-background">
      <HeroSection />

      {/* Promo banner */}
      <section className="w-full  pt-[60px] md:pt-[99px] pr-[15px] pl-4 md:px-[72px] ">
        <div className="relative overflow-hidden rounded-2xl">
          <picture>
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
        title={t("scooters")}
        href="/scooters"
        items={scooters.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
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
          className="md:bg-[#F5F5F5] pr-3.75  pl-4 pb-0 pt-3  md:px-18 md:py-12 flex items-center justify-center  relative z-100  "
          style={{ zIndex: 1 }}
        >
          {/* <div className="px-18 py-12 flex items-center justify-center relative z-100 flex-col gap-8 md:gap-16 max-w-[1400px] w-full"> */}
          {/* HEADING WRAPPER */}
          <div className=" flex items-center justify-center relative z-100 flex-col  max-w-[1400px] 2xl:max-w-full w-full gap-8  ">
            <h2 className=" text-xl font-bold tracking-wide uppercase sm:text-2xl md:text-[40px] w-full">
              შეკეთება
            </h2>

            {/* PARENT — now correctly holds BOTH image and text as flex children */}
            <div className="flex flex-col items-stretch gap-8.75  md:flex-row w-full justify-center  ">
              {/* Image + ICON */}
              <div className="relative w-full xl:max-w-[853px] 2xl:max-w-full   flex-shrink-0 self-stretch min-h-0 flex-1">
                <picture className="block w-full h-full">
                  <source
                    media="(min-width: 768px)"
                    srcSet="/langindPageServiceDesktop.png"
                  />
                  {/* BUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                  <Image
                    src="/langindPageServiceMobile.png"
                    className="2xl:w-full object-cover h-auto rounded-[20px]"
                    alt="service image"
                    width={853}
                    height={411}
                  />
                </picture>
                {/* ICON WITH NUMBER */}
                <div className="absolute left-1 bottom-1 flex items-center gap-3 whitespace-nowrap">
                  <div className="size-7.5 bg-[#2C3E50] flex flex-shrink-0 rounded-full items-center justify-center">
                    <Phone className="size-3.5 text-white rounded-full rotate-270" />
                  </div>
                  <div className="text-[18px] text-[#212121]">
                    +995 55 55 55
                  </div>
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
      />
    </div>
  );
}

export default Home;
