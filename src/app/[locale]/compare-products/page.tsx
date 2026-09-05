import React from "react";
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
} from "lucide-react";
import { Placeholder } from "@/components/Placeholder";

const SPEC_ROWS = [
  { Icon: Repeat, label: "ძრავი" },
  { Icon: Gauge, label: "სიჩქარე" },
  { Icon: RouteIcon, label: "მაქსიმალური მანძილი" },
  { Icon: Weight, label: "წონა" },
  { Icon: CalendarDays, label: "გამოშვების თარიღი" },
  { Icon: CircleCheck, label: "გარანტია" },
  { Icon: Move3d, label: "აღმართი" },
  { Icon: Plug, label: "დატენვის დრო" },
  { Icon: Users, label: "მგზავრის დასაშვები წონა" },
  { Icon: ShieldCheck, label: "მგზავრის რეკომენდირებული წონა" },
  { Icon: Bike, label: "ძრავების რაოდენობა" },
  { Icon: Layers, label: "ბორბლის ზომა" },
  { Icon: Ruler, label: "წამყვანი თვალი" },
  { Icon: Battery, label: "ბატარეა" },
  { Icon: Timer, label: "ამორტიზაცია" },
  { Icon: Zap, label: "მოძრაობის სანიშნაცმდეგა სისტემა" },
  { Icon: Cpu, label: "მუხრუჭი" },
  { Icon: ShieldCheck, label: "კავშირი" },
  { Icon: Plug, label: "IP" },
];

const page = () => {
  return (
    <div>
      {/* Comparison table */}
      <section className="px-4 pt-10 pb-20 gap-2 md:pt-25  md:pb-30 md:px-18 flex flex-col md:gap-8 ">
        <h2 className="text-[24px] leading-[100%]  font-extrabold tracking-tight uppercase sm:text-3xl text-[#212121]">
          შეადარე სასურველი პროდუქტები
        </h2>

        <div className="mt-6 overflow-x-auto rounded-2xl border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[minmax(60px,1fr)_repeat(2,minmax(120px,1fr))_190px] rid-cols-[minmax(150px,1fr)_repeat(2,minmax(120px,1fr))_90px] items-center md:gap-4 border-b p-5">
              <span className="text-sm font-bold uppercase">
                მახასიათებლები
              </span>
              {[0, 1].map((i) => (
                <div key={i} className="flex min-w-0 items-center gap-3">
                  <Placeholder
                    className="size-12 shrink-0 rounded-lg"
                    label="scooter"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] leading-tight font-bold uppercase">
                      Ninebot by Segway - F30 Plus
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      ფერი: შავი
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-end gap-2">
                <button
                  aria-label="დამატება"
                  className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="size-4" />
                </button>
                <button
                  aria-label="წაშლა"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {SPEC_ROWS.map(({ Icon, label }, i) => (
              <div
                key={`${label}-${i}`}
                className="grid grid-cols-[minmax(60px,1fr)_repeat(2,minmax(120px,1fr))_190px] md:grid-cols-[minmax(180px,1fr)_repeat(2,minmax(150px,1fr))_120px]  items-center gap-4 border-b px-5 py-3.5 last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-2.5 text-xs text-muted-foreground">
                  <Icon className="size-[13.7] md:size-4 shrink-0" />
                  <span className="truncate text-[12.45px]">{label}</span>
                </span>
                <span className="text-[12.45] font-bold">125 კუბი</span>
                <span className="text-[12.45] font-bold">125 კუბი</span>
                <span />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground sm:hidden">
          ცხრილის სანახავად გადაასრიალე გვერდულად
        </p>
      </section>
    </div>
  );
};

export default page;
