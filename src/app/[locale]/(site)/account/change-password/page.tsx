import { LogOut, Monitor, ShieldCheck, Smartphone, Tablet } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Field, OutlineBtn, Panel, PrimaryBtn } from "@/components/auth/AccountUi";
import { RevokeSessionButton } from "@/components/auth/RevokeSessionButton";
import { getSessions, type ActiveSession } from "@/lib/sessions";

function deviceIcon(device: string | null) {
  if (device === "mobile") return Smartphone;
  if (device === "tablet") return Tablet;
  return Monitor;
}

export default async function Page() {
  const [sessions, locale, t] = await Promise.all([
    getSessions(),
    getLocale(),
    getTranslations("AccountSecurityPage"),
  ]);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  function timeAgo(iso: string) {
    const sec = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
    const abs = Math.abs(sec);
    if (abs < 60) return t("timeAgo.justNow");
    if (abs < 3600) return rtf.format(Math.round(sec / 60), "minute");
    if (abs < 86400) return rtf.format(Math.round(sec / 3600), "hour");
    return rtf.format(Math.round(sec / 86400), "day");
  }

  function sessionTitle(s: ActiveSession) {
    const browser = s.browser?.replace(/\s\d+$/, ""); // drop version
    return [browser, s.os].filter(Boolean).join(" · ") || t("session.unknownDevice");
  }

  return (
    <>
      <Panel title={t("password.title")}>
        <div className="grid max-w-xl gap-5">
          <Field label={t("password.currentLabel")} type="password" placeholder="••••••••" />
          <Field label={t("password.newLabel")} type="password" placeholder={t("password.newPlaceholder")} />
          <div className="flex gap-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-sale" />
            <span className="h-1.5 flex-1 rounded-full bg-sale" />
            <span className="h-1.5 flex-1 rounded-full bg-primary" />
            <span className="h-1.5 flex-1 rounded-full bg-secondary" />
          </div>
          <Field label={t("password.confirmLabel")} type="password" placeholder="••••••••" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryBtn>{t("password.submit")}</PrimaryBtn>
          <OutlineBtn>{t("password.cancel")}</OutlineBtn>
        </div>
      </Panel>
      <Panel
        title={t("sessions.title")}
        action={
          <RevokeSessionButton
            path="/sessions/others"
            className="inline-flex items-center gap-2 rounded-full border-2 border-destructive px-5 py-2.5 text-xs font-bold tracking-wide text-destructive capitalize transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="size-3.5" /> {t("session.revokeOthers")}
          </RevokeSessionButton>
        }
      >
        <ul className="divide-y">
          {sessions.map((s) => {
            const Icon = deviceIcon(s.device);
            return (
              <li key={s.sid} className="flex flex-wrap items-center gap-4 py-4">
                <span className="grid size-11 place-items-center rounded-full bg-secondary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{sessionTitle(s)}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.ip} · {s.current ? t("session.activeNow") : timeAgo(s.lastUsedAt)}
                  </p>
                </div>
                {s.current ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sale px-3 py-1 text-[10px] font-bold text-primary-foreground capitalize">
                    <ShieldCheck className="size-3" /> {t("session.currentDevice")}
                  </span>
                ) : (
                  <RevokeSessionButton
                    path={`/sessions/${s.sid}`}
                    className="text-xs font-bold text-primary capitalize hover:underline"
                  >
                    {t("session.revoke")}
                  </RevokeSessionButton>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
    </>
  );
}