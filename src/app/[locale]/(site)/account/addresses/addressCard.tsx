import Link from "next/link";
import { deleteAddress, setDefaultAddress } from "./actions";
import { ADDRESSES_PATH, type Address } from "./address";

export function AddressCard({ address }: { address: Address }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5">
      <div>
        <div className="font-bold">{address.city}</div>
        <div className="text-sm text-muted-foreground">{address.street}</div>
        {address.isDefault && (
          <span className="mt-2 inline-block text-xs font-bold text-sale">
            ნაგულისხმევი
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {!address.isDefault && (
          <form action={setDefaultAddress.bind(null, address.id)}>
            <button
              type="submit"
              className="rounded-full border px-4 py-2 text-xs font-bold"
            >
              ნაგულისხმევად დაყენება
            </button>
          </form>
        )}

        <Link
          href={`${ADDRESSES_PATH}?edit=${address.id}`}
          className="rounded-full border px-4 py-2 text-xs font-bold"
        >
          რედაქტირება
        </Link>

        <form action={deleteAddress.bind(null, address.id)}>
          <button
            type="submit"
            className="rounded-full border px-4 py-2 text-xs font-bold text-destructive"
          >
            წაშლა
          </button>
        </form>
      </div>
    </li>
  );
}