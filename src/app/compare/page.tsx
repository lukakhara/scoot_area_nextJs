"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";

const CANDIDATES = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  title: "Ninebot by Segway - F30 Plus",
  color: "ფერი: შავი",
  price: "750.00₾",
}));

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
                  <Placeholder
                    className="size-16 shrink-0 rounded-xl"
                    label="scooter"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {item.color}
                    </p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-muted-foreground">
                  {item.price}
                </span>

                <button
                  aria-label="არჩევა"
                  aria-pressed={selected === item.id}
                  onClick={() => setSelected(item.id)}
                  className={`justify-self-end flex size-4 items-center justify-center rounded-full border transition-colors ${
                    selected === item.id
                      ? "border-sale bg-sale"
                      : "border-border"
                  }`}
                />
              </li>
            ))}
          </ul>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary">
            <Plus className="size-4" /> შედარება
          </button>
        </section>
      </main>
    </div>
  );
}
