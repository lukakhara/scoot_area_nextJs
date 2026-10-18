import { AuthDivider, AuthShell, SocialRow } from "@/components/auth/AuthShell";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

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
      <div className="space-y-5 ">
        <RegisterForm />

        <AuthDivider text="ან" />
        <SocialRow />
      </div>
    </AuthShell>
  );
}
