"use client";
import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";
import Image from "next/image";

type CartItem = {
  title: string;
  color: string;
  price: string;
  oldPrice?: string;
  qty: number;
  sale?: boolean;
  total: string;
};

const INITIAL: CartItem[] = [
  {
    title: "Ninebot by Segway - F30 Plus",
    color: "შავი",
    price: "550.00₾",
    oldPrice: "750.00₾",
    qty: 5,
    sale: true,
    total: "3750.00₾",
  },
  {
    title: "Ninebot by Segway - F30 Plus",
    color: "შავი",
    price: "750.00₾",
    qty: 2,
    total: "1500.00₾",
  },
  {
    title: "Ninebot by Segway - F30 Plus",
    color: "შავი",
    price: "750.00₾",
    qty: 5,
    sale: true,
    total: "3750.00₾",
  },
];

function CartPage() {
  const [items, setItems] = useState(INITIAL);
  const [delivery, setDelivery] = useState<"pickup" | "courier">("courier");
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);

  const setQty = (i: number, d: number) =>
    setItems((prev) =>
      prev.map((it, idx) =>
        idx === i ? { ...it, qty: Math.max(1, it.qty + d) } : it,
      ),
    );
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-background  flex flex-col items-center w-full md:pt-20 md:pb-30 md:px-[75px]   px-5 pt-8 pb-16 ">
      <main className="w-full">
        <h1 className="text-[24px] font-bp;d tracking-tight uppercase sm:text-4xl">
          კალათა
        </h1>

        <div className="mt-6  gap-8 flex flex-col md:flex-row  ">
          {/* Items */}
          <section className="overflow-hidden rounded-2xl border bg-card  w-full ">
            <div className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b px-4 py-4 text-[9px] md:text-[11px] tracking-wide  uppercase sm:px-6 sm:text-sm text-[#212121]">
              <span>პროდუქტი</span>
              <span>ფასი</span>
              <span>ცალი</span>
              <span>ჯამი</span>
              <span />
            </div>

            {items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b px-4 py-4 last:border-b-0 sm:px-6  w-full text-[#5A5A5A]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/scooterMobile.png"
                    className="hidden size-32 shrink-0 rounded-xl border sm:flex bg-cover"
                    alt="product image"
                    width={128}
                    height={128}
                  />

                  <div className="min-w-0">
                    <p className="text-[7.39px] leading-[100%] md:leading-tight font-extrabold uppercase sm:text-sm text-[#212121]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[7.39px] md:text-[11px]  sm:text-sm ">
                      ფერი: {item.color}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] sm:text-sm font-normal">
                  {item.oldPrice && (
                    <p className="text-muted-foreground line-through">
                      {item.oldPrice}
                    </p>
                  )}
                  <p className={item.oldPrice ? "text-[#EA2700]  " : ""}>
                    {item.price}
                  </p>
                </div>

                <div className="text-center text-[11px] sm:text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      aria-label="შემცირება"
                      onClick={() => setQty(i, -1)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      −
                    </button>
                    <span className="min-w-4 font-normal">{item.qty}</span>
                    <button
                      aria-label="გაზრდა"
                      onClick={() => setQty(i, 1)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                  {item.sale && (
                    <p className="mt-0.5 text-[14px] font-normal text-[#EA2700]">
                      მაქს.
                    </p>
                  )}
                </div>

                <p className="text-[11px] font-medium sm:text-sm">
                  {item.total}
                </p>

                <button
                  aria-label="წაშლა"
                  onClick={() => remove(i)}
                  className="justify-self-end text-muted-foreground hover:text-sale"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                კალათა ცარიელია
              </p>
            )}
          </section>

          {/* Summary */}
          {!isOrdersPlaced && (
            <aside className="h-fit rounded-2xl border bg-card p-5 sm:p-6 ">
              <h2 className="text-lg font-extrabold tracking-tight uppercase">
                შეკვეთის დეტალები
              </h2>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between  pb-4">
                  <dt className="text-muted-foreground">ჯამი:</dt>
                  <dd className="font-semibold">9000.00₾</dd>
                </div>
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-muted-foreground">ფასდაკლება:</dt>
                  <dd className="font-semibold">2000.00₾</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground text-nowrap">
                    გადასახდელი თანხა:
                  </dt>
                  <dd className="font-semibold">7000.00₾</dd>
                </div>
              </dl>

              <button
                className="mt-6 w-full rounded-full bg-[oklch(0.62_0.16_150)] py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
                onClick={() => setIsOrdersPlaced(true)}
              >
                ყიდვა
              </button>
            </aside>
          )}
        </div>

        {/* Checkout form */}
        {isOrdersPlaced && (
          <section className="mt-10 w-full space-y-5 ">
            {/* Checkout form top */}
            <div className="flex gap-8 flex-col md:flex-row">
              {/* // leftside */}
              <div className="flex-1">
                <div className="flex justify-between gap-8">
                  <Select label="თბილისი" />
                  <div className="hidden">
                    {" "}
                    <Select label="რაიონი" />
                  </div>
                </div>

                <div className=" text-sm flex md:items-center gap-2 flex-col md:flex-row items-start">
                  <Radio
                    label="ფილიალიდან გატანა"
                    checked={delivery === "pickup"}
                    onChange={() => setDelivery("pickup")}
                  />
                  <Radio
                    label="მიტანის სერვისით სარგებლობა"
                    checked={delivery === "courier"}
                    onChange={() => setDelivery("courier")}
                  />
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground md:border-b-[0.5px] md:border-[#888888] border-none pb-6 text-nowrap">
                  მიტანის სერვისის საფასური - 50₾
                  <br />
                  მიტანის სერვისი უფასოა 1500₾ შეკვეთის შემთხვევაში
                </p>

                <div className="border-b-[0.5px] border-[#888888] pb-[25px] md:pb-6   md:hidden">
                  <Select label="რაიონი" />
                </div>

                <div className="pt-6 flex flex-col gap-2 md:gap-4 w-full">
                  <Input placeholder="მისამართი*" />
                  <Input placeholder="კომენტარი" />
                  <div className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <Input placeholder="სახელი*" />
                    <Input placeholder="გვარი*" />
                  </div>
                </div>
              </div>
              {/* // rightside */}
              <aside className="h-fit rounded-2xl border bg-card p-5 sm:p-6 order-first md:order-">
                <h2 className="text-lg font-extrabold tracking-tight uppercase">
                  შეკვეთის დეტალები
                </h2>

                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between border-b pb-4">
                    <dt className="text-muted-foreground">ჯამი:</dt>
                    <dd className="font-semibold">9000.00₾</dd>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <dt className="text-muted-foreground">ფასდაკლება:</dt>
                    <dd className="font-semibold">2000.00₾</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">
                      გადასახდელი თანხა:
                    </dt>
                    <dd className="font-semibold">7000.00₾</dd>
                  </div>
                </dl>
              </aside>
            </div>

            <hr />

            <div>
              <div className="border-b-[0.5px] border-[#888888] flex md:gap-8 pb-6 md:pb-8  gap-2 flex-col md:flex-row">
                <Input placeholder="ტელეფონის ნომერი*" />

                <button className="w-full rounded-full bg-secondary py-3 text-sm font-semibold">
                  კოდის გაგზავნა
                </button>

                <div className="relative">
                  <input
                    placeholder="SMS კოდი"
                    className="w-full rounded-full border py-3 pr-40 pl-5 text-sm outline-none focus:border-primary"
                  />
                  <button className="absolute top-1 right-1 rounded-full bg-secondary px-6 py-2 text-sm font-semibold">
                    დადასტურება
                  </button>
                </div>
              </div>

              <div className="flex md:gap-29 pt-6  md:pt-8 flex-col gap-6 md:flex-row">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="size-4 accent-[oklch(0.62_0.16_150)]"
                  />
                  <span className="underline text-nowrap">
                    ვეთანხმები წესებსა და პირობებს
                  </span>
                </label>

                <button className="w-full rounded-full border py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary ">
                  შეკვეთის განთავსება
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Select({ label }: { label: string }) {
  return (
    <div className="relative w-full">
      <select className="w-full appearance-none rounded-full border bg-transparent px-5 py-3 text-sm outline-none focus:border-primary">
        <option>{label}</option>
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-full border px-5 py-3 text-sm outline-none focus:border-primary"
    />
  );
}

function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="delivery"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[oklch(0.62_0.16_150)]"
      />
      <span>{label}</span>
    </label>
  );
}

export default CartPage;
