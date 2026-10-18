
import { Bike, Plus, Star, Trash2, Wrench, HardHat } from "lucide-react";
import { Field, Panel, PrimaryBtn, OutlineBtn, accountHead } from "@/components/auth/AccountUi";
import { Placeholder } from "@/components/ui/Placeholder";
import Link from "next/link";

const SCOOTERS = [
  { name: "Ninebot F30 Plus", year: "2023", km: "1 240 კმ", primary: true },
  { name: "Xiaomi Pro 2", year: "2021", km: "4 870 კმ", primary: false },
];



export default function page() {
  return (
    <>
      <Panel title="ჩემი გარაჟი" action={<PrimaryBtn><Plus className="size-4" /> სკუტერის დამატება</PrimaryBtn>}>
        <div className="grid gap-4 md:grid-cols-2">
          {SCOOTERS.map((s) => (
            <div
              key={s.name}
              className={`overflow-hidden rounded-2xl border-2 ${s.primary ? "border-sale" : "border-border"}`}
            >
              <div className="relative h-40">
                <Placeholder className="h-full w-full" />
                {s.primary && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-sale px-3 py-1 text-[10px] font-bold text-primary-foreground uppercase">
                    <Star className="size-3" /> მთავარი
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-lg font-extrabold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.year} · გარბენი {s.km}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href="/parts" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-2.5 text-[11px] font-bold text-primary-foreground uppercase hover:bg-primary/90">
                    <Wrench className="size-3.5" /> ნაწილები
                  </Link>
                  <Link href="/equiment-accessories" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-3 py-2 text-[11px] font-bold text-primary uppercase hover:bg-primary hover:text-primary-foreground">
                    <HardHat className="size-3.5" /> აქსესუარები
                  </Link>
                </div>
                <div className="mt-3 flex justify-between text-xs font-bold uppercase">
                  {!s.primary ? <button type="button" className="text-sale hover:underline">მთავრად დაყენება</button> : <span />}
                  <button type="button" className="inline-flex items-center gap-1 text-destructive hover:underline">
                    <Trash2 className="size-3.5" /> წაშლა
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="სკუტერის დამატება">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="ბრენდი" placeholder="Ninebot" />
          <Field label="მოდელი" placeholder="F30 Plus" />
          <Field label="წელი" placeholder="2024" />
          <Field label="გარბენი (კმ)" placeholder="0" />
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Bike className="size-4 text-sale" /> ნაწილები და აქსესუარები გაიფილტრება თქვენი სკუტერის მიხედვით.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryBtn>შენახვა</PrimaryBtn>
          <OutlineBtn>გაუქმება</OutlineBtn>
        </div>
      </Panel>
    </>
  );
}
