import { Eye, Lock } from "lucide-react";
import {
  AuthDivider,
  AuthField,
  AuthShell,
  SocialRow,
  SubmitButton,
} from "@/components/auth/AuthShell";
import Link from "next/link";


export default function page() {
  return (
    <AuthShell
      title="შესვლა"
      lead="შეავსეთ ელ.ფოსტა და პაროლი თქვენს ანგარიშში შესასვლელად."
      footer={
        <>
          არ გაქვთ ანგარიში?{" "}
          <Link href="/register" className="font-bold text-primary hover:underline">
            რეგისტრაცია
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <AuthField label="ელ. ფოსტა" type="email" placeholder="scootarea@info.ge" />

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
            პაროლი
          </span>
          <span className="relative block">
            <Lock className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-input bg-background py-3 pr-12 pl-11 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
            <Eye className="absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground/60" />
          </span>
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 accent-[var(--primary)]"
              defaultChecked
            />
            დამიმახსოვრეთ
          </label>
          <a href="#" className="text-xs font-bold text-primary hover:underline">
            დაგავიწყდათ პაროლი?
          </a>
        </div>

        <SubmitButton>შესვლა</SubmitButton>

        <AuthDivider text="ან" />
        <SocialRow />
      </div>
    </AuthShell>
  );
}
