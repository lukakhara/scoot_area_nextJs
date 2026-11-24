import { API_URL } from "@/lib/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const token = (await cookies()).get("token")?.value;

  const res = token
    ? await fetch(`${API_URL}/auth/me`, {
        headers: { Cookie: `token=${token}` },
        cache: "no-store",
      })
    : null;

  if (!res?.ok) redirect(`/${locale}/account`);

  const user = await res.json();
  if (user.role !== "ADMIN") redirect(`/${locale}`);

  return <div className="min-h-screen">{children}</div>;
}