'use client'
import { useState } from "react";
import { ChevronUp } from "lucide-react";

export type Group = {
  title: string;
  type: "checkbox" | "radio";
  options: string[];
};

export const ACCESSORY_GROUPS: Group[] = [
  { title: "ბრენდი", type: "radio", options: ["Ninebot", "Kukirin", "Xiaomi", "Segway"] },
  {
    title: "კატეგორია",
    type: "radio",
    options: ["ჩაფხუტები", "ხელთათმანები", "ჟილეტები", "საკეტები", "ჩანთები", "სათვალეები"],
  },
  { title: "ზომა", type: "radio", options: ["125", "200", "250", "300"] },
  {
    title: "გამოშვების თარიღი",
    type: "radio",
    options: ["2020", "2021", "2022", "2023", "2024", "2025"],
  },
  { title: "სქესი", type: "radio", options: ["მდედრობითი", "მამრობითი", "უნისექსი"] },
];

export const PART_GROUPS: Group[] = [
  { title: "ბრენდი", type: "radio", options: ["Ninebot", "Kukirin", "Ninebot", "Kukirin"] },
  {
    title: "კატეგორია",
    type: "radio",
    options: Array.from({ length: 8 }, () => "lorem ipsum"),
  },
];



const GROUPS: Group[] = [

  { title: "ბრენდი", type: "checkbox", options: ["Ninebot", "Kukirin", "Xiaomi", "Segway"] },
  { title: "ძრავის სიმძლავრე", type: "radio", options: ["125", "200", "250", "300"] },
  {
    title: "გამოშვების თარიღი",
    type: "radio",
    options: ["2020", "2021", "2022", "2023", "2024", "2025"],
  },
  {
    title: "დატენვის დრო",
    type: "radio",
    options: ["90წთ", "120წთ", "150წთ", "180წთ", "200წთ", "220წთ", "320წთ"],
  },
  {
    title: "წონა",
    type: "radio",
    options: ["30კგ", "40კგ", "50კგ", "60კგ", "70კგ", "80კ", "90კ", "100კ", "110კ", "120კ", "130კ"],
  },
];

function FilterGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl bg-[#F5F5F5] text-[#212121] p-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 border-b-[0.5px] border-[#606060] pb-4 text-left text-base font-normal uppercase text-[20px] text-[#212121] "
      >
        {group.title}
        <ChevronUp className={`size-4 transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
      {open && (
        <ul className="mt-4 space-y-3 text-[18px]">
          {group.options.map((opt, i) => (
            <li key={`${opt}-${i}`}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type={group.type}
                  name={group.title}
                  className={`size-4 shrink-0 appearance-none border border-muted-foreground/60 ${
                    group.type === "radio" ? "rounded-full" : "rounded-[3px]"
                  } checked:border-primary checked:bg-primary`}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FilterPanel({ groups = GROUPS }: { groups?: Group[] }) {
  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <FilterGroup key={g.title} group={g} />
      ))}
    </div>
  );
}