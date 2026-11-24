import {
  AuthDivider,
  AuthShell,
  SocialRow,
} from "@/components/auth/AuthShell";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <AuthShell
      title={t("title")}
      lead={t("lead")}
      footer={
        <>
          {t("noAccount")}{" "}
          <Link href="/register" className="font-bold text-primary hover:underline">
            {t("register")}
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <LoginForm />
        <AuthDivider text={t("or")} />
        <SocialRow />
      </div>
    </AuthShell>
  );
}