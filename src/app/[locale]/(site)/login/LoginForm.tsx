"use client";

import { AuthField, SubmitButton } from "@/components/auth/AuthShell";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

type Values = {
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "არასწორი ელ. ფოსტა";
  if (!v.password) e.password = "შეიყვანეთ პაროლი";
  return e;
}

export default function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    email: "mariam.user@example.com",
    password: "SecurePassword123!",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof Values, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => validate(values), [values]);
  const err = (k: keyof Values) =>
    touched[k] || submitted ? errors[k] : undefined;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          credentials: "include", // required
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      console.log(res);
      console.log(process.env.NEXT_PUBLIC_API_URL);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setServerError(data?.message ?? "ელ. ფოსტა ან პაროლი არასწორია");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setServerError("კავშირის შეცდომა, სცადეთ თავიდან");
    } finally {
      setLoading(false);
    }
  }

  const passwordError = err("password");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <AuthField
        label="ელ. ფოსტა"
        name="email"
        type="email"
        placeholder="scootarea@info.ge"
        autoComplete="email"
        value={values.email}
        error={err("email")}
        onChange={onChange}
        onBlur={onBlur}
      />

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
          პაროლი
        </span>
        <span className="relative block">
          <Lock className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={values.password}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!passwordError}
            className={`w-full rounded-xl border bg-background py-3 pr-12 pl-11 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 ${
              passwordError
                ? "border-red-600 focus:border-red-600 focus:ring-red-600/25"
                : "border-input focus:border-primary focus:ring-primary/25"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "პაროლის დამალვა" : "პაროლის ჩვენება"}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </span>
        {passwordError && (
          <span className="mt-1.5 block text-xs text-red-600">
            {passwordError}
          </span>
        )}
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            name="remember"
     
            onChange={onChange}
            className="size-4 accent-[var(--primary)]"
          />
          დამახსოვრება
        </label>
        <a href="#" className="text-xs font-bold text-primary hover:underline">
          დაგავიწყდათ პაროლი?
        </a>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <SubmitButton disabled={loading}>
        {loading ? "..." : "შესვლა"}
      </SubmitButton>
    </form>
  );
}
