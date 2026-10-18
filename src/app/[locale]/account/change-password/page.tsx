
import { LogOut, Monitor, ShieldCheck, Smartphone } from "lucide-react";
import { Field, OutlineBtn, Panel, PrimaryBtn, accountHead } from "@/components/auth/AccountUi";



const SESSIONS = [
  { Icon: Monitor, device: "Chrome · Windows", place: "თბილისი", time: "ახლა აქტიური", current: true },
  { Icon: Smartphone, device: "Safari · iPhone", place: "თბილისი", time: "2 საათის წინ", current: false },
  { Icon: Smartphone, device: "Chrome · Android", place: "ბათუმი", time: "3 დღის წინ", current: false },
];

export default function page() {
  return (
    <>
      <Panel title="პაროლის შეცვლა">
        <div className="grid max-w-xl gap-5">
          <Field label="მიმდინარე პაროლი" type="password" placeholder="••••••••" />
          <Field label="ახალი პაროლი" type="password" placeholder="მინიმუმ 8 სიმბოლო" />
          <div className="flex gap-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-sale" />
            <span className="h-1.5 flex-1 rounded-full bg-sale" />
            <span className="h-1.5 flex-1 rounded-full bg-primary" />
            <span className="h-1.5 flex-1 rounded-full bg-secondary" />
          </div>
          <Field label="გაიმეორეთ ახალი პაროლი" type="password" placeholder="••••••••" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryBtn>პაროლის განახლება</PrimaryBtn>
          <OutlineBtn>გაუქმება</OutlineBtn>
        </div>
      </Panel>
      <Panel
        title="აქტიური სესიები"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border-2 border-destructive px-5 py-2.5 text-xs font-bold tracking-wide text-destructive uppercase transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="size-3.5" /> ყველა მოწყობილობიდან გასვლა
          </button>
        }
      >
        <ul className="divide-y">
          {SESSIONS.map((s) => (
            <li key={s.device} className="flex flex-wrap items-center gap-4 py-4">
              <span className="grid size-11 place-items-center rounded-full bg-secondary">
                <s.Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{s.device}</p>
                <p className="text-xs text-muted-foreground">{s.place} · {s.time}</p>
              </div>
              {s.current ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-sale px-3 py-1 text-[10px] font-bold text-primary-foreground uppercase">
                  <ShieldCheck className="size-3" /> ეს მოწყობილობა
                </span>
              ) : (
                <button type="button" className="text-xs font-bold text-primary uppercase hover:underline">
                  გასვლა
                </button>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
