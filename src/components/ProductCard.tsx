// ProductCard.tsx — no "use client" needed, stays a Server Component
import Link from "next/link";
import {
  CircleCheck,
  Gauge,
  Repeat,
  ShoppingBasket,
  Shuffle,
  Weight,
  Zap,
} from "lucide-react";
import { Placeholder } from "./ui/Placeholder";
import { type Product } from "../types/product";
import ProductCardImage from "./ui/ProductCardImage";
import { CompareButton } from "./ui/CompareButton";
import { ActionButton } from "./ui/ActionButton";

type PageType = "scooters" | "parts" | "accessories";

const SCOOTER_SPECS = [
  { Icon: Repeat, label: "ძრავი ", propertyName: "brand" },
  { Icon: Gauge, label: "სიჩქარე", propertyName: "brand" },
  { Icon: Zap, label: "მაქსიმალური მანძილი", propertyName: "brand" },
  { Icon: Weight, label: "წონა", propertyName: "brand" },
  { Icon: CircleCheck, label: "გარანტია", propertyName: "brand" },
];

const DETAIL_ROUTES: Record<PageType, string> = {
  scooters: "/scooters",
  accessories: "/equiment-accessories",
  parts: "/parts",
};

export function ProductCard({
  item,
  productType,
}: {
  item: Product;
  productType: PageType;
}) {
  const isScooter = productType === "scooters";

  return (
    <article className="flex h-full flex-col rounded-2xl bg-secondary p-4">
      <div className="relative overflow-hidden rounded-xl bg-card">
        {item.images && item.images.length > 0 ? (
          <Link
            href={item.id ? `${DETAIL_ROUTES[productType]}/${item.id}` : "#"}
            className="transition-colors hover:text-primary cursor-pointer group"
          >
            <ProductCardImage src={item.images[0]} alt={item.name} />
          </Link>
        ) : (
          <Placeholder className="" label={item.name} />
        )}

        {item.discount && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1.5 text-[9.8px] sm:text-[11.85px] text-primary-foreground uppercase">
            {item.discount}
          </span>
        )}

        {isScooter && item.year && (
          <span className="absolute top-3 right-3 rounded-full border px-3 py-1 text-[9.8px] sm:text-[11.85px]">
            {item.year}
          </span>
        )}

        <div className="absolute right-0 bottom-0 gap-[3.27px] bg-secondary z-100 py-[6.3px] px-[10.34px] flex items-center justify-center">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`size-[4.35px] sm:size-[5.27px] cursor-pointer hover:bg-[#c7c7c700] rounded-full ${i === 0 ? "bg-[#C7C7C7]" : "bg-[#E1E1E1]"}`}
            />
          ))}
        </div>
      </div>

      <h3 className="mt-4 text-[13px] sm:text-[15.8px] font-bold tracking-wide uppercase">
        <Link
          href={item.id ? `${DETAIL_ROUTES[productType]}/${item.id}` : "#"}
          className="transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
      </h3>

      <div
        className={
          isScooter
            ? "mt-2 flex items-baseline justify-between gap-2 border-b border-[#B7B7B7] pb-3"
            : "mt-2 flex items-baseline gap-2"
        }
      >
        <div className="flex items-baseline gap-2">
          <span
            className={`text-[13px] sm:text-[15.8px] ${item.oldPrice ? "text-[#EA2700]" : ""}`}
          >
            {item.price}₾
          </span>
          {item.oldPrice && (
            <span className="text-[13px] sm:text-[15.8px] text-[#212121] line-through">
              {item.oldPrice}₾
            </span>
          )}
        </div>
        {isScooter && item.installment && (
          <span className="text-[10.89px] sm:text-[13.16px] text-[#606060]">
            {item.installment}
          </span>
        )}
      </div>

      {isScooter && (
        <ul className="mt-3 space-y-1.5 text-[10.89px] sm:text-[13.6px] text-[#606060]">
          {SCOOTER_SPECS.map(({ Icon, label, propertyName }) => (
            <li
              key={label}
              className="flex items-center gap-2 test justify-between"
            >
              <div className="flex gap-2 items-center">
                <Icon className="size-3 shrink-0" />
                {label}
              </div>

              <div className="text-black bg-red-600">{item.brand}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-row w-full gap-2 pt-4 items-center">
        {isScooter && (
          <button className="inline-flex items-center gap-2 rounded-full border border-[#212121] px-4 py-2 text-[10.89px] sm:text-[13.16px] uppercase transition-colors hover:border-primary hover:text-primary text-[#212121] sm:max-w-[157.3px] justify-center">
            <Shuffle className="size-3.5" /> შედარება
          </button>
        )}

        <button
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10.89px] uppercase transition-colors hover:border-primary hover:text-primary border-[#212121]  ${
            isScooter
              ? "text-[#212121]"
              : "flex-1 py-2.5 sm:text-[20px] w-full justify-center"
          }`}
        >
          <ShoppingBasket className="size-[8.78px] sm:size-6" /> კალათაში
          დამატება
        </button>
        <ActionButton icon={ShoppingBasket} label=" კალათაში დამატება"  />
      </div>
    </article>
  );
}

export default ProductCard;
