import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansGeorgian = localFont({
  src: [
    {
      path: "./fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/Noto_Sans_Georgian/static/NotoSansGeorgian-Bold.ttf",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSansGeorgian.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans ">
        <Header />
        <main className="flex-1"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
