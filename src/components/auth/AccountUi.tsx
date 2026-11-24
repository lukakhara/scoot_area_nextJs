import { type ReactNode } from "react";

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <h2 className="text-lg font-extrabold tracking-tight capitalize">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  defaultValue,
  type = "text",
  placeholder,
  prefix,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-muted-foreground capitalize">
        {label}
      </span>
      <span className="flex overflow-hidden rounded-xl border border-input bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
        {prefix && (
          <span className="grid place-items-center border-r bg-secondary px-3 text-sm font-semibold">
            {prefix}
          </span>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60"
        />
      </span>
    </label>
  );
}

export function PrimaryBtn({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-extrabold tracking-wide text-primary-foreground capitalize transition-colors hover:bg-primary/90 cursor-pointer"
    >
      {children}
    </button>
  );
}

export function OutlineBtn({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-xs font-bold tracking-wide text-primary capitalize transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
    >
      {children}
    </button>
  );
}

export function accountHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — Scootarea` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Scootarea` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  };
}
