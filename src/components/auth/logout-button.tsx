"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { logout } from "@/lib/logout";

export default function LogoutButton() {
  const t = useTranslations("LogoutButton");
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
      className="flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold tracking-wide text-destructive capitalcase hover:bg-secondary"
    >
      <LogOut className="size-4" /> {t("logout")}
    </button>
  );
}