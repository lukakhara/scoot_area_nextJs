import "server-only";
import { cookies } from "next/headers";
import { API_URL } from "./config";



export interface ActiveSession {
  sid: string;
  browser: string | null;
  os: string | null;
  device: string | null;
  ip: string | null;
  createdAt: string;
  lastUsedAt: string;
  current: boolean;
}

export async function getSessions(): Promise<ActiveSession[]> {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/sessions`, {
    headers: { cookie: cookieStore.toString() }, // sends the session cookie to Express
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) throw new Error(`Failed to load sessions: ${res.status}`);
  return res.json();
}