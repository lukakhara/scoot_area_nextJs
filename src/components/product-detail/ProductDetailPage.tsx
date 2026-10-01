// ProductDetailPage.tsx — no "use client", Server Component
import {
  Battery,
  CalendarDays,
  CircleCheck,
  CreditCard,
  Gauge,
  Mountain,
  Package,
  Repeat,
  Timer,
  Users,
  Weight,
  Zap,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/product-detail/QuantitySelector";
import { ImageThumbnailGallery } from "@/components/product-detail/ImageThumbnailGallery";
import { CompareButton } from "@/components/ui/CompareButton";
import { ActionButton } from "@/components/ui/ActionButton";
import { type Product, type ProductUnits, type Scooter } from "@/types/product";
import Image from "next/image";
import ProductCardImage from "../ui/ProductCardImage";

type PageType = "scooter" | "accessory" | "parts";

export type DetailProduct = {
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  imagePath: string;
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
    imagePath: "/helmetMobile.png",
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
    imagePath: "/productBatteryMobile.png",
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
      imagePath: "/helmetMobile.png",
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
      imagePath: "/productBatteryMobile.png",
      description:
        "ელექტრო სკუტერი ხშირად აღწევს 25-დან 50 კმ/სთ-მდე სიჩქარეს. წაქცევის ან შეჯახების შემთხვევაში, ჩაფხუტი მნიშვნელოვნად ამცირებს თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს აუცილებლობაა.",
    },
    similar: Array.from({ length: 6 }, mockPart),
  },
};

export default function ProductDetailPage({
  pageType,
  product,
  similar: similarProp,
  units,
}: {
  pageType: PageType;
  product: Product;
  similar?: Product[];
  units: ProductUnits;
}) {
  const isScooter = pageType === "scooter";


  const similar: Product[] =
    isScooter && similarProp
      ? similarProp
      : (STATIC_CONFIG[pageType]?.similar ?? []);

  const sectionTitle = isScooter ? "რატომ ეს სკუტერი?" : undefined;
  const showPhotoGrid = isScooter;


  console.log(product);

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16">
        {!isScooter && (
          <h1 className="text-3xl font-extrabold tracking-tight uppercase lg:hidden">
            {product.name}
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
                  <ProductCardImage
                    src={product.imagePath}
                    alt={product.name}
                  />
                ) : (
                  <Placeholder
                    className="aspect-[4/3] w-full"
                    label={product.name}
                  />
                )}
                {product.discount && (
                  <span className="absolute top-4 left-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">
                    {product.discount}
                  </span>
                )}
                <div className="absolute right-4 bottom-4">
                  <CompareButton variant="notHeader" />
                </div>
              </div>

              {product.imagePath && <ImageThumbnailGallery imagePath={product.imagePath} />}
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
                  srcSet={product.imagePath}
                />
                <Image
                  src={product.images[0]}
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
                {product.name}
              </h1>
            ) : (
              <h1 className="hidden text-4xl font-extrabold tracking-tight uppercase lg:block">
                {product.name}
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

              <ActionButton
                icon={ShoppingBasket}
                label="კალათაში დამატება"
                variant={isScooter ? "notHeader" : "outline"}
              />

              <ActionButton
                icon={CreditCard}
                label="ყიდვა"
                variant={isScooter ? "notHeader" : "outline"}
              />
            </div>

            {isScooter && product ? (
              <ul className="mt-8 space-y-3 rounded-2xl bg-secondary p-6 text-sm text-muted-foreground">
                {getScooterSpecs(scooter, units).map(
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
                
        
              </>
            )}
          </div>
        </div>

        

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
              <ProductCard key={item.id} item={item} units={units}  />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
