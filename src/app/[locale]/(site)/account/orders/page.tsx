"use client";

import {
  Check,
  Hourglass,
  ChevronRight,
  Clock,
  Package,
  RotateCcw,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { OutlineBtn, Panel, PrimaryBtn } from "@/components/auth/AccountUi";
import { Placeholder } from "@/components/ui/Placeholder";
import { API_URL } from "@/lib/config";



type ApiStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "READY_FOR_PICKUP"
  | "DELIVERED"
  | "CANCELLED";

type ApiOrder = {
  id: string;
  status: ApiStatus;
  delivery: "DELIVERY" | "STORE_PICKUP";
  city: string | null;
  street: string | null;
  subtotal: string; // Prisma Decimal arrives as a string in JSON
  deliveryFee: string;
  totalPrice: string;
  createdAt: string;
  items: {
    id: string;
    productName: string;
    productImage: string | null;
    quantity: number;
    unitPrice: string;
  }[];
};

// labels now come from translations using the status key
const STATUS: Record<ApiStatus, { chip: string; Icon: typeof Clock }> = {
  PENDING: { chip: "bg-primary text-primary-foreground", Icon: Clock },
  PROCESSING: { chip: "bg-primary text-primary-foreground", Icon: Clock },
  SHIPPED: { chip: "bg-brand-ink text-primary-foreground", Icon: Truck },
  READY_FOR_PICKUP: {
    chip: "bg-brand-ink text-primary-foreground",
    Icon: Package,
  },
  DELIVERED: { chip: "bg-sale text-primary-foreground", Icon: Check },
  CANCELLED: {
    chip: "bg-destructive text-destructive-foreground",
    Icon: X,
  },
};

const FILTERS = [
  { id: "all", statuses: null },
  { id: "processing", statuses: ["PENDING", "PROCESSING"] },
  { id: "shipped", statuses: ["SHIPPED", "READY_FOR_PICKUP"] },
  { id: "delivered", statuses: ["DELIVERED"] },
  { id: "cancelled", statuses: ["CANCELLED"] },
] as const satisfies readonly {
  id: string;
  statuses: readonly ApiStatus[] | null;
}[];

type FilterId = (typeof FILTERS)[number]["id"];

const DELIVERY_STEPS = [
  { key: "processing", Icon: Hourglass },
  { key: "packing", Icon: Package },
  { key: "shipped", Icon: Truck },
  { key: "delivered", Icon: Check },
] as const;

const PICKUP_STEPS = [
  { key: "processing", Icon: Hourglass },
  { key: "packing", Icon: Package },
  { key: "ready", Icon: Package },
  { key: "handedOver", Icon: Check },
] as const;

const DELIVERY_PROGRESS: Partial<Record<ApiStatus, number>> = {
  PENDING: 0,
  PROCESSING: 1,
  SHIPPED: 2,
  DELIVERED: 3,
};

const PICKUP_PROGRESS: Partial<Record<ApiStatus, number>> = {
  PENDING: 0,
  PROCESSING: 1,
  READY_FOR_PICKUP: 2,
  DELIVERED: 3,
};

const formatPrice = (value: string | number) =>
  `${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}₾`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }); // dd.mm.yyyy

function Timeline({ order }: { order: ApiOrder }) {
  const t = useTranslations("Orders");
  const isPickup = order.delivery === "STORE_PICKUP";
  const steps = isPickup ? PICKUP_STEPS : DELIVERY_STEPS;
  const active =
    (isPickup ? PICKUP_PROGRESS : DELIVERY_PROGRESS)[order.status] ?? 0;

  return (
    <ol className="mt-5 flex items-start gap-1 border-t pt-5">
      {steps.map((step, i) => {
        const done = i <= active;
        return (
          <li
            key={step.key}
            className="flex flex-1 flex-col items-center text-center"
          >
            <span
              className={`grid size-8 place-items-center rounded-full ${
                done
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <step.Icon className="size-4" />
            </span>
            <span
              className={`mt-2 text-[10px] font-bold tracking-wide capitalize ${
                done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t(`steps.${step.key}`)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function Orders() {
  const t = useTranslations("Orders");
  const [filter, setFilter] = useState<FilterId>("all");
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_URL}/orders/me`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        setOrders(await res.json());
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(t("loadError"));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDelivery = (o: ApiOrder) =>
    o.delivery === "DELIVERY"
      ? t("deliveryService", { city: o.city ?? "", street: o.street ?? "" })
      : t("selfPickup");

  const activeStatuses: readonly ApiStatus[] | null | undefined =
    FILTERS.find((f) => f.id === filter)?.statuses;
  const visibleOrders = activeStatuses
    ? orders.filter((o) => activeStatuses.includes(o.status))
    : orders;

  return (
    <>
      <Panel
        title={t("title")}
        action={
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(({ id }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-[11px] font-bold tracking-wide capitalize transition-colors hover:opacity-60 ${
                  id === filter
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                {t(`filters.${id}`)}
              </button>
            ))}
          </div>
        }
      >
        {loading && (
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && !error && visibleOrders.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        )}

        <div className="space-y-4">
          {visibleOrders.map((o) => {
            const s = STATUS[o.status];
            const showTimeline =
              o.status !== "CANCELLED" && o.status !== "DELIVERED";

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
                      <p className="font-extrabold">
                        {t("orderNumber", {
                          id: o.id.slice(0, 8).toUpperCase(),
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(o.createdAt)} · {formatDelivery(o)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide capitalize ${s.chip}`}
                  >
                    <s.Icon className="size-3" /> {t(`status.${o.status}`)}
                  </span>
                </div>

                <ul className="mt-4 divide-y rounded-xl bg-secondary/40">
                  {o.items.map((it) => (
                    <li key={it.id} className="flex items-center gap-4 p-3">
                      {it.productImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={it.productImage}
                          alt={it.productName}
                          className="size-14 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <Placeholder className="size-14 shrink-0 rounded-lg" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          {it.productName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("quantity", { count: it.quantity })}
                        </p>
                      </div>
                      <p className="text-sm font-extrabold">
                        {formatPrice(it.unitPrice)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      {t("products")}{" "}
                      <span className="font-bold text-foreground">
                        {formatPrice(o.subtotal)}
                      </span>
                    </p>
                    <p>
                      {t("delivery")}{" "}
                      <span className="font-bold text-foreground">
                        {formatPrice(o.deliveryFee)}
                      </span>
                    </p>
                    <p className="text-base font-extrabold text-foreground">
                      {t("total", { price: formatPrice(o.totalPrice) })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {o.status !== "CANCELLED" && (
                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-primary px-4 py-2 text-[11px] font-bold tracking-wide text-primary capitalize transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <RotateCcw className="size-3.5" /> {t("repeat")}
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-bold tracking-wide text-primary-foreground capitalize transition-colors hover:bg-primary/90"
                    >
                      {t("details")} <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                {showTimeline && <Timeline order={o} />}
              </article>
            );
          })}
        </div>
      </Panel>

      <Panel title={t("help.title")}>
        <p className="max-w-prose text-sm text-muted-foreground">
          {t("help.text")}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PrimaryBtn>{t("help.contact")}</PrimaryBtn>
          <OutlineBtn>{t("help.returns")}</OutlineBtn>
        </div>
      </Panel>
    </>
  );
}