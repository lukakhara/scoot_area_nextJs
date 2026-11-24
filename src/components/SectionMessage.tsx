// src/components/SectionMessage.tsx
export default function SectionMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <section className="w-full px-4 py-10 md:px-[72px]">
      <h2 className="text-xl font-bold uppercase sm:text-2xl md:text-[40px]">
        {title}
      </h2>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </section>
  );
}