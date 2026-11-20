import { Bike, MapPin, ShieldCheck, User, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AccountNavLink from "@/components/auth/account-nav-link";
import { requireUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/logout-button";

const LINKS = [
  { to: "/account", key: "personal", Icon: User },
  { to: "/account/orders", key: "orders", Icon: Package },
  { to: "/account/addresses", key: "addresses", Icon: MapPin },
  { to: "/account/garage", key: "garage", Icon: Bike },
  {
    to: "/account/change-password",
    key: "changePassword",
    Icon: ShieldCheck,
  },
] as const;

function getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName ? firstName[0].toUpperCase() : "";
  const lastInitial = lastName ? lastName[0].toUpperCase() : "";

  return firstInitial + lastInitial;
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("AccountLayout");
  const user = await requireUser();

  return (
    <main className="mx-auto grid w-full max-w-[1400px] flex-1 gap-6 px-5 py-8 lg:grid-cols-[280px_1fr] lg:py-12 ">
      <aside className="space-y-4">
        <div className="flex items-center gap-4 rounded-3xl bg-brand-ink p-5 text-primary-foreground">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-xl font-extrabold uppercase">
            {getInitials(user.firstName, user.lastName)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-xs opacity-70">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-sale px-2 py-0.5 text-[10px] font-bold ">
              {t("verified")}
            </span>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto rounded-3xl border bg-card p-2 lg:flex-col ">
          {LINKS.map(({ to, key, Icon }) => (
            <AccountNavLink key={to} href={to}>
              <Icon className="size-4" /> {t(`links.${key}`)}
            </AccountNavLink>
          ))}
          <LogoutButton />
        </nav>
      </aside>

      <div className="min-w-0 space-y-6 ">{children}</div>
    </main>
  );
}