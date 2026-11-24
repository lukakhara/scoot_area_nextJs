"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ADDRESSES_API, ADDRESSES_PATH, type FormState } from "./address";

async function readError(res: Response, fallback: string) {
  try {
    const body = await res.json();
    return typeof body?.message === "string" ? body.message : fallback;
  } catch {
    return fallback;
  }
}

export async function saveAddress(
  id: string | undefined,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = {
    city: String(formData.get("city") ?? "").trim(),
    street: String(formData.get("street") ?? "").trim(),
    isDefault: formData.get("isDefault") === "on",
  };

  if (!values.city || !values.street) {
    return { error: "შეავსეთ ყველა ველი", values };
  }

  // PATCH only accepts isDefault: true, so omit it when unchecked
  const { isDefault, ...fields } = values;
  const body = id
    ? { ...fields, ...(isDefault && { isDefault: true }) }
    : values;

  const res = await apiFetch(id ? `${ADDRESSES_API}/${id}` : ADDRESSES_API, {
    method: id ? "PATCH" : "POST",
    body: JSON.stringify(body),
  });

  

  if (res.status === 401) redirect("/login");
  if (!res.ok) {
    return { error: await readError(res, "შენახვა ვერ მოხერხდა"), values };
  }

  revalidatePath(ADDRESSES_PATH);
  if (id) redirect(ADDRESSES_PATH); // leave edit mode
  return {}; // create: React resets the form
}

export async function deleteAddress(id: string): Promise<void> {
  const res = await apiFetch(`${ADDRESSES_API}/${id}`, { method: "DELETE" });

  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error(await readError(res, "წაშლა ვერ მოხერხდა"));

  revalidatePath(ADDRESSES_PATH);
}

export async function setDefaultAddress(id: string): Promise<void> {
  const res = await apiFetch(`${ADDRESSES_API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isDefault: true }),
  });

  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error(await readError(res, "ცვლილება ვერ მოხერხდა"));

  revalidatePath(ADDRESSES_PATH);
}
