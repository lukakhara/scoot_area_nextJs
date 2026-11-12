"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveAddress } from "./actions";
import { ADDRESSES_PATH, type Address, type FormState } from "./address";

function TextField({
  label,
  name,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase">{label}</span>
      <input
        name={name}
        required
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

export function AddressForm({ address }: { address?: Address }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveAddress.bind(null, address?.id),
    {},
  );
  const v = state.values;

  return (
    <form action={action}>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="ქალაქი"
          name="city"
          placeholder="თბილისი"
          defaultValue={v?.city ?? address?.city}
        />
        <TextField
          label="მისამართი"
          name="street"
          placeholder="ქუჩა, ნომერი"
          defaultValue={v?.street ?? address?.street}
        />
        <TextField
          label="საფოსტო ინდექსი"
          name="postalCode"
          placeholder="0100"
          defaultValue={v?.postalCode ?? address?.postalCode}
        />
      </div>

      <label className="mt-5 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isDefault"
          defaultChecked={v?.isDefault ?? address?.isDefault}
          disabled={address?.isDefault}
          className="size-4 accent-[var(--sale)]"
        />
        ნაგულისხმევ მისამართად   დაყენება
      </label>

      {state.error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          {pending ? "ინახება..." : "შენახვა"}
        </button>
        {address && (
          <Link
            href={ADDRESSES_PATH}
            className="rounded-full border px-5 py-2.5 text-sm font-bold"
          >
            გაუქმება
          </Link>
        )}
      </div>
    </form>
  );
}