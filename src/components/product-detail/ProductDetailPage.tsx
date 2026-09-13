// ProductDetailPage.tsx — no "use client", Server Component
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
  Shuffle,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/product-detail/QuantitySelector";
import { ImageThumbnailGallery } from "@/components/product-detail/ImageThumbnailGallery";
import { type Product, type ProductUnits, type Scooter } from "@/types/product";
import Image from "next/image";
import ProductCardImage from "../ui/ProductCardImage";

type PageType = "scooter" | "accessory" | "parts";

export type DetailProduct = {
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  imagePath: { mobile: string; desktop: string };
  description?: string | string[];
  configurations?: string[];
};

function getScooterSpecs(
  scooter: Scooter,
  units: ProductUnits,
): { Icon: LucideIcon; label: string; value: string }[] {
  return [
    { Icon: Repeat, label: "ძრავი", value: scooter.engine },
    {
      Icon: Gauge,
      label: "სიჩქარე",
      value: `${scooter.maxSpeed} ${units.kmH}`,
    },
    {
      Icon: Zap,
      label: "მაქსიმალური მანძილი",
      value: `${scooter.maxRange} ${units.km}`,
    },
    { Icon: Weight, label: "წონა", value: `${scooter.weight} ${units.kg}` },
    {
      Icon: CalendarDays,
      label: "გამოშვების თარიღი",
      value: String(new Date(scooter.releaseDate).getFullYear()),
    },
    { Icon: CircleCheck, label: "გარანტია", value: scooter.warranty },
    { Icon: Mountain, label: "აღმართი", value: scooter.inclineAngle },
    { Icon: Timer, label: "დატენვის დრო", value: scooter.chargingTime },
    {
      Icon: Package,
      label: "მგზავრის დასაშვები წონა",
      value: `${scooter.maxRiderWeight} ${units.kg}`,
    },
    {
      Icon: Users,
      label: "მგზავრის რეკომენდირებული წონა",
      value: `${scooter.recommendedRiderWeight} ${units.kg}`,
    },
    {
      Icon: Battery,
      label: "ძრავების რაოდენობა",
      value: String(scooter.motorCount),
    },
    { Icon: CircleCheck, label: "ბორბლის ზომა", value: scooter.wheelSize },
  ];
}

function scooterToDetailProduct(s: Scooter): DetailProduct {
  return {
    title: s.name,
    price: `${s.price}₾`,
    imagePath: { mobile: s.images[0] ?? "", desktop: s.images[0] ?? "" },
  };
}

// Mocks — still used for accessory/parts until those detail endpoints exist
function mockAccessory(): Product {
  const id = `accessory${Math.random().toString(36).slice(2, 11)}`;
  return {
    productType: "accessory",
    id,
    name: "Ninebot by Segway - F30 Plus",
    brand: "Ninebot",
    price: "750.00",
    images: ["/helmetMobile.png"],
    category: "SAFETY_GEAR",
    size: "M",
    sex: "UNISEX",
    imagePath: { mobile: "/helmetMobile.png", desktop: "/helmetDesktop.png" },
  };
}

function mockPart(): Product {
  const id = `parts${Math.random().toString(36).slice(2, 11)}`;
  return {
    productType: "parts",
    id,
    name: "Ninebot by Segway - F30 Plus",
    price: "750.00",
    images: ["/productBatteryMobile.png"],
    category: "BATTERY_CELLS",
    imagePath: {
      mobile: "/productBatteryMobile.png",
      desktop: "/productBatteryDesktop.png",
    },
  };
}

const STATIC_CONFIG: Partial<
  Record<
    PageType,
    {
      product: DetailProduct;
      similar: Product[];
      sectionTitle?: string;
      showPhotoGrid?: boolean;
    }
  >
> = {
  accessory: {
    product: {
      title: "Ninebot by Segway - F30 Plus",
      price: "250.00₾",
      oldPrice: "400.00₾",
      discount: "10%",
      imagePath: { mobile: "/helmetMobile.png", desktop: "/helmetDesktop.png" },
      description:
        "ელექტრო სკუტერი ხშირად აღწევს 25-დან 50 კმ/სთ-მდე სიჩქარეს. წაქცევის ან შეჯახების შემთხვევაში, ჩაფხუტი მნიშვნელოვნად ამცირებს თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს აუცილებლობაა.",
      configurations: [
        "სერტიფიცირებული დაცვა (CE / EN 1078 / DOT) – შეესაბამება ევროპულ და საერთაშორისო სტანდარტებს",
        "მსუბუქი კონსტრუქცია – კომფორტული ხანგრძლივი ტარებისთვის",
        "ვენტილაციის სისტემა – სუნთქვისუნარიანი მასალა, რომელიც ხელს უშლის გადახურებას",
      ],
    },
    similar: Array.from({ length: 3 }, mockAccessory),
  },
  parts: {
    product: {
      title: "ლითიუმ-იონური ბატარეა",
      price: "250.00₾",
      oldPrice: "400.00₾",
      discount: "5%",
      imagePath: {
        mobile: "/productBatteryMobile.png",
        desktop: "/productBatteryDesktop.png",
      },
      description:
        "ელექტრო სკუტერი ხშირად აღწევს 25-დან 50 კმ/სთ-მდე სიჩქარეს. წაქცევის ან შეჯახების შემთხვევაში, ჩაფხუტი მნიშვნელოვნად ამცირებს თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს აუცილებლობაა.",
    },
    similar: Array.from({ length: 6 }, mockPart),
  },
};

export default function ProductDetailPage({
  pageType,
  scooterDetail,
  similar: similarProp,
  units,
}: {
  pageType: PageType;
  scooterDetail?: Scooter; // real fetched data, only for pageType === "scooter"
  similar?: Product[]; // real fetched data, only for pageType === "scooter"
  units: ProductUnits;
}) {
  const isScooter = pageType === "scooter";

  const product: DetailProduct =
    isScooter && scooterDetail
      ? scooterToDetailProduct(scooterDetail)
      : STATIC_CONFIG[pageType]!.product;

  const similar: Product[] =
    isScooter && similarProp
      ? similarProp
      : (STATIC_CONFIG[pageType]?.similar ?? []);

  const sectionTitle = isScooter ? "რატომ ეს სკუტერი?" : undefined;
  const showPhotoGrid = isScooter;

  const descriptionParagraphs = Array.isArray(product.description)
    ? product.description
    : product.description
      ? [product.description]
      : [];

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16">
        {!isScooter && (
          <h1 className="text-3xl font-extrabold tracking-tight uppercase lg:hidden">
            {product.title}
          </h1>
        )}

        <div
          className={
            isScooter
              ? "grid gap-8 lg:grid-cols-2"
              : "mt-5 grid gap-8 lg:mt-0 lg:grid-cols-2 lg:gap-14 lg:pt-8"
          }
        >
          {isScooter ? (
            <div>
              <div className="relative overflow-hidden rounded-2xl border bg-card">
                {product.imagePath ? (
                  <ProductCardImage src={product.imagePath.desktop} alt={product.title} />
                ) : (
                  <Placeholder
                    className="aspect-[4/3] w-full"
                    label={product.title}
                  />
                )}
                {product.discount && (
                  <span className="absolute top-4 left-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">
                    {product.discount}
                  </span>
                )}
                <button className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-[11px] font-semibold uppercase transition-colors hover:border-primary hover:text-primary">
                  <Shuffle className="size-3.5" /> შედარება
                </button>
              </div>

              <ImageThumbnailGallery imagePath={product.imagePath} />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl bg-secondary p-4">
              {product.discount && (
                <span className="absolute top-6 left-6 z-10 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">
                  {product.discount} ფასდაკლება
                </span>
              )}
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={product.imagePath.desktop}
                />
                <Image
                  src={product.imagePath.mobile}
                  className="aspect-[4/3] w-full object-cover"
                  alt="product image"
                  height={634}
                  width={600}
                />
              </picture>
            </div>
          )}

          <div>
            {isScooter ? (
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight uppercase sm:text-4xl">
                {product.title}
              </h1>
            ) : (
              <h1 className="hidden text-4xl font-extrabold tracking-tight uppercase lg:block">
                {product.title}
              </h1>
            )}

            <div
              className={
                isScooter
                  ? "mt-4 flex items-baseline gap-3"
                  : "mt-4 flex items-baseline gap-5"
              }
            >
              <span
                className={
                  isScooter
                    ? "text-2xl font-bold text-primary"
                    : "text-2xl font-bold text-primary lg:text-3xl"
                }
              >
                {product.price}
              </span>
              {product.oldPrice && (
                <span
                  className={
                    isScooter
                      ? "text-lg text-muted-foreground line-through"
                      : "text-xl text-muted-foreground line-through lg:text-2xl"
                  }
                >
                  {product.oldPrice}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QuantitySelector isScooter={isScooter} />

              <button
                className={
                  isScooter
                    ? "rounded-full border px-6 py-3 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary"
                    : "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary sm:text-sm"
                }
              >
                {!isScooter && <ShoppingBasket className="size-4" />} კალათაში
                დამატება
              </button>
              <button
                className={
                  isScooter
                    ? "rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground uppercase transition-opacity hover:opacity-90"
                    : "rounded-full border px-6 py-3 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary sm:text-sm"
                }
              >
                ყიდვა
              </button>
            </div>

            {isScooter && scooterDetail ? (
              <ul className="mt-8 space-y-3 rounded-2xl bg-secondary p-6 text-sm text-muted-foreground">
                {getScooterSpecs(scooterDetail, units).map(
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
              <>
                {descriptionParagraphs.length > 0 && (
                  <p className="mt-8 text-sm leading-relaxed text-foreground/80">
                    {descriptionParagraphs[0]}
                  </p>
                )}
                {product.configurations && (
                  <>
                    <p className="mt-5 text-sm font-medium">
                      ძირითადი მახასიათებლები:
                    </p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
                      {product.configurations.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {isScooter && descriptionParagraphs.length > 0 && (
          <section className="mt-16">
            {sectionTitle && (
              <h2 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
                {sectionTitle}
              </h2>
            )}
            <div className="mt-6 max-w-5xl space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {descriptionParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {isScooter && showPhotoGrid && (
          <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Placeholder
                key={i}
                className="aspect-[4/3] w-full rounded-xl"
                label="photo"
              />
            ))}
          </section>
        )}

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            მსგავსი პროდუქცია
          </h2>
          <div
            className={
              isScooter
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
            }
          >
            {similar.map((item) => (
              <ProductCard key={item.id} item={item} units={units} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
