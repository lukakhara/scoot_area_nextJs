import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Placeholder } from "@/components/ui/Placeholder";
import {
  SiFacebook as Facebook,
  SiInstagram as Instagram,
} from "@icons-pack/react-simple-icons";
import {
  type InputHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

const PERK_KEYS = ["delivery", "warranty", "prices"] as const;

export function AuthShell({
  title,
  lead,
  children,
  footer,
}: {
  title: string;
  lead: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const t = useTranslations("AuthShell");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto grid w-full max-w-[1400px] flex-1 gap-6 px-5 py-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-12">
        <aside className="relative hidden flex-col justify-between overflow-hidden rounded-3xl bg-brand-ink p-8 text-primary-foreground lg:flex">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold tracking-wide uppercase">
              <Sparkles className="size-3.5" /> scoot area
            </span>
            <h2 className="mt-6 max-w-sm text-3xl leading-tight font-extrabold tracking-tight">
              {t("heading")}
            </h2>
            <ul className="mt-8 space-y-4 text-sm">
              {PERK_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sale">
                    <Check className="size-3.5 text-primary-foreground" />
                  </span>
                  {t(`perks.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <Placeholder
            className="relative z-10 mt-8 aspect-[16/9] w-full rounded-2xl border-2 border-primary/60 bg-primary-foreground/5 text-primary-foreground/60"
            label="scooter"
          />

          <span
            aria-hidden
            className="absolute -right-24 -bottom-24 size-72 rounded-full bg-primary/20 blur-2xl"
          />
        </aside>

        <section className="rounded-3xl border bg-card p-5 sm:p-8">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="h-1 flex-1 rounded-full bg-sale" aria-hidden />
            <span className="h-1 w-10 rounded-full bg-primary" aria-hidden />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{lead}</p>

          <div className="mt-7">{children}</div>

          <div className="mt-7 border-t pt-5 text-sm text-muted-foreground">
            {footer}
          </div>
        </section>
      </main>
    </div>
  );
}

export function AuthDivider({ text }: { text: string }) {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        {text}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function SocialRow() {
  const t = useTranslations("AuthShell");

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { Icon: Facebook, label: "Facebook" },
        { Icon: Instagram, label: "Instagram" },
        { Icon: Check, label: t("email") },
      ].map(({ Icon, label }) => (
        <button
          key={label}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-3 py-2.5 text-[11px] font-bold tracking-wide text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Icon className="size-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

type AuthFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string;
  hint?: string;
  error?: string;
};

export function AuthField({
  label,
  type = "text",
  hint,
  error,
  ...props
}: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <input
        type={type}
        aria-invalid={!!error}
        {...props}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 ${
          error
            ? "border-red-600 focus:border-red-600 focus:ring-red-600/25"
            : "border-input focus:border-primary focus:ring-primary/25"
        }`}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-red-600">{error}</span>
      ) : (
        hint && (
          <span className="mt-1.5 block text-xs text-muted-foreground">
            {hint}
          </span>
        )
      )}
    </label>
  );
}

export function SubmitButton({
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type"> & {
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      {...props}
      className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      {children}
    </button>
  );
}