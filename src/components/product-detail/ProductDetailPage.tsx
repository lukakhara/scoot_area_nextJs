// ProductDetailPage.tsx — Server Component
import { getTranslations } from "next-intl/server";
import {
  Battery,
  CalendarDays,
  CircleCheck,
  Gauge,
  Mountain,
  Package,
  Repeat,
  Timer,
  Users,
  Weight,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProductCard } from "@/components/cards/ProductCard";
import { ImageThumbnailGallery } from "@/components/product-detail/ImageThumbnailGallery";
import { type Product, type ProductUnits, type Scooter } from "@/types/product";
import ProductCardImage from "../ui/ProductCardImage";
import { getDiscountInfo } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ProductActions } from "./ProductActions";

type PageType = "scooter" | "accessory" | "parts";

function getScooterSpecs(
  scooter: Scooter,
  units: ProductUnits,
  t: (key: string) => string,
): { Icon: LucideIcon; label: string; value: string }[] {
  return [
    { Icon: Repeat, label: t("specs.engine"), value: scooter.engine },
    {
      Icon: Gauge,
      label: t("specs.maxSpeed"),
      value: `${scooter.maxSpeed} ${units.kmH}`,
    },
    {
      Icon: Zap,
      label: t("specs.maxRange"),
      value: `${scooter.maxRange} ${units.km}`,
    },
    {
      Icon: Weight,
      label: t("specs.weight"),
      value: `${scooter.weight} ${units.kg}`,
    },
    {
      Icon: CalendarDays,
      label: t("specs.releaseDate"),
      value: String(new Date(scooter.releaseDate).getFullYear()),
    },
    { Icon: CircleCheck, label: t("specs.warranty"), value: scooter.warranty },
    {
      Icon: Mountain,
      label: t("specs.inclineAngle"),
      value: scooter.inclineAngle,
    },
    {
      Icon: Timer,
      label: t("specs.chargingTime"),
      value: scooter.chargingTime,
    },
    {
      Icon: Package,
      label: t("specs.maxRiderWeight"),
      value: `${scooter.maxRiderWeight} ${units.kg}`,
    },
    {
      Icon: Users,
      label: t("specs.recommendedRiderWeight"),
      value: `${scooter.recommendedRiderWeight} ${units.kg}`,
    },
    {
      Icon: Battery,
      label: t("specs.motorCount"),
      value: String(scooter.motorCount),
    },
    {
      Icon: CircleCheck,
      label: t("specs.wheelSize"),
      value: scooter.wheelSize,
    },
  ];
}

export default async function ProductDetailPage({
  pageType,
  product,
  similar,
  units,
}: {
  pageType: PageType;
  product: Product;
  similar?: Product[];
  units?: ProductUnits;
}) {
  const t = await getTranslations("ProductDetailPage");
  const isScooter = pageType === "scooter";
  const mainImage = product.images?.[0];
  const { discountPercent } = getDiscountInfo(product);

  const hasDiscount = Boolean(product.discountPrice);
  const currentPrice = hasDiscount ? product.discountPrice : product.price;

  return (
    <div className="min-h-screen bg-background ">
      <main className="flex w-full flex-col justify-center md:px-[70px] px-4  pb-20  pt-10 md:pt-20 md:pb-30   gap-15 md:gap-20  ">
        <div
          className={
            isScooter
              ? "grid gap-8 lg:grid-cols-2"
              : "mt-5 grid gap-8 lg:mt-0 lg:grid-cols-2 lg:gap-14 lg:pt-8"
          }
        >
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`relative col-span-3 overflow-hidden rounded-2xl w-full ${
                isScooter ? "bg-card" : "bg-secondary p-4"
              }`}
            >
              {mainImage ? (
                <div className="relative w-full h-[324px] md:h-[634px] md:w-full shadow-[0_-2px_10px_0_rgba(0,0,0,0.05),2px_5px_5px_0_rgba(0,0,0,0.05)] ">
                  <ProductCardImage
                    src={mainImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover min-w-full "
                  />
                </div>
              ) : (
                <Placeholder
                  className="aspect-[4/3] w-full"
                  label={product.name}
                />
              )}

              {hasDiscount && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">
                  {t("discountBadge", { percent: discountPercent })}
                </span>
              )}
            </div>

            {isScooter && mainImage && (
              <ImageThumbnailGallery imagePath={mainImage} />
            )}
          </div>

          <div>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight uppercase sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3 lg:gap-5">
              <span
                className={cn(
                  "text-2xl font-bold  lg:text-[32px]",
                  hasDiscount && "text-[#EA2700]",
                )}
              >
                {currentPrice}₾
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through lg:text-[32px]">
                  {product.price}₾
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-stretch gap-3 border-b border-b-[#EA6200] pb-6 lg:mt-8 lg:gap-5">
              <ProductActions
                productId={product.id}
                pageType={pageType}
                isScooter={isScooter}
              />
            </div>

            {isScooter && units ? (
              <ul className="mt-8 space-y-3 rounded-2xl bg-[#F5F5F5] p-6 text-sm text-[#212121]">
                {getScooterSpecs(product as Scooter, units, t).map(
                  ({ Icon, label, value }) => (
                    <li
                      key={label}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0 text-foreground/70" />
                        {label}
                      </div>
                      <span className="font-medium text-foreground">
                        {value}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            ) : (
              !isScooter && (
                <div className="mt-8 space-y-4">
                  <p>{t("accessoryInfo.intro")}</p>
                  <div className="space-y-2 ">
                    <div>{t("accessoryInfo.featuresTitle")}</div>
                    <ul className=" list-disc pl-4">
                      <li>{t("accessoryInfo.feature1")}</li>
                      <li>{t("accessoryInfo.feature2")}</li>
                      <li>{t("accessoryInfo.feature3")}</li>
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {isScooter && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold xl:text-[40px]">
              {t("aboutHeading", { name: product.name })}
            </h2>

            <div className="mt-4 flex flex-col gap-6 ">
              {/* {product.description} */}
              <p>{t("aboutParagraphs.p1")}</p>
              <p>{t("aboutParagraphs.p2")}</p>
              <p>{t("aboutParagraphs.p3")}</p>
            </div>
          </div>
        )}

        {isScooter && (
          <div>
            <section className=" grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from([
                "/blogImageDesk2.png",
                "/blogImageDesk3.png",
                "/blogImageDesk4.png",
                "/blogImageDesk3.png",
                "/blogImageDesk4.png",
                "/blogImageDesk2.png",
              ]).map((image, i) => (
                <Image
                  src={image}
                  key={i}
                  alt={t("galleryImageAlt")}
                  width={411}
                  height={411}
                  className="aspect-[4/3] w-full rounded-xl"
                />
              ))}
            </section>
          </div>
        )}

        <section className="pt-5 md:pt-10 ">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            {t("similarProducts")}
          </h2>
          <div
            className={
              isScooter
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
            }
          >
            {!similar ? (
              <p>{t("similarError")}</p>
            ) : similar.length === 0 ? (
              <p>{t("similarEmpty")}</p>
            ) : (
              similar.map((item) => <ProductCard key={item.id} item={item} />)
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
