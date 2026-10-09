"use client";
import {
  Battery,
  Bike,
  CalendarDays,
  CircleCheck,
  Cpu,
  Gauge,
  Layers,
  Move3d,
  Plug,
  Plus,
  Repeat,
  Route as RouteIcon,
  Ruler,
  ShieldCheck,
  Timer,
  Trash2,
  Users,
  Weight,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { useState } from "react";

import { useTranslations, useLocale } from "next-intl";
import ComparePopover, { CompareProduct } from "@/components/ComparePopover";
import { Scooter } from "@/types/product";

type TFn = Awaited<ReturnType<typeof useTranslations>>;

const SPEC_ROWS: {
  Icon: LucideIcon;
  key: string;
  value: (s: Scooter, t: TFn, locale: string) => string;
}[] = [
  { Icon: Repeat, key: "engine", value: (s) => s.engine },
  {
    Icon: Gauge,
    key: "speed",
    value: (s, t) => `${s.maxSpeed} ${t("units.kmh")}`,
  },
  {
    Icon: RouteIcon,
    key: "maxRange",
    value: (s, t) => `${s.maxRange} ${t("units.km")}`,
  },
  {
    Icon: Weight,
    key: "weight",
    value: (s, t) => `${s.weight} ${t("units.kg")}`,
  },
  {
    Icon: CalendarDays,
    key: "releaseDate",
    value: (s, _t, locale) =>
      new Date(s.releaseDate).toLocaleDateString(
        locale === "ka" ? "ka-GE" : "en-US",
        {
          year: "numeric",
          month: "long",
        },
      ),
  },
  { Icon: CircleCheck, key: "warranty", value: (s) => s.warranty },
  { Icon: Move3d, key: "incline", value: (s) => s.inclineAngle },
  { Icon: Plug, key: "chargingTime", value: (s) => s.chargingTime },
  {
    Icon: Users,
    key: "maxRiderWeight",
    value: (s, t) => `${s.maxRiderWeight} ${t("units.kg")}`,
  },
  {
    Icon: ShieldCheck,
    key: "recommendedRiderWeight",
    value: (s, t) => `${s.recommendedRiderWeight} ${t("units.kg")}`,
  },
  { Icon: Bike, key: "motorCount", value: (s) => String(s.motorCount) },
  { Icon: Layers, key: "wheelSize", value: (s) => s.wheelSize },
  {
    Icon: Ruler,
    key: "driveType",
    value: (s, t) =>
      ["front", "rear", "both"].includes(s.driveType)
        ? t(`driveType.${s.driveType}`)
        : s.driveType,
  },
  { Icon: Battery, key: "battery", value: (s) => s.battery },
  { Icon: Timer, key: "suspension", value: (s) => s.suspension },
  {
    Icon: Zap,
    key: "antiSlip",
    value: (s, t) => (s.antiSlipSystem ? t("yes") : t("no")),
  },
  { Icon: Cpu, key: "brakeType", value: (s) => s.brakeType },
  { Icon: ShieldCheck, key: "connectivity", value: (s) => s.connectivity },
  { Icon: Plug, key: "ipRating", value: (s) => s.ipRating },
];

export default function CompareClient({
  scooter,
  allScooters,
}: {
  scooter: Scooter;
  allScooters: Scooter[];
}) {
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  console.log(selectedIds);

  const t = useTranslations("compare");
  const locale = useLocale();

  const MAX_COLUMNS = 4;

  const toggleProduct = (id: string) =>
    setSelectedIds((cur) =>
      cur.includes(id)
        ? cur.filter((i) => i !== id)
        : cur.length >= MAX_COLUMNS - 1 // current scooter already takes 1 slot
          ? cur
          : [...cur, id],
    );

  // keeps selection order, supports multiple selections
  const selectedScooters = selectedIds
    .map((id) => allScooters.find((s) => s.id === id))
    .filter((s): s is Scooter => Boolean(s));

  const columns: (Scooter | null)[] = [scooter, ...selectedScooters];
  if (columns.length < MAX_COLUMNS) columns.push(null); // empty "add" slot

  const cols = columns.length;

  const GRID =
    "grid grid-cols-[minmax(60px,1fr)_repeat(var(--cols),minmax(120px,1fr))_190px] md:grid-cols-[minmax(180px,1fr)_repeat(var(--cols),minmax(150px,1fr))_120px] items-center";
  console.log("selectedIds", selectedIds);

  const removeProduct = (id: string) =>
    setSelectedIds((cur) => cur.filter((i) => i !== id));

  // popup list: everything except the scooter already shown
  const popupProducts: CompareProduct[] = allScooters
    .filter((s) => s.id !== scooter.id)
    .map((s) => ({
      id: s.id,
      name: s.name,
      price: `${s.discountPrice ?? s.price}₾`,
      image: s.images?.[0] ?? "",
    }));

    const maxReached = selectedIds.length >= MAX_COLUMNS - 1;

  return (
    <div className="">
      {/* Comparison table */}
      <section className="px-4 pt-10 pb-20 gap-2 md:pt-25 md:pb-30 md:px-18 flex flex-col md:gap-8">
        <div className="flex justify-between ">
          <h2 className="text-[24px] leading-[100%] font-extrabold tracking-tight uppercase sm:text-3xl text-[#212121]">
            {" "}
            {t("title")}
          </h2>
          <div className="flex items-center justify-end gap-2 ">
            <button
              aria-label={t("add")}
              className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => setOpenPopover(true)}
            >
              <Plus className="size-6" />
            </button>
            <button
              aria-label={t("remove")}
              className="flex size-12 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary cursor-pointer"
            >
              <Trash2 className="size-6" />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border">
          <div
            style={
              {
                "--cols": cols,
                minWidth: 300 + cols * 170,
              } as React.CSSProperties
            }
          >
            <div className={`${GRID} md:gap-4 border-b p-5`}>
              <span className="text-sm font-bold uppercase">{t("specs")}</span>

              {columns.map((s, i) =>
                s ? (
                  <div key={s.id} className="flex min-w-0 items-center gap-3  ">
                    {s.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <>
                        <img
                          src={s.images[0]}
                          alt={s.name}
                          className="size-12 shrink-0 rounded-lg object-cover "
                        />
                      </>
                    ) : (
                      <Placeholder
                        className="size-12 shrink-0 rounded-lg "
                        label="scooter"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-[11px] leading-tight font-bold uppercase">
                        {s.name}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {s.brand}
                      </p>
                    </div>
                    {s.id !== scooter.id && (
                      <button
                        aria-label={t("remove")}
                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary cursor-pointer"
                        onClick={() => removeProduct(s.id)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div key={`empty-${i}`} className="flex items-center gap-3 ">
                    <button
                      className="cursor-pointer"
                      onClick={() => setOpenPopover(true)}
                    >
                      <Placeholder
                        className="size-12 shrink-0 rounded-lg "
                        label="+"
                      />
                    </button>
                    <p className="text-[11px] text-muted-foreground ">
                      {t("selectScooter")}
                    </p>
                  </div>
                ),
              )}
            </div>

            {SPEC_ROWS.map(({ Icon, key, value }, i) => (
              <div
                key={`${key}-${i}`}
                className={`${GRID} gap-4 border-b px-5 py-3.5 last:border-b-0`}
              >
                <span className="flex min-w-0 items-center gap-2.5 text-xs text-muted-foreground">
                  <Icon className="size-[13.7px] md:size-4 shrink-0" />
                  <span className="truncate text-[12.45px]">
                    {t(`spec.${key}`)}
                  </span>
                </span>

                {columns.map((s, c) => (
                  <span key={c} className="text-[12.45px] font-bold ">
                    {s ? value(s, t, locale) : "—"}
                  </span>
                ))}

                <span />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground sm:hidden">
          {t("swipeHint")}
        </p>
      </section>
      <div className=" ">
        <ComparePopover
          open={openPopover}
          onOpenChange={setOpenPopover}
          products={popupProducts}
          selected={selectedIds}
          onToggle={toggleProduct}
           maxReached={maxReached}
        />
      </div>
    </div>
  );
}
