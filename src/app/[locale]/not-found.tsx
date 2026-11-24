// src/app/[locale]/not-found.tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
      <p className="text-muted-foreground">{t("description")}</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-6 py-2 text-primary-foreground transition-opacity hover:opacity-80"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}