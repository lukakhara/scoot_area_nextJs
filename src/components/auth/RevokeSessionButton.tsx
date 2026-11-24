"use client";

import { useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  path: string; // e.g. "/api/sessions/abc" or "/api/sessions/others"
  className?: string;
  children: ReactNode;
}

export function RevokeSessionButton({ path, className, children }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function handleClick() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) startTransition(() => router.refresh()); // re-runs the server fetch
  }

  return (
    <button type="button" onClick={handleClick} disabled={pending} className={className}>
      {children}
    </button>
  );
}