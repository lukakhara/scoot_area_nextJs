import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scoot Area",
  description: "Electric scooter marketplace",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();


  return (
    <html lang={locale} className={`${notoSansGeorgian.variable} antialiased`}>
      <body className="flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}