"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilterStore } from "@/store/filterStore";

export type Group = {
  titleKey: string;
  type: "checkbox" | "radio";
  optionKeys: string[];
  optionNamespace?: "categoryOptions" | "genderOptions"; // omit if options are raw (brands, numbers)
  unit?: string;
};

export const ACCESSORY_GROUPS: Group[] = [
  {
    titleKey: "brand",
    type: "radio",
    optionKeys: ["GUB", "Voltz", "Kryptonite", "Scorpion", "Segway"],
  },
  {
    titleKey: "category",
    type: "radio",
    optionKeys: [
      "SAFETY_GEAR",
      "PROTECTION_MAINTENANCE",
      "STORAGE_CARRYING",
      "LIGHTING",
      "COMFORT_UPGRADES",
      "CHARGING_POWER",
    ],
    optionNamespace: "categoryOptions",
  },
  { titleKey: "size", type: "radio", optionKeys: ["125", "200", "250", "300"] },
  {
    titleKey: "releaseDate",
    type: "radio",
    optionKeys: ["2020", "2021", "2022", "2023", "2024", "2025"],
    unit: "y",
  },
  {
    titleKey: "gender",
    type: "radio",
    optionKeys: ["female", "male", "unisex"],
    optionNamespace: "genderOptions",
  },
];

export const PART_GROUPS: Group[] = [
  {
    titleKey: "brand",
    type: "radio",
    optionKeys: ["CST", "Voltz", "Segway-Ninebot", "Universal", "Dualtron"],
  },
  {
    titleKey: "category",
    type: "radio",
    optionKeys: [
      "BRAKE_PADS",
      "TIRES_TUBES",
      "MOTOR_PARTS",
      "BATTERY_CELLS",
      "WHEELS",
      "BEARINGS",
      "CABLES_WIRING",
      "CONTROLLER",
      "DISPLAY_PANEL",
      "SUSPENSION_PARTS",
      "SCREWS_BOLTS",
      "OTHER",
    ],
    optionNamespace: "categoryOptions",
  },
];

export const SCOOTER_GROUPS: Group[] = [
  {
    titleKey: "brand",
    type: "checkbox",
    optionKeys: ["Kaabo", "Inokim", "Xiaomi", "E-Twow", "Apollo"],
  },
  {
    titleKey: "enginePower",
    type: "radio",
    optionKeys: ["125", "200", "250", "300"],
    unit: "w",
  },
  {
    titleKey: "maxSpeed",
    type: "radio",
    optionKeys: ["125", "200", "250", "300"],
    unit: "kmH",
  },
  {
    titleKey: "releaseDate",
    type: "radio",
    optionKeys: ["2020", "2021", "2022", "2023", "2024", "2025"],
    unit: "y",
  },
  {
    titleKey: "chargingTime",
    type: "radio",
    optionKeys: ["90", "120", "150", "180", "200", "220", "320"],
    unit: "h",
  },
  {
    titleKey: "weight",
    type: "radio",
    optionKeys: [
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "100",
      "110",
      "120",
      "130",
    ],
    unit: "kg",
  },
];

const DEBOUNCE_MS = 400;

function FilterGroup({
  group,
  params,
  onToggle,
}: {
  group: Group;
  params: string;
  onToggle: (
    property: string,
    value: string,
    type: "checkbox" | "radio",
  ) => void;
}) {
  const [open, setOpen] = useState(true);
  const t = useTranslations("FilterPanel");

  const currentValues = (new URLSearchParams(params).get(group.titleKey) ?? "")
    .split(",")
    .filter(Boolean);

  return (
    <div className="rounded-2xl bg-[#F5F5F5] text-[#212121]  p-4 ">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 border-b-[0.5px] border-[#606060] pb-2 text-left text-base font-normal uppercase text-[20px] text-[#212121] "
      >
        {t(`titles.${group.titleKey}`)}
        <ChevronUp
          className={`size-4 transition-transform ${open ? "" : "rotate-180"}`}
        />
      </button>
      {open && (
        <ul className="mt-4 space-y-3 text-[18px] ">
          {group.optionKeys.map((opt, i) => {
            const isChecked = currentValues.includes(opt); // ← per-option, inside map

            return (
              <li key={`${opt}-${i}`} className=" shadow-4xl">
                <label className="flex cursor-pointer items-center gap-3 hover:text-orange-300 ">
                  <input
                    type={group.type}
                    name={group.titleKey}
                    checked={currentValues.includes(opt)}
                    onChange={() => {}}
                    onClick={() => onToggle(group.titleKey, opt, group.type)}
                    className={`size-4 shrink-0 appearance-none border border-muted-foreground/60  hover:opacity-90 hover:cursor-pointer  ${
                      group.type === "radio" ? "rounded-full" : "rounded-[3px] "
                    } checked:border-primary checked:bg-primary`}
                  />
                  {group.optionNamespace
                    ? group.unit
                      ? `${t(`${group.optionNamespace}.${opt}`)} ${t(`units.${group.unit}`)}`
                      : t(`${group.optionNamespace}.${opt}`)
                    : group.unit
                      ? `${opt} ${t(`units.${group.unit}`)}`
                      : opt}
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function FilterPanel({ groups }: { groups: Group[] }) {
  const filtersOpen = useFilterStore((s) => s.filtersOpen);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlString = searchParams.toString();
  const [params, setParams] = useState(urlString);
  const paramsRef = useRef(urlString);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // sync from URL (back/forward, clear filters) unless a push is pending
  useEffect(() => {
    if (timer.current) return;
    paramsRef.current = urlString;
    setParams(urlString);
  }, [urlString]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleToggle = useCallback(
    (property: string, value: string, type: "checkbox" | "radio") => {
      const next = new URLSearchParams(paramsRef.current);
      const existing = next.get(property);

      if (type === "radio") {
        if (existing === value) next.delete(property);
        else next.set(property, value);
      } else {
        const values = existing ? existing.split(",") : [];
        if (values.includes(value)) {
          const filtered = values.filter((v) => v !== value);
          if (filtered.length > 0) next.set(property, filtered.join(","));
          else next.delete(property);
        } else {
          next.set(property, [...values, value].join(","));
        }
      }

      next.set("page", "1");
      const nextString = next.toString();

      // update UI immediately
      paramsRef.current = nextString;
      setParams(nextString);

      // debounce the navigation
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        timer.current = null;
        router.push(`${pathname}?${paramsRef.current}`, { scroll: false });
      }, DEBOUNCE_MS);
    },
    [pathname, router],
  );

  return (
    <aside
      className={`${filtersOpen ? "flex" : "hidden"} lg:flex flex-col gap-4`}
    >
      {groups.map((g) => (
        <FilterGroup
          key={g.titleKey}
          group={g}
          params={params}
          onToggle={handleToggle}
        />
      ))}
    </aside>
  );
}
