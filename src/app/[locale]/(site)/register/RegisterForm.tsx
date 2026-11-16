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

// Values = exactly what is sent to the API
type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type FieldName = keyof Values | "confirm"; // confirm exists only in the browser
type Errors = Partial<Record<FieldName, string>>;

const initial: Values = {
  firstName: "მარიამ  ",
  lastName: "გიორგაძე",
  email: "mariam.user@example.com",
  phone: "+995555112233",
  password: "SecurePassword12345!",
};

const isDev = process.env.NODE_ENV !== "production";

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

function validate(v: Values, confirm: string,terms:boolean): Errors {
  const e: Errors = {};
  if (v.firstName.trim().length < 2) e.firstName = "შეიყვანეთ სახელი";
  if (v.lastName.trim().length < 2) e.lastName = "შეიყვანეთ გვარი";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "არასწორი ელ. ფოსტა";
  if (!/^(\+995)?5\d{8}$/.test(v.phone.replace(/\s/g, "")))
    e.phone = "არასწორი ტელეფონის ნომერი";
  if (v.password.length < 8) e.password = "მინიმუმ 8 სიმბოლო";
  else if (!/\d/.test(v.password) || !/[A-Za-z]/.test(v.password))
    e.password = "პაროლი უნდა შეიცავდეს ასოსა და ციფრს";
  if (confirm !== v.password) e.confirm = "პაროლები არ ემთხვევა";
  if (!terms) e.terms = "გთხოვთ დაეთანხმოთ პირობებს";
  return e;
}

// Message by HTTP status, used when the server sends no message of its own
function messageForStatus(status: number): string {
  switch (status) {
    case 400:
    case 422:
      return "მონაცემები არასწორია";
    case 404:
      return "სერვისი ვერ მოიძებნა (არასწორი მისამართი)";
    case 409:
      return "ეს ელ. ფოსტა უკვე რეგისტრირებულია";
    case 429:
      return "ძალიან ბევრი მცდელობა, სცადეთ მოგვიანებით";
    default:
      return status >= 500
        ? "სერვერის შეცდომა, სცადეთ მოგვიანებით"
        : "რეგისტრაცია ვერ მოხერხდა";
  }
}

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initial);
  const [confirm, setConfirm] = useState(""); // browser-only, never sent
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState("");
  const [serverFieldErrors, setServerFieldErrors] = useState<Errors>({});
  const [debugInfo, setDebugInfo] = useState("");

  const errors = useMemo(() => validate(values, confirm), [values, confirm]);
  const strength = useMemo(() => getStrength(values.password), [values.password]);

  const err = (k: FieldName) =>
    serverFieldErrors[k] ?? (touched[k] || submitted ? errors[k] : undefined);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    if (name === "confirm") {
      setConfirm(value);
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    setServerFieldErrors((prev) => {
      if (!prev[name as FieldName]) return prev;
      const { [name as FieldName]: _removed, ...rest } = prev;
      return rest;
    });
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    setServerFieldErrors({});
    setDebugInfo("");

    if (Object.keys(errors).length > 0) {
      setServerError("შეასწორეთ მონიშნული ველები");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setServerError("კონფიგურაციის შეცდომა: API მისამართი არ არის მითითებული");
      setDebugInfo(
        "NEXT_PUBLIC_API_URL is undefined (check .env.local and restart next dev)",
      );
      return;
    }

    const url = `${apiUrl}/api/auth/register`;
    setLoading(true);
   

    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // no confirm here, it lives outside values
      });

      if (!res.ok) {
        const text = await res.text();
        let data: any = null;
        try {
          data = JSON.parse(text);
        } catch {
          /* not JSON */
        }

        console.error("Register failed:", {
          status: res.status,
          url,
          body: data ?? text,
        });
        setDebugInfo(`${res.status} ${res.statusText} - ${url}`);

        if (data?.errors && typeof data.errors === "object") {
          setServerFieldErrors(data.errors as Errors);
          setServerError(data.message ?? messageForStatus(res.status));
          return;
        }

        if (res.status === 409) {
          setServerFieldErrors({
            email: data?.message ?? messageForStatus(409),
          });
          return;
        }

        setServerError(data?.message ?? messageForStatus(res.status));
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Register network error:", error);
      setServerError("კავშირის შეცდომა, სცადეთ თავიდან");
      setDebugInfo(`Network/CORS error - ${url} - ${String(error)}`);
    } finally {
      setLoading(false);
    }
  }

  const common = { onChange, onBlur };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
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
        placeholder="+995555555"
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
        value={confirm}
        error={err("confirm")}
        {...common}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs text-muted-foreground">
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
          
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

      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          <p>{serverError}</p>
          {isDev && debugInfo && (
            <p className="mt-1 break-all font-mono text-[11px] opacity-70">
              DEBUG: {debugInfo}
            </p>
          )}
        </div>
      )}

      <SubmitButton disabled={loading}>
        {loading ? "..." : "რეგისტრაცია"}
      </SubmitButton>
    </form>
  );
}