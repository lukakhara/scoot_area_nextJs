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

type Scooter = {
  id: string;
  name: string;
  brand: string;
  images: string[];
  engine: string;
  maxSpeed: number;
  maxRange: number;
  weight: number;
  releaseDate: string;
  warranty: string;
  inclineAngle: string;
  chargingTime: string;
  maxRiderWeight: number;
  recommendedRiderWeight: number;
  motorCount: number;
  wheelSize: string;
  driveType: string;
  battery: string;
  suspension: string;
  antiSlipSystem: boolean;
  brakeType: string;
  connectivity: string;
  ipRating: string;
};


import { getLocale, getTranslations } from "next-intl/server";

type TFn = Awaited<ReturnType<typeof getTranslations>>;

const SPEC_ROWS: {
  Icon: LucideIcon;
  key: string;
  value: (s: Scooter, t: TFn, locale: string) => string;
}[] = [
{ Icon: Repeat, key: "engine", value: (s) => s.engine },
  { Icon: Gauge, key: "speed", value: (s, t) => `${s.maxSpeed} ${t("units.kmh")}` },
  { Icon: RouteIcon, key: "maxRange", value: (s, t) => `${s.maxRange} ${t("units.km")}` },
  { Icon: Weight, key: "weight", value: (s, t) => `${s.weight} ${t("units.kg")}` },
  {
    Icon: CalendarDays,
    key: "releaseDate",
    value: (s, _t, locale) =>
      new Date(s.releaseDate).toLocaleDateString(locale === "ka" ? "ka-GE" : "en-US", {
        year: "numeric",
        month: "long",
      }),
  },
  { Icon: CircleCheck, key: "warranty", value: (s) => s.warranty },
  { Icon: Move3d, key: "incline", value: (s) => s.inclineAngle },
  { Icon: Plug, key: "chargingTime", value: (s) => s.chargingTime },
  { Icon: Users, key: "maxRiderWeight", value: (s, t) => `${s.maxRiderWeight} ${t("units.kg")}` },
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

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("compare");
  const locale = await getLocale();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters/${id}`);
  const { data: scooterData }: { data: Scooter } = await res.json();

  // first column = current scooter, second = empty slot for comparison
  const columns: (Scooter | null)[] = [scooterData, null];

  return (
    <div>
      {/* Comparison table */}
      <section className="px-4 pt-10 pb-20 gap-2 md:pt-25 md:pb-30 md:px-18 flex flex-col md:gap-8">
        <h2 className="text-[24px] leading-[100%] font-extrabold tracking-tight uppercase sm:text-3xl text-[#212121]">
          {t("title")}
        </h2>

        <div className="mt-6 overflow-x-auto rounded-2xl border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[minmax(60px,1fr)_repeat(2,minmax(120px,1fr))_190px] md:grid-cols-[minmax(180px,1fr)_repeat(2,minmax(150px,1fr))_120px] items-center md:gap-4 border-b p-5">
              <span className="text-sm font-bold uppercase">
                 {t("specs")}
              </span>

              {columns.map((s, i) =>
                s ? (
                  <div key={s.id} className="flex min-w-0 items-center gap-3">
                    {s.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.images[0]}
                        alt={s.name}
                        className="size-12 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <Placeholder
                        className="size-12 shrink-0 rounded-lg"
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
                  </div>
                ) : (
                  <div key={`empty-${i}`} className="flex items-center gap-3">
                    <Placeholder
                      className="size-12 shrink-0 rounded-lg"
                      label="+"
                    />
                    <p className="text-[11px] text-muted-foreground">
                        {t("selectScooter")}
                    </p>
                  </div>
                )
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  aria-label= {t("add")}
                  className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="size-4" />
                </button>
                <button
                  aria-label={t("remove")}
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {SPEC_ROWS.map(({ Icon, key, value }, i) => (
              <div
                key={`${key}-${i}`}
                className="grid grid-cols-[minmax(60px,1fr)_repeat(2,minmax(120px,1fr))_190px] md:grid-cols-[minmax(180px,1fr)_repeat(2,minmax(150px,1fr))_120px] items-center gap-4 border-b px-5 py-3.5 last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-2.5 text-xs text-muted-foreground">
                  <Icon className="size-[13.7px] md:size-4 shrink-0" />
                  <span className="truncate text-[12.45px]">{t(`spec.${key}`)}</span>
                </span>

                {columns.map((s, c) => (
                  <span key={c} className="text-[12.45px] font-bold">
                    {s ? value(s,t,locale) : "—"}
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
    </div>
  );
}