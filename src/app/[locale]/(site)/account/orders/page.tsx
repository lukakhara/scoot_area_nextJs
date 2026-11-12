'use client'
import {
  Check,
  ChevronRight,
  Clock,
  Package,
  RotateCcw,
  Truck,
  X,
} from "lucide-react";
import { OutlineBtn, Panel, PrimaryBtn, accountHead } from "@/components/auth/AccountUi";
import { Placeholder } from "@/components/ui/Placeholder";
import { useState } from "react";


type Status = "processing" | "shipped" | "delivered" | "cancelled";

const STATUS: Record<
  Status,
  { label: string; chip: string; Icon: typeof Clock }
> = {
  processing: {
    label: "დამუშავებაში",
    chip: "bg-primary text-primary-foreground",
    Icon: Clock,
  },
  shipped: {
    label: "გაგზავნილი",
    chip: "bg-brand-ink text-primary-foreground",
    Icon: Truck,
  },
  delivered: {
    label: "მიწოდებული",
    chip: "bg-sale text-primary-foreground",
    Icon: Check,
  },
  cancelled: {
    label: "გაუქმებული",
    chip: "bg-destructive text-destructive-foreground",
    Icon: X,
  },
};

const FILTERS = ["ყველა", "დამუშავებაში", "გაგზავნილი", "მიწოდებული", "გაუქმებული"];

type Order = {
  id: string;
  date: string;
  status: Status;
  delivery: string;
  items: { title: string; color: string; qty: number; price: string }[];
  sum: string;
  deliveryCost: string;
  total: string;
};

const ORDERS: Order[] = [
  {
    id: "SH-10482",
    date: "09.11.2026",
    status: "shipped",
    delivery: "თბილისი, რუსთაველის გამზ. 10, ბ. 5 · კურიერი",
    items: [
      { title: "Ninebot by Segway - F30 Plus", color: "შავი", qty: 1, price: "750.00₾" },
      { title: "Ninebot by Segway - F30 Plus", color: "შავი", qty: 2, price: "750.00₾" },
    ],
    sum: "2 250.00₾",
    deliveryCost: "15.00₾",
    total: "2 265.00₾",
  },
  {
    id: "SH-10455",
    date: "02.11.2026",
    status: "processing",
    delivery: "ბათუმი, გორგილაძის ქ. 21 · კურიერი",
    items: [
      { title: "ქელატი ზურა-დაბანის", color: "შავი", qty: 1, price: "120.00₾" },
      { title: "სათითაო ნაწილები · დისკის მუხრუჭის ფირფიტები", color: "სტანდარტი", qty: 4, price: "35.00₾" },
    ],
    sum: "260.00₾",
    deliveryCost: "10.00₾",
    total: "270.00₾",
  },
  {
    id: "SH-10390",
    date: "18.10.2026",
    status: "delivered",
    delivery: "თბილისი, ჭავჭავაძის გამზ. 33 · თვითმომსახურება",
    items: [
      { title: "Ninebot by Segway - F30 Plus", color: "თეთრი", qty: 1, price: "750.00₾" },
    ],
    sum: "750.00₾",
    deliveryCost: "0.00₾",
    total: "750.00₾",
  },
  {
    id: "SH-10311",
    date: "05.10.2026",
    status: "cancelled",
    delivery: "თბილისი, რუსთაველის გამზ. 10, ბ. 5 · კურიერი",
    items: [
      { title: "Ninebot by Segway - F30 Plus", color: "შავი", qty: 1, price: "750.00₾" },
    ],
    sum: "750.00₾",
    deliveryCost: "15.00₾",
    total: "765.00₾",
  },
];

const STEPS = [
  { label: "მიღებული", Icon: Check },
  { label: "შეკრება", Icon: Package },
  { label: "გაგზავნილი", Icon: Truck },
  { label: "მიწოდებული", Icon: Check },
];

const PROGRESS: Record<Status, number> = {
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

function Timeline({ status }: { status: Status }) {
  const active = PROGRESS[status];
  return (
    <ol className="mt-5 flex items-start gap-1 border-t pt-5">
      {STEPS.map((step, i) => {
        const done = i <= active;
        return (
          <li key={step.label} className="flex flex-1 flex-col items-center text-center">
            <span
              className={`grid size-8 place-items-center rounded-full ${
                done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              <step.Icon className="size-4" />
            </span>
            <span
              className={`mt-2 text-[10px] font-bold tracking-wide uppercase ${
                done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function Orders() {
    const [filter,setFilter] = useState('ყველა')
  console.log(filter)

  return (
    <>
      <Panel
        title="შეკვეთები"
        action={
          <div className="flex flex-wrap gap-2 ">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-[11px] font-bold tracking-wide uppercase transition-colors cursor-pointer hover:opacity-60 ${
                  f === filter
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      >
        <div className="space-y-4">
          {ORDERS.map((o) => {
            const s = STATUS[o.status];
            return (
              <article
                key={o.id}
                className="rounded-2xl border-2 border-border p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-secondary">
                      <Package className="size-4" />
                    </span>
                    <div>
                      <p className="font-extrabold">შეკვეთა {o.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {o.date} · {o.delivery}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${s.chip}`}
                  >
                    <s.Icon className="size-3" /> {s.label}
                  </span>
                </div>

                <ul className="mt-4 divide-y rounded-xl bg-secondary/40">
                  {o.items.map((it) => (
                    <li key={it.title + it.color} className="flex items-center gap-4 p-3">
                      <Placeholder className="size-14 shrink-0 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{it.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {it.color} · რაოდენობა {it.qty}
                        </p>
                      </div>
                      <p className="text-sm font-extrabold">{it.price}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      პროდუქტები: <span className="font-bold text-foreground">{o.sum}</span>
                    </p>
                    <p>
                      მიწოდება:{" "}
                      <span className="font-bold text-foreground">{o.deliveryCost}</span>
                    </p>
                    <p className="text-base font-extrabold text-foreground">
                      ჯამში: {o.total}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {o.status !== "cancelled" && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-2 text-[11px] font-bold tracking-wide text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
                      >
                        <RotateCcw className="size-3.5 " /> გამეორება
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 cursor-pointer"
                    >
                      დეტალები <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                {(o.status === "processing" || o.status === "shipped") && (
                  <Timeline status={o.status} />
                )}
              </article>
            );
          })}
        </div>
      </Panel>

      <Panel title="დახმარება შეკვეთებთან">
        <p className="max-w-prose text-sm text-muted-foreground">
          შეკვეთის გაუქმება შესაძლებელია მხოლოდ დამუშავების ეტაპზე. გაგზავნილ შეკვეთას
          იღებთ მიწოდებისას, ხოლო მიღებულ პროდუქტს ანაცვლებთ 14 დღის ფარგლებში.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PrimaryBtn >დაგვიკავშირდით</PrimaryBtn>
          <OutlineBtn > დაბრუნების პირობები</OutlineBtn>
        </div>
      </Panel>
    </>
  );
}
