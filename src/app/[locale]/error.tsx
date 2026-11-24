// src/app/[locale]/error.tsx
"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">
        We couldn&apos;t load this page.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-primary px-6 py-2 text-primary-foreground"
      >
        Try again
      </button>
    </main>
  );
}