
import { Pencil } from "lucide-react";
import { Field, OutlineBtn, Panel, PrimaryBtn, accountHead } from "@/components/auth/AccountUi";


export default function PersonalInfo() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { n: "12", l: "შეკვეთა", c: "bg-primary" },
          { n: "3", l: "მისამართი", c: "bg-sale" },
          { n: "8", l: "ფავორიტი", c: "bg-brand-ink" },
        ].map((s) => (
          <div key={s.l} className={`${s.c} rounded-3xl p-5 text-primary-foreground`}>
            <p className="text-3xl font-extrabold">{s.n}</p>
            <p className="text-xs font-bold uppercase opacity-90">{s.l}</p>
          </div>
        ))}
      </div>
      <Panel title="პირადი ინფორმაცია" action={<OutlineBtn><Pencil className="size-3.5" /> რედაქტირება</OutlineBtn>}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="სახელი" defaultValue="ლუკა" />
          <Field label="გვარი" defaultValue="ხარაიშვილი" />
          <Field label="ელ. ფოსტა" type="email" defaultValue="luka@scootarea.ge" />
          <Field label="ტელეფონი" type="tel" prefix="+995" defaultValue="555 12 34 56" />
          <Field label="დაბადების თარიღი" type="date" />
          <Field label="პირადი ნომერი" placeholder="01001012345" />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          ტელეფონის ნომერი გამოიყენება კურიერთან დასაკავშირებლად მიწოდებისას.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryBtn>შენახვა</PrimaryBtn>
          <OutlineBtn>გაუქმება</OutlineBtn>
        </div>
      </Panel>
    </>
  );
}
