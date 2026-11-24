// src/app/[locale]/error.tsx
"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground">{t("description")}</p>
      <button
        onClick={reset}
        className="rounded-full bg-primary px-6 py-2 text-primary-foreground transition-opacity hover:opacity-80"
      >
        {t("retry")}
      </button>
    </main>
  );
}