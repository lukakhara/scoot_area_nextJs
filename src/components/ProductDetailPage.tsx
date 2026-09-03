// ProductDetailPage.tsx
'use client'
import { useState } from "react";
import {
  Minus,
  Plus,
  Shuffle,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
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
} from "lucide-react";
import { Placeholder } from "../components/Placeholder";
import { ProductCard } from "../components/ProductCard";
import { type Product } from "../types/product";
import Image from "next/image";


type PageType = "scooter" | "accessory" | "parts";

export type SpecItem = { Icon: LucideIcon; label: string };

export type DetailProduct = {
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  imagePath: { mobile: string; desktop: string };
  description?: string | string[];
  configurations?: string[];
};

type PageConfig = {
  product: DetailProduct;
  similar: Product[];
  specs?: SpecItem[];
  sectionTitle?: string;
  showPhotoGrid?: boolean;
};

const SCOOTER_SPECS: SpecItem[] = [
  { Icon: Repeat, label: "ძრავი - 125 კუბი" },
  { Icon: Gauge, label: "სიჩქარე" },
  { Icon: Zap, label: "მაქსიმალური მანძილი" },
  { Icon: Weight, label: "წონა" },
  { Icon: CalendarDays, label: "გამოშვების თარიღი" },
  { Icon: CircleCheck, label: "გარანტია" },
  { Icon: Mountain, label: "აღმართი" },
  { Icon: Timer, label: "დატენვის დრო" },
  { Icon: Package, label: "მგზავრის დასაშვები წონა" },
  { Icon: Users, label: "მგზავრის რეკომენდირებული წონა" },
  { Icon: Battery, label: "ძრავების რაოდენობა" },
  { Icon: CircleCheck, label: "ბორბლის ზომა" },
];

const PAGE_CONFIG: Record<PageType, PageConfig> = {
  scooter: {
    product: {
      title: "Ninebot by Segway - F30 Plus",
      price: "750.00₾",
      oldPrice: "900.00₾",
      discount: "10% ფასდაკლება",
      imagePath: { mobile: "/scooterMobile.png", desktop: "/scooterDesktop.png" },
      description: [
        "სეგვეის ნაინბოტ სი20 არის ელექტრო ქიმიკატების სერიის ნაწილი, რომელიც შექმნილია ექსკლუზიურად მოხმარებისთვის. დამატებითი კურვადობა დაეთმო უსაფრთხოების მახასიათებლებს, როგორიცაა ელასტიური რეზინის საბურავები.",
        "აღმოსაჩენად განკუთვნილი გამძლეობის სავალფურის ქვედა ნაწილში და არის 3 სხვადასხვა ფერში, ტარების რეჟიმის მიხედვით. ბატარეა მოთავსებულია სავალფურში, რომელიც ინარჩუნებს სიმძიმის ცენტრს დაბალ დონეზე და ადვილად სამართავს.",
        "გარდა ამისა ქიმიკატები აღჭურვილია ხელით მოძებავ უკანა მუხრუჭით, რაც ყოველთვის უზრუნველყოფს დამუხრუჭების უსაფრთხო მანძილს. სკუტერის სრული დატენვა შესაძლებელია სულ რაღაც 5 საათში.",
      ],
    },
    similar: Array.from({ length: 3 }, () => ({
      id: `scooter${Math.random().toString(36).substr(2, 9)}`,
      productType: "scooter",
      title: "Ninebot by Segway - F30 Plus",
      price: "750.00₾",
      year: "2025",
      installment: "თვეში 55 ლარიდან",
      oldPrice: "900.00₾",
      imagePath: { mobile: "/scooterMobile.png", desktop: "/scooterDesktop.png" },
    })),
    specs: SCOOTER_SPECS,
    sectionTitle: "რატომ ნაინბოტ სი20?",
    showPhotoGrid: true,
  },
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
    similar: Array.from({ length: 3 }, () => ({
      id: `accessory${Math.random().toString(36).substr(2, 9)}`,
      productType: "accessory",
      title: "Ninebot by Segway - F30 Plus",
      price: "750.00₾",
      imagePath: { mobile: "/helmetMobile.png", desktop: "/helmetDesktop.png" },
    })),
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
    similar: Array.from({ length: 6 }, () => ({
      id: `parts${Math.random().toString(36).substr(2, 9)}`,
      productType: "parts",
      title: "Ninebot by Segway - F30 Plus",
      price: "750.00₾",
      imagePath: {
        mobile: "/productBatteryMobile.png" ,
        desktop: "/productBatteryDesktop.png",
      },
    })),
  },
};

export default function ProductDetailPage({
  pageType,
}: {
  pageType: PageType;
}) {
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const isScooter = pageType === "scooter";
  const { product, similar, specs, sectionTitle, showPhotoGrid } =
    PAGE_CONFIG[pageType];

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

              <div className="mt-4 grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`სურათი ${i + 1}`}
                    className={`overflow-hidden rounded-xl border bg-card transition-colors ${
                      active === i
                        ? "border-primary"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <picture>
                      <source
                        media="(min-width: 768px)"
                        srcSet={product.imagePath.desktop}
                      />
                      <Image
                        src={product.imagePath.mobile}
                        className="aspect-[4/3] w-full object-cover"
                        alt="product image"
                        height={189}
                        width={189}
                      />
                    </picture>
                  </button>
                ))}
              </div>
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
              <div
                className={
                  isScooter
                    ? "flex items-center gap-3 rounded-full border px-3 py-2"
                    : "flex items-center gap-3 rounded-full border px-4 py-2.5"
                }
              >
                <button
                  aria-label="შემცირება"
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">
                  {qty}
                </span>
                <button
                  aria-label="გაზრდა"
                  onClick={() => setQty((v) => v + 1)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

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

            {isScooter && specs ? (
              <ul className="mt-8 space-y-3 rounded-2xl bg-secondary p-6 text-sm text-muted-foreground">
                {specs.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon className="size-4 shrink-0 text-foreground/70" />
                    {label}
                  </li>
                ))}
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
            {similar.map((item, i) => (
              <ProductCard key={item.title + i} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
