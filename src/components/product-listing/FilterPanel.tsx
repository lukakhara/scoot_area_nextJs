"use client";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

export type Group = {
  titleKey: string;
  type: "checkbox" | "radio";
  optionKeys: string[];
  optionNamespace?: "categoryOptions" | "genderOptions"; // omit if options are raw (brands, numbers)
};

export const ACCESSORY_GROUPS: Group[] = [
  {
    titleKey: "brand",
    type: "radio",
    optionKeys: ["Ninebot", "Kukirin", "Xiaomi", "Segway"],
  },
  {
    titleKey: "category",
    type: "radio",
    optionKeys: ["helmets", "gloves", "vests", "locks", "bags", "glasses"],
    optionNamespace: "categoryOptions",
  },
  { titleKey: "size", type: "radio", optionKeys: ["125", "200", "250", "300"] },
  {
    titleKey: "releaseDate",
    type: "radio",
    optionKeys: ["2020", "2021", "2022", "2023", "2024", "2025"],
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
    optionKeys: ["Ninebot", "Kukirin", "Xiaomi", "Segway"],
  },
  {
    titleKey: "drivetrainPower",
    type: "checkbox",
    optionKeys: ["motors", "batteries", "chargers", "controllers", "throttles"],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "wheelsTires",
    type: "checkbox",
    optionKeys: ["tires", "innerTubes", "rimsHubs", "bearings"],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "brakes",
    type: "checkbox",
    optionKeys: ["brakePads", "brakeDiscs", "brakeLevers", "brakeCables"],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "frameBody",
    type: "checkbox",
    optionKeys: ["foldingMechanisms", "kickstands", "fenders", "deckGrips"],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "electricalLighting",
    type: "checkbox",
    optionKeys: [
      "headlightsTaillights",
      "turnSignals",
      "wiringHarnesses",
      "displays",
      "hornsBells",
    ],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "steeringHandlebars",
    type: "checkbox",
    optionKeys: ["handlebarGrips", "stems", "handlebarClamps"],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "suspension",
    type: "checkbox",
    optionKeys: ["shocks", "suspensionSprings"],
    optionNamespace: "categoryOptions",
  },
  {
    titleKey: "fastenersSmallParts",
    type: "checkbox",
    optionKeys: ["screwsBolts", "rubberGrommets"],
    optionNamespace: "categoryOptions",
  },
];

const GROUPS: Group[] = [
  {
    titleKey: "brand",
    type: "checkbox",
    optionKeys: ["Ninebot", "Kukirin", "Xiaomi", "Segway"],
  },
  {
    titleKey: "enginePower",
    type: "radio",
    optionKeys: ["125", "200", "250", "300"],
  },
  {
    titleKey: "releaseDate",
    type: "radio",
    optionKeys: ["2020", "2021", "2022", "2023", "2024", "2025"],
  },
  {
    titleKey: "chargingTime",
    type: "radio",
    optionKeys: ["90", "120", "150", "180", "200", "220", "320"],
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
  },
];

function FilterGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(true);
  const t = useTranslations("FilterPanel");

  return (
    <div className="rounded-2xl bg-[#F5F5F5] text-[#212121] p-5 ">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 border-b-[0.5px] border-[#606060] pb-4 text-left text-base font-normal uppercase text-[20px] text-[#212121] "
      >
        {t(`titles.${group.titleKey}`)}
        <ChevronUp
          className={`size-4 transition-transform ${open ? "" : "rotate-180"}`}
        />
      </button>
      {open && (
        <ul className="mt-4 space-y-3 text-[18px]">
          {group.optionKeys.map((opt, i) => (
            <li key={`${opt}-${i}`}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type={group.type}
                  name={group.titleKey}
                  className={`size-4 shrink-0 appearance-none border border-muted-foreground/60 ${
                    group.type === "radio" ? "rounded-full" : "rounded-[3px]"
                  } checked:border-primary checked:bg-primary`}
                />
                {group.optionNamespace
                  ? t(`${group.optionNamespace}.${opt}`)
                  : opt}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FilterPanel({ groups = GROUPS }: { groups?: Group[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = () => setFiltersOpen((v) => !v);
  return (
    <aside
      className={`${filtersOpen ? "block" : "hidden"} lg:flex  flex-col gap-4`}
    >
      {groups.map((g) => (
        <FilterGroup key={g.titleKey} group={g} />
      ))}
    </aside>
  );
}
