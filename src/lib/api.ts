import "server-only";
import { cookies } from "next/headers";

// server-only fetch to Express that forwards the session cookie
export async function apiFetch(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  
  return fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      cookie: cookieStore.toString(),
      ...init.headers,
    },
    cache: "no-store",
  });
  
}
