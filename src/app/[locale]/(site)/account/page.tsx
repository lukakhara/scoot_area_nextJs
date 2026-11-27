import { Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  Field,
  OutlineBtn,
  Panel,
  PrimaryBtn,
} from "@/components/auth/AccountUi";
import { requireUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";

type Stats = { orders: number; addresses: number};

async function getStats(): Promise<Stats> {
  const res = await apiFetch("/api/user/stats");
  if (!res.ok) return { orders: 0, addresses: 0};
  const { data } = (await res.json()) as { data: Stats };
  return data;
}

export default async function PersonalInfo() {
  const [t, user, counts] = await Promise.all([
    getTranslations("PersonalInfo"),
    requireUser(),
    getStats(),
  ]);

  const stats = [
    { n: counts.orders, l: t("stats.orders"), c: "bg-primary" },
    { n: counts.addresses, l: t("stats.addresses"), c: "bg-sale" },
   
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3 ">
        {stats.map((s) => (
          <div
            key={s.l}
            className={`${s.c} rounded-3xl p-5 text-primary-foreground`}
          >
            <p className="text-3xl font-extrabold">{s.n}</p>
            <p className="text-xs font-bold capitalize opacity-90">{s.l}</p>
          </div>
        ))}
      </div>
      <Panel
        title={t("title")}
        action={
          <OutlineBtn>
            <Pencil className="size-3.5" /> {t("edit")}
          </OutlineBtn>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t("firstName")} defaultValue={user.firstName} />
          <Field label={t("lastName")} defaultValue={user.lastName} />
          <Field label={t("email")} type="email" defaultValue={user.email} />
          <Field
            label={t("phone")}
            type="tel"
            prefix="+995"
            defaultValue={user?.phone}
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{t("phoneHint")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryBtn>{t("save")}</PrimaryBtn>
          <OutlineBtn>{t("cancel")}</OutlineBtn>
        </div>
      </Panel>
    </>
  );
}
