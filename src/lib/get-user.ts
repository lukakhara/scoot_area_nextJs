import { cache } from "react";
import { cookies } from "next/headers";

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    headers: { cookie: cookieStore.toString() }, // forward the sid cookie
    cache: "no-store",

  });
 console.log("getUser called",res,process.env.NEXT_PUBLIC_API_URL);
 
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to load user");

 
  return res.json();
});