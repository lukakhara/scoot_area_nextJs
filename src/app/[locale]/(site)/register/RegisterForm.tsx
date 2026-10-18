"use client";

import { AuthField, SubmitButton } from "@/components/auth/AuthShell";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const STRENGTH = [
  { label: "სუსტი", tone: "bg-primary" },
  { label: "საშუალო", tone: "bg-primary" },
  { label: "ძლიერი", tone: "bg-sale" },
];

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  terms: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  terms: false,
};

// 0 = empty, 1 = weak, 2 = medium, 3 = strong
function getStrength(pw: string) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length < 8) return 1;
  return score <= 2 ? 1 : score === 3 ? 2 : 3;
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.firstName.trim().length < 2) e.firstName = "შეიყვანეთ სახელი";
  if (v.lastName.trim().length < 2) e.lastName = "შეიყვანეთ გვარი";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "არასწორი ელ. ფოსტა";
  if (!/^(\+995)?5\d{8}$/.test(v.phone.replace(/\s/g, "")))
    e.phone = "არასწორი ტელეფონის ნომერი";
  if (v.password.length < 8) e.password = "მინიმუმ 8 სიმბოლო";
  else if (!/\d/.test(v.password) || !/[A-Za-z]/.test(v.password))
    e.password = "პაროლი უნდა შეიცავდეს ასოსა და ციფრს";
  if (v.confirm !== v.password) e.confirm = "პაროლები არ ემთხვევა";
  if (!v.terms) e.terms = "გთხოვთ დაეთანხმოთ პირობებს";
  return e;
}

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => validate(values), [values]);
  const strength = useMemo(() => getStrength(values.password), [values.password]);

  // show an error only after the field was touched or submit was attempted
  const err = (k: keyof Values) =>
    touched[k] || submitted ? errors[k] : undefined;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const { confirm, terms, ...payload } = values;
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setServerError(data?.message ?? "რეგისტრაცია ვერ მოხერხდა");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setServerError("კავშირის შეცდომა, სცადეთ თავიდან");
    } finally {
      setLoading(false);
    }
  }

  const common = { onChange, onBlur };

  return (
    <form onSubmit={onSubmit} noValidate className=" flex flex-col gap-4">
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          label="სახელი"
          name="firstName"
          placeholder="გიორგი"
          autoComplete="given-name"
          value={values.firstName}
          error={err("firstName")}
          {...common}
        />
        <AuthField
          label="გვარი"
          name="lastName"
          placeholder="გიორგაძე"
          autoComplete="family-name"
          value={values.lastName}
          error={err("lastName")}
          {...common}
        />
      </div>

      <AuthField
        label="ელ. ფოსტა"
        name="email"
        type="email"
        placeholder="scootarea@info.ge"
        autoComplete="email"
        value={values.email}
        error={err("email")}
        {...common}
      />
      <AuthField
        label="ტელეფონი"
        name="phone"
        type="tel"
        placeholder="+995 55 55 55"
        autoComplete="tel"
        value={values.phone}
        error={err("phone")}
        {...common}
      />

      <div className="space-y-2">
        <AuthField
          label="პაროლი"
          name="password"
          type="password"
          placeholder="მინიმუმ 8 სიმბოლო"
          autoComplete="new-password"
          value={values.password}
          error={err("password")}
          {...common}
        />
        <div className="flex items-center gap-2">
          {STRENGTH.map(({ label, tone }, i) => (
            <span key={label} className="flex-1">
              <span
                className={`block h-1 rounded-full transition-colors ${
                  strength > i ? tone : "bg-muted"
                }`}
              />
              <span
                className={`mt-1 block text-[10px] ${
                  strength === i + 1
                    ? "font-bold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <AuthField
        label="გაიმეორეთ პაროლი"
        name="confirm"
        type="password"
        placeholder="განმეორებით"
        autoComplete="new-password"
        value={values.confirm}
        error={err("confirm")}
        {...common}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs text-muted-foreground">
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={onChange}
            onBlur={onBlur}
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
        {err("terms") && (
          <p className="mt-1 text-xs text-red-600">{err("terms")}</p>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-xs">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sale">
          <Check className="size-3 text-primary-foreground" />
        </span>
        რეგისტრაციის შემდეგ პირად კაბინეტში ნახავთ შეკვეთებსა და ფასდაკლებებს.
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <SubmitButton disabled={loading}>
        {loading ? "..." : "რეგისტრაცია"}
      </SubmitButton>
    </form>
  );
}