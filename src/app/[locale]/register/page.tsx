import { Check } from "lucide-react";
import {
  AuthDivider,
  AuthField,
  AuthShell,
  SocialRow,
  SubmitButton,
} from "@/components/auth/AuthShell";
import Link from "next/link";

const STRENGTH = [
  { label: "სუსტი", tone: "bg-primary" },
  { label: "საშუალო", tone: "bg-primary" },
  { label: "რთული", tone: "bg-sale" },
];

export default function page() {
  return (
    <AuthShell
      title="რეგისტრაცია"
      lead="შეავსეთ სია და შექმენით ახალი ანგარიში — ეს წამებში ხდება."
      footer={
        <>
          უკვე გაქვთ ანგარიში?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:underline"
          >
            შესვლა
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField label="სახელი" placeholder="გიორგი" />
          <AuthField label="გვარი" placeholder="გიორგაძე" />
        </div>

        <AuthField
          label="ელ. ფოსტა"
          type="email"
          placeholder="scootarea@info.ge"
        />
        <AuthField label="ტელეფონი" type="tel" placeholder="+995 55 55 55" />

        <div className="space-y-2">
          <AuthField
            label="პაროლი"
            type="password"
            placeholder="მინიმუმ 8 სიმბოლო"
          />
          <div className="flex items-center gap-2">
            {STRENGTH.map(({ label, tone }) => (
              <span key={label} className="flex-1">
                <span className={`block h-1 rounded-full ${tone}`} />
                <span className="mt-1 block text-[10px] text-muted-foreground">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </div>

        <AuthField
          label="გამარჯვებული პაროლი"
          type="password"
          placeholder="განმეორებით"
        />

        <label className="flex cursor-pointer items-start gap-3 text-xs text-muted-foreground">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-[var(--primary)]"
          />
          <span>
            ვთანხმდები{" "}
            <a href="#" className="font-bold text-primary hover:underline">
              მომსახურების პირობებს
            </a>{" "}
            და{" "}
            <a href="#" className="font-bold text-primary hover:underline">
              კონფიდენციალურობის პოლიტიკას
            </a>
            .
          </span>
        </label>

        <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-xs">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sale">
            <Check className="size-3 text-primary-foreground" />
          </span>
          რეგისტრაციის შემდეგ პირად კაბინეტში ნახავთ შეკვეთებსა და ფასდაკლებებს.
        </div>

        <SubmitButton>რეგისტრაცია</SubmitButton>

        <AuthDivider text="ან" />
        <SocialRow />
      </div>
    </AuthShell>
  );
}
