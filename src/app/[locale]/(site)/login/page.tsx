import {
  AuthDivider,
  AuthShell,
  SocialRow,
} from "@/components/auth/AuthShell";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
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
        <LoginForm />
        <AuthDivider text="ან" />
        <SocialRow />
      </div>
    </AuthShell>
  );
}