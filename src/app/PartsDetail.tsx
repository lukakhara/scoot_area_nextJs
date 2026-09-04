'use client'
import { Minus, Plus, ShoppingBasket } from "lucide-react";
// import { AccessoryCard, type Accessory } from "../components/AccessoryCardOLD";
import {ProductCard } from "../components/ProductCard";
import type {Product} from "../types/product";
import { useState } from "react";
// import helmetMobile from "/productDesk.png";
// import helmetDesktop from "/productDesk.png";
// import productBatteryDesktop from "/productBatteryDesk.png";
// import productBatteryMobile from "/productBatteryMob.png";
import Image from "next/image";

const SIMILAR: Product[] = Array.from({ length: 6 }, (_,i) => ({
  id: `similar-${i}`,
  productType:'parts',
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  imageLabel: "battery",
  imagePath: {
    mobile: "/productBatteryMob.png",
    desktop: "/productBatteryDesk.png",
  },
}));

function PartsDetail() {
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase lg:hidden">
          ლითიუმ-იონური ბატარეა
        </h1>

        <div className="mt-5 grid gap-8 lg:mt-0 lg:grid-cols-2 lg:gap-14 lg:pt-8">
          <div className="relative overflow-hidden rounded-2xl bg-secondary p-4">
            <span className="absolute top-6 left-6 z-10 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">
              5% ფასდაკლება
            </span>
            <picture className="size-[64px] sm:size-[110px]">
              <source
                media="(min-width: 768px)"
                srcSet="/productDesk.png"
                className=""
              />
              <Image
                src="/productDesk.png"
                className="aspect-[4/3] w-full object-cover"
                alt="product image"
              />
            </picture>
          </div>

          <div>
            <h1 className="hidden text-4xl font-extrabold tracking-tight uppercase lg:block">
              ლითიუმ-იონური ბატარეა
            </h1>

            <div className="mt-4 flex items-baseline gap-5">
              <span className="text-2xl font-bold text-primary lg:text-3xl">
                250.00₾
              </span>
              <span className="text-xl text-muted-foreground line-through lg:text-2xl">
                400.00₾
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border px-4 py-2.5">
                <button
                  aria-label="შემცირება"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">
                  {qty}
                </span>
                <button
                  aria-label="გაზრდა"
                  onClick={() => setQty((q) => q + 1)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary sm:text-sm">
                <ShoppingBasket className="size-4" /> კალათაში დამატება
              </button>
              <button className="rounded-full border px-6 py-3 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary sm:text-sm">
                ყიდვა
              </button>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-foreground/80">
              ელექტრო სკუტერი ხშირად აღწევს 25-დან 50 კმ/სთ-მდე სიჩქარეს.
              წაქცევის ან შეჯახების შემთხვევაში, ჩაფხუტი მნიშვნელოვნად ამცირებს
              თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს აუცილებლობაა.
            </p>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            მსგავსი პროდუქცია
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 ">
            {SIMILAR.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PartsDetail;
