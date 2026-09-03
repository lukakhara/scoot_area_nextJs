import { useState } from "react";
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
import { Placeholder } from "./Placeholder";



const CANDIDATES = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  title: "Ninebot by Segway - F30 Plus",
  color: "ფერი: შავი",
  price: "750.00₾",
}));

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

export default function ComparePage() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="min-h-screen bg-background">
    

      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
        <h1 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
          შეადარე სასურველი პროდუქტები
        </h1>

        {/* Selection list */}
        <section className="mt-6">
          <div className="hidden grid-cols-[minmax(0,1fr)_140px_40px] items-center gap-4 border-b pb-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase sm:grid">
            <span>პროდუქტი</span>
            <span>ფასი</span>
            <span />
          </div>

          <ul>
            {CANDIDATES.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 border-b py-4 sm:grid-cols-[minmax(0,1fr)_140px_40px]"
              >
                <div className="flex min-w-0 items-center gap-4 sm:col-span-1">
                  <Placeholder className="size-16 shrink-0 rounded-xl" label="scooter" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase">{item.title}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{item.color}</p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-muted-foreground">{item.price}</span>

                <button
                  aria-label="არჩევა"
                  aria-pressed={selected === item.id}
                  onClick={() => setSelected(item.id)}
                  className={`justify-self-end flex size-4 items-center justify-center rounded-full border transition-colors ${
                    selected === item.id ? "border-sale bg-sale" : "border-border"
                  }`}
                />
              </li>
            ))}
          </ul>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary">
            <Plus className="size-4" /> შედარება
          </button>
        </section>

        {/* Comparison table */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            შეადარე სასურველი პროდუქტები
          </h2>

          <div className="mt-6 overflow-x-auto rounded-2xl border">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[minmax(180px,1fr)_repeat(2,minmax(150px,1fr))_120px] items-center gap-4 border-b p-5">
                <span className="text-sm font-bold uppercase">მახასიათებლები</span>
                {[0, 1].map((i) => (
                  <div key={i} className="flex min-w-0 items-center gap-3">
                    <Placeholder className="size-12 shrink-0 rounded-lg" label="scooter" />
                    <div className="min-w-0">
                      <p className="text-[11px] leading-tight font-bold uppercase">
                        Ninebot by Segway - F30 Plus
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">ფერი: შავი</p>
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
                  className="grid grid-cols-[minmax(180px,1fr)_repeat(2,minmax(150px,1fr))_120px] items-center gap-4 border-b px-5 py-3.5 last:border-b-0"
                >
                  <span className="flex min-w-0 items-center gap-2.5 text-xs text-muted-foreground">
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{label}</span>
                  </span>
                  <span className="text-sm font-bold">125 კუბი</span>
                  <span className="text-sm font-bold">125 კუბი</span>
                  <span />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-[11px] text-muted-foreground sm:hidden">
            ცხრილის სანახავად გადაასრიალე გვერდულად
          </p>
        </section>
      </main>

    </div>
  );
}
