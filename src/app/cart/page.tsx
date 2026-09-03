'use client'
import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";



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

  const setQty = (i: number, d: number) =>
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, qty: Math.max(1, it.qty + d) } : it)),
    );
  const remove = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-background">
     

      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">კალათა</h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-8">
          {/* Items */}
          <section className="overflow-hidden rounded-2xl border bg-card">
            <div className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b px-4 py-4 text-[11px] tracking-wide text-muted-foreground uppercase sm:px-6 sm:text-sm">
              <span>პროდუქტი</span>
              <span>ფასი</span>
              <span>ცალი</span>
              <span>ჯამი</span>
              <span />
            </div>

            {items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b px-4 py-4 last:border-b-0 sm:px-6"
              >
                <div className="flex items-center gap-3">
                  <Placeholder
                    className="hidden size-16 shrink-0 rounded-xl border sm:flex"
                    label="scooter"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] leading-tight font-extrabold uppercase sm:text-sm">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground sm:text-sm">
                      ფერი: {item.color}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] sm:text-sm">
                  {item.oldPrice && (
                    <p className="text-muted-foreground line-through">{item.oldPrice}</p>
                  )}
                  <p className={item.oldPrice ? "font-semibold text-sale" : ""}>{item.price}</p>
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
                    <span className="min-w-4 font-medium">{item.qty}</span>
                    <button
                      aria-label="გაზრდა"
                      onClick={() => setQty(i, 1)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                  {item.sale && <p className="mt-0.5 text-[10px] text-sale">მაქს.</p>}
                </div>

                <p className="text-[11px] font-medium sm:text-sm">{item.total}</p>

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
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">კალათა ცარიელია</p>
            )}
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-extrabold tracking-tight uppercase">შეკვეთის დეტალები</h2>

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
                <dt className="text-muted-foreground">გადასახდელი თანხა:</dt>
                <dd className="font-semibold">7000.00₾</dd>
              </div>
            </dl>

            <button className="mt-6 w-full rounded-full bg-[oklch(0.62_0.16_150)] py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              ყიდვა
            </button>
          </aside>
        </div>

        {/* Checkout form */}
        <section className="mt-10 max-w-[720px] space-y-5">
          <Select label="თბილისი" />

          <div className="space-y-3 text-sm">
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

          <p className="text-xs leading-relaxed text-muted-foreground">
            მიტანის სერვისის საფასური - 50₾
            <br />
            მიტანის სერვისი უფასოა 1500₾ შეკვეთის შემთხვევაში
          </p>

          <Select label="რაიონი" />

          <hr />

          <Input placeholder="მისამართი*" />
          <Input placeholder="კომენტარი" />
          <Input placeholder="სახელი*" />
          <Input placeholder="გვარი*" />

          <hr />

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

          <hr />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="size-4 accent-[oklch(0.62_0.16_150)]" />
            <span className="underline">ვეთანხმები წესებსა და პირობებს</span>
          </label>

          <button className="w-full rounded-full border py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
            შეკვეთის განთავსება
          </button>
        </section>
      </main>

    </div>
  );
}

function Select({ label }: { label: string }) {
  return (
    <div className="relative">
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