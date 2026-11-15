"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/logout";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const ok = await logout();
    if (!ok) return; // optionally show an error
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold tracking-wide text-destructive uppercase hover:bg-secondary"
    >
      <LogOut className="size-4" /> გასვლა
    </button>
  );
}