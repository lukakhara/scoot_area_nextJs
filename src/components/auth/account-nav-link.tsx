"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { useSelectedLayoutSegment } from "next/navigation";

export default function AccountNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  const linkSegment = href.split("/")[2] ?? null;
  const isActive = segment === linkSegment;



  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold tracking-wide uppercase transition-colors",
        isActive
          ? "bg-orange-300 "
          : "text-foreground/70 hover:bg-secondary hover:text-foreground ",
      )}
    >
      {children}
    </Link>
  );
}
