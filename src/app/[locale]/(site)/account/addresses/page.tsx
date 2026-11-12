import Link from "next/link";
import { MapPin, Pencil, Plus, Star } from "lucide-react";
import { Panel } from "@/components/auth/AccountUi";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { deleteAddress, setDefaultAddress } from "./actions";
import { AddressForm } from "./AddressForm";
import { DeleteAddressButton } from "./DeleteAddressButton";
import { ADDRESSES_API, ADDRESSES_PATH, type Address } from "./address";
import { div } from "framer-motion/client";

async function getAddresses(): Promise<Address[]> {
  const res = await apiFetch(ADDRESSES_API);

  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error(`Failed to fetch addresses: ${res.status}`);

  const { data } = (await res.json()) as { data: Address[] };
  return data;
}

export default async function AddressesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const addresses = await getAddresses();
  const editing = addresses.find((a) => a.id === edit);

  return (
    <>
      <Panel
        title="შენახული მისამართები"
        action={
          <Link
            href={`${ADDRESSES_PATH}#form`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-80"
          >
            <Plus className="size-4" /> დამატება
          </Link>
        }
      >
        {addresses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            შენახული მისამართები არ გაქვთ
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((a) => (
              <div
                key={a.id}
                className={`rounded-2xl border-2 p-5 ${a.isDefault ? "border-sale bg-sale/5" : "border-border"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                      <MapPin className="size-4" />
                    </span>
                    <p className="text-xs text-muted-foreground">ქალაქი:{a.city}</p>
                  </div>
                  {a.isDefault && (
                   
                    <span className="rounded-full bg-sale px-2.5 py-1 text-[12px] font-bold text-primary-foreground uppercase">
                     ნაგულისხმევი
                    </span> 
                  )}
                </div>

                <p className="mt-4 text-sm">ქუჩა:{a.street}</p>
                <p className="text-sm text-muted-foreground">Zip კოდი:{a.postalCode}</p>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t pt-4 text-xs font-bold uppercase">
                  <Link
                    href={`${ADDRESSES_PATH}?edit=${a.id}#form`}
                    className="inline-flex items-center gap-1.5 hover:text-primary"
                  >
                    <Pencil className="size-3.5" /> რედაქტირება
                  </Link>

                  <form action={deleteAddress.bind(null, a.id)}>
                    <DeleteAddressButton />
                  </form>

                  {!a.isDefault && (
                    <form
                      action={setDefaultAddress.bind(null, a.id)}
                      className="ml-auto"
                    >
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 text-sale cursor-pointer hover:opacity-50"
                      >
                        <Star className="size-3.5" /> ნაგულისხმევად
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <div id="form">
        <Panel title={editing ? "მისამართის რედაქტირება" : "ახალი მისამართი"}>
          <AddressForm key={editing?.id ?? "new"} address={editing} />
        </Panel>
      </div>
    </>
  );
}