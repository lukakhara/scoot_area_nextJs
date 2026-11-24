// src/app/[locale]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-[72px]">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-secondary" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="min-h-[300px] animate-pulse rounded-3xl bg-secondary"
          />
        ))}
      </div>
    </div>
  );
}