import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "./config";

export type User = {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();

  if (!cookieStore.get("sid")) {
    return null;
  }

  const url = `${API_URL}/auth/me`;
 

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return (await res.json()) as User;
  } catch (e) {
    return null;
  }
});

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(role: string): Promise<User> {
  const user = await requireUser();
  if (user.role !== role) redirect("/");
  return user;
}
