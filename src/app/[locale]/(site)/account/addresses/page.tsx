import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import {
  Field,
  OutlineBtn,
  Panel,
  PrimaryBtn,
} from "@/components/auth/AccountUi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Address {
  city: string;
  street: string;
  postalCode: string;
  country: string;
  isDefault:boolean;
}



async function getAddresses(): Promise<Address[]> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.API_URL}/api/address`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store", // user-specific data, never cache
  });

  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error(`Failed to fetch addresses: ${res.status}`);

  const { data } = (await res.json()) as { data: Address[] };
  return data;
}

export default async function index() {
  const addresses = await getAddresses();
  return (
    <>
      <Panel
        title="შენახული მისამართები"
        action={
          <PrimaryBtn>
            <Plus className="size-4" /> დამატება
          </PrimaryBtn>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((a) => (
            <div
              key={a.street}
              className={`rounded-2xl border-2 p-5 ${a.isDefault ? "border-sale bg-sale/5" : "border-border"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{a.city}</p>
                  </div>
                </div>
                {a.isDefault && (
                  <span className="rounded-full bg-sale px-2.5 py-1 text-[10px] font-bold text-primary-foreground uppercase">
                    ნაგულისხმევი
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm">{a.street}</p>
              <p className="text-sm text-muted-foreground">+995 555 12 34 56</p>
              <div className="mt-4 flex flex-wrap gap-2 border-t pt-4 text-xs font-bold uppercase">
                <button className="inline-flex items-center gap-1.5 hover:text-primary">
                  <Pencil className="size-3.5" /> რედაქტირება
                </button>
                <button className="inline-flex items-center gap-1.5 text-destructive">
                  <Trash2 className="size-3.5" /> წაშლა
                </button>
                {!a.isDefault && (
                  <button className="ml-auto inline-flex items-center gap-1.5 text-sale">
                    <Star className="size-3.5" /> ნაგულისხმევად
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="ახალი მისამართი">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="დასახელება" placeholder="მაგ. სახლი" />
          <Field label="ქალაქი" placeholder="თბილისი" />
          <Field label="მისამართი" placeholder="ქუჩა, ნომერი" />
          <Field label="ტელეფონი" prefix="+995" placeholder="5XX XX XX XX" />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm">
          <input type="checkbox" className="size-4 accent-[var(--sale)]" />{" "}
          ნაგულისხმევად დაყენება checkout-ისთვის
        </label>
        <div className="mt-6 flex gap-3">
          <PrimaryBtn>შენახვა</PrimaryBtn>
          <OutlineBtn>გაუქმება</OutlineBtn>
        </div>
      </Panel>
    </>
  );
}
