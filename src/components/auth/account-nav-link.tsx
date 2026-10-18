"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // your clsx/twMerge helper

export default function AccountNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href; // exact match

  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold tracking-wide uppercase transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      )}
    >
      {children}
    </Link>
  );
}