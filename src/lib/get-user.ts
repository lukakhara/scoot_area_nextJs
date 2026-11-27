import { cache } from "react";
import { cookies } from "next/headers";
import { API_URL } from "./config";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: "USER" | "MODERATOR" | "ADMIN";
  createdAt: string;
  
};

// cache() dedupes calls within a single request (layout + page share one fetch)
export const getUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { cookie: cookieStore.toString() }, // forward the sid cookie
    cache: "no-store",

  });
 
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to load user");

 
  return res.json();
});