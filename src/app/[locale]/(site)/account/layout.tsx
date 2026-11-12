import { Bike, LogOut, MapPin, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import AccountNavLink from "@/components/auth/account-nav-link";
import { requireUser } from "@/lib/auth";

const LINKS = [
  { to: "/account", label: "პირადი ინფორმაცია", Icon: User },
  { to: "/account/orders", label: "შეკვეთები", Icon: MapPin },
  { to: "/account/addresses", label: "მისამართები", Icon: MapPin },
  { to: "/account/garage", label: "ჩემი გარაჟი", Icon: Bike },
  {
    to: "/account/change-password",
    label: "პაროლის შეცვლა",
    Icon: ShieldCheck,
  },
] as const;

function getInitials(firstName:string, lastName:string): string {
  // Ensure the strings aren't empty, then get the first letters and capitalize them
  const firstInitial = firstName ? firstName[0].toUpperCase() : '';
  const lastInitial = lastName ? lastName[0].toUpperCase() : '';
  
  return firstInitial + lastInitial;
}


export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser(); // lib/auth.ts

  return (
    <main className="mx-auto grid w-full max-w-[1400px] flex-1 gap-6 px-5 py-8 lg:grid-cols-[280px_1fr] lg:py-12 ">
      <aside className="space-y-4">
        <div className="flex items-center gap-4 rounded-3xl bg-brand-ink p-5 text-primary-foreground">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-xl font-extrabold uppercase">
           {user.firstName[0]}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">{user.firstName} {user.lastName}</p>
            <p className="truncate text-xs opacity-70">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-sale px-2 py-0.5 text-[10px] font-bold uppercase">
              ვერიფიცირებული
            </span>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto rounded-3xl border bg-card p-2 lg:flex-col">
          {LINKS.map(({ to, label, Icon }) => (
            <AccountNavLink key={to} href={to}>
              <Icon className="size-4" /> {label}
            </AccountNavLink>
          ))}
          <Link
            href="/login"
            className="flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold tracking-wide text-destructive uppercase hover:bg-secondary"
          >
            <LogOut className="size-4" /> გასვლა
          </Link>
        </nav>
      </aside>

      <div className="min-w-0 space-y-6 ">{children}</div>
    </main>
  );
}
