'use client'
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import CartPopover from "@/components/CartPopover";
import Image from "next/image";

const NAV: { label: string; to: string }[] = [
  { label: "სკუტერები", to: "/scooters" },
  { label: "ეკიპირება და აქსესუარები", to: "/equiment-accessories" },
  { label: "სათადარიგო ნაწილები", to: "/parts" },
  { label: "შეკეთება", to: "/repair" },
  { label: "ბლოგი", to: "/blog" },
  { label: "ჩვენს შესახებ", to: "/about" },
  { label: "კონტაქტი", to: "/contact" },
];

export default function Header({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [langEnglish, setLangEnglish] = useState(false);
  console.log(langEnglish);
  const flag = langEnglish ? "/gb-flag.png" : "/georgia.png";
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const solid = isHomePage ? false : true;

  return (
    <header
      className={cn(
        "z-30 ",
        solid
          ? " top-0 border-b-2 border-primary bg-secondary text-foreground"
          : "absolute inset-x-0 top-0",
      )}
    >
      <div
        className={cn(
          " flex w-full items-center justify-center gap-6 h-[78px] md:h-[192px] md:px-[33px] lg:px-[66px] px-[13px] xl:h-[192px]",
          !solid && "text-primary-foreground",
        )}
      >
        <Link
          href="/"
          className="shrink-0 text-2xl leading-5 font-extrabold tracking-tight"
        >
          <picture className="size-[64px] sm:size-[110px]">
            <source media="(min-width: 768px)" srcSet='/logoDesk.png' className="" />
            <Image
              src='/logoMobile.png'
              className=" w-full object-cover"
              alt="product image"
              width={110}
              height={110}
            />
          </picture>
        </Link>

        <nav className=" flex-1 items-center justify-center gap-6 text-[14px] font-medium hidden xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              className=" transition-opacity hover:opacity-70"
              // activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 xl:ml-0">
          <div className="relative ml-auto flex items-center gap-4 md:gap-12 xl:ml-0"></div>
          <button
            aria-label="ძებნა"
            className="hidden transition-opacity hover:opacity-70 sm:block"
          >
  
          </button>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-xs font-semibold"
          >
            <button
              onClick={() => setCartOpen((v) => !v)}
              aria-expanded={cartOpen}
              className="relative flex items-center gap-2 text-xs  text-[14px] font-medium"
            >
              <ShoppingCart className="size-5" />
              <span className="absolute -top-2 left-4 flex size-4 items-center justify-center rounded-full bg-sale text-[9px] text-primary-foreground ">
                3
              </span>
              450.00₾
            </button>
          </Link>

          {cartOpen && <CartPopover onClose={() => setCartOpen(false)} />}
          <div className={cn("flex items-center justify-center sm:size-10 size-6 rounded-full border  p-[5.7px]",  solid ? "border-black" : "border-white")}>
              <Image
            src={flag}
            onClick={() => setLangEnglish((prev) => !prev)}
            className={cn(
              " size-[13.25px] sm:size-[22.07px] rounded-full border-white ",
              solid ? "bg-foregrhound/15" : "bg-primary-foreground/20",
            )}
            alt="flag icon"
            width={22.08}
            height={220}
          />
          </div>
        
          <button
            aria-label="მენიუ"
            className="xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" strokeWidth={1} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className={cn(
            "mx-4 mb-3 space-y-1 rounded-lg p-4 text-sm xl:hidden",
            solid ? "bg-card" : "bg-brand-ink/95 text-primary-foreground",
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              className="block py-1.5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
