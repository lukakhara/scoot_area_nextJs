"use client";
import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const [delivery, setDelivery] = useState<"pickup" | "courier">("courier");
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);

  // derived totals — recalculated whenever items changes, never hardcoded
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = items.reduce(
    (sum, item) =>
      sum + (item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0),
    0,
  );
  const total = subtotal;

  const format = (n: number) => `${n.toFixed(2)}₾`;

  const setQty = (productId: string, delta: number, currentQty: number) => {
    const next = Math.max(1, currentQty + delta);
    updateQuantity(productId, next);
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">იტვირთება...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full md:pt-20 md:pb-30 md:px-[75px] px-5 pt-8  ">
      <main className="w-full ">
        <h1 className="text-[24px] font-bold tracking-tight uppercase sm:text-4xl">
          კალათა
        </h1>

        <div className="mt-6 gap-8 flex flex-col md:flex-row ">
          {/* Items */}
          <section
            className={`overflow-hidden rounded-2xl border bg-card w-[70%] border-[#888888]! ${isOrdersPlaced && "w-full"}`}
          >
            <div className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b-[0.5px] px-4 py-4 text-[9px]  tracking-wide uppercase sm:px-6 sm:text-sm text-[#212121]  md:text-[22px]  border-[#888888] ">
              <span>პროდუქტი</span>
              <span>ფასი</span>
              <span>ცალი</span>
              <span>ჯამი</span>
            </div>

            {items.map((item) => (
              <div
                key={item.productId}
                className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b px-4 py-4 last:border-b-0 sm:px-6 w-full text-[#5A5A5A] border-[#888888] text-[7.9px] md:text-[18px]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image ?? "/scooterMobile.png"}
                    className="hidden size-32 shrink-0 rounded-xl border sm:flex bg-cover"
                    alt={item.title}
                    width={128}
                    height={128}
                  />

                  <div className="min-w-0">
                    <p className=" leading-[100%] md:leading-tight font-extrabold uppercase  text-[#212121]">
                      {item.title}
                    </p>
                    {item.color && <p className="mt-1  ">ფერი: {item.color}</p>}
                  </div>
                </div>

                <div className="text-[11px] sm:text-sm font-normal">
                  {item.oldPrice && (
                    <p className="text-muted-foreground line-through">
                      {format(item?.oldPrice)}
                    </p>
                  )}
                  <p className={item.oldPrice ? "text-[#EA2700]" : ""}>
                    {format(item.price)}
                  </p>
                </div>

                <div className="text-center text-[11px] sm:text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label="შემცირება"
                      onClick={() => setQty(item.productId, -1, item.quantity)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      −
                    </button>
                    <span className="min-w-4 font-normal">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="გაზრდა"
                      onClick={() => setQty(item.productId, 1, item.quantity)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                  {item.oldPrice && (
                    <p className="mt-0.5 text-[14px] font-normal text-[#EA2700]">
                      მაქს.
                    </p>
                  )}
                </div>

                <p className="text-[11px] font-medium sm:text-sm">
                  {format(item.price * item.quantity)}
                </p>

                <button
                  type="button"
                  aria-label="წაშლა"
                  onClick={() => removeItem(item.productId)}
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
          {!isOrdersPlaced && items.length > 0 && (
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              format={format}
              onSubmit={() => setIsOrdersPlaced(true)}
            />
          )}
        </div>

        {/* Checkout form */}
        {isOrdersPlaced && (
          <section className="mt-10 w-full space-y-5 flex-1 ">
            <div className="flex gap-8 flex-col md:flex-row ">
              <div className="flex-1/2  ">
                <div className="">
                  <div className="flex  justify-between gap-8">
                    <div className="flex-1">
                      <Select label="თბილისი" />
                    </div>
                    <div className="flex-1">
                      <Select label="რაიონი" />
                    </div>
                  </div>

                  <div className="text-sm flex md:items-center gap-2 flex-col md:flex-row items-start py-2 ">
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

                  <p className="text-xs leading-relaxed text-muted-foreground md:border-b-[0.5px] md:border-[#888888] border-none text-nowrap">
                    მიტანის სერვისის საფასური - 50₾
                    <br />
                    მიტანის სერვისი უფასოა 1500₾ შეკვეთის შემთხვევაში
                  </p>
                  <div className="border-b-[0.5px] border-[#888888]  md:pb-6 md:block hidden"></div>

                  <div className="border-b-[0.5px] border-[#888888] pb-[25px] md:pb-6 md:hidden">
                    <Select label="რაიონი" />
                  </div>
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

              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                format={format}
                className="order-first md:order-2 flex-1"
              />
            </div>

            <hr />

            <div>
              <div className="border-b-[0.5px] border-[#888888] flex md:gap-8 pb-6 md:pb-8 gap-2 flex-col md:flex-row">
                <Input placeholder="ტელეფონის ნომერი*" />

                <button
                  type="button"
                  className="w-full rounded-full bg-secondary py-3 text-sm font-semibold"
                >
                  კოდის გაგზავნა
                </button>

                <div className="relative flex w-full rounded-full border justify-between ">
                  <input
                    placeholder="SMS კოდი"
                    className=" text-sm outline-none focus:border-primary pl-6"
                  />
                  <button
                    type="button"
                    className=" rounded-full bg-secondary  text-sm font-semibold w-1/2"
                  >
                    დადასტურება
                  </button>
                </div>
              </div>

              <div className="flex md:gap-29 pt-6 md:pt-8 flex-col gap-6 md:flex-row">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    className="size-4 accent-[oklch(0.62_0.16_150)]"
                  />
                  <span className="underline text-nowrap">
                    ვეთანხმები წესებსა და პირობებს
                  </span>
                </label>

                <button
                  type="button"
                  className="w-full rounded-full border py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
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

function OrderSummary({
  subtotal,
  discount,
  total,
  format,
  onSubmit,
  className = "",
}: {
  subtotal: number;
  discount: number;
  total: number;
  format: (n: number) => string;
  onSubmit?: () => void;
  className?: string;
}) {
  return (
    <aside
      className={`h-fit rounded-2xl border bg-card p-5 sm:p-6 ${className} flex-1 border-[#888888]! text-[11.17px] md:text-[18px]`}
    >
      <h2 className="text-[13.65px] md:text-[22px] font-extrabold tracking-tight uppercase border-b-[0.5px] border-[#888888]! pb-2 ">
        შეკვეთის დეტალები
      </h2>

      <dl className="pt-2   ">
        <div className="flex items-center justify-between pb-4 ">
          <dt className="text-muted-foreground">ჯამი:</dt>
          <dd className="font-semibold">{format(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between  pb-4 border-b-[0.5px] border-[#888888]">
          <dt className="text-muted-foreground ">ფასდაკლება:</dt>
          <dd className="font-semibold">{format(discount)}</dd>
        </div>
        <div
          className={cn(
            `flex items-center justify-between pt-4 ${onSubmit && "pb-[79px]"}  `,
          )}
        >
          <dt className="text-muted-foreground text-nowrap">
            გადასახდელი თანხა:
          </dt>
          <dd className="font-semibold">{format(total)}</dd>
        </div>
      </dl>

      {onSubmit && (
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-[oklch(0.62_0.16_150)] py-3.5  font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
          onClick={onSubmit}
        >
          ყიდვა
        </button>
      )}
    </aside>
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
