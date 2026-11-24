// src/components/SectionSkeleton.tsx
export default function SectionSkeleton() {
  return (
    <section className="w-full px-4 py-10 md:px-[72px]">
      <div className="h-8 w-40 animate-pulse rounded-lg bg-secondary" />
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-2xl bg-secondary"
          />
        ))}
      </div>
    </section>
  );
}