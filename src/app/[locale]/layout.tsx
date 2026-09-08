import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";


const notoSansGeorgian = localFont({
  src: [
    {
      path: "../fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-Regular.ttf",
      weight: "400",
    },
    {
      path: "../fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-Medium.ttf",
      weight: "500",
    },
    {
      path: "../fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scoot Area",
  description: "Electric scooter marketplace",
};

const locales = ["en", "ka"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();
  {
    return (
      <html
        lang="en"
        className={`${notoSansGeorgian.variable}   antialiased `}
      >
        <body className="flex flex-col font-sans ">
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex-1 overflow-x-hidden"> {children}</main>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
