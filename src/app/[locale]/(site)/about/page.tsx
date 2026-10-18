"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import {
  SiFacebook as Facebook,
  SiInstagram as Instagram,
  SiLinkerd as Linkedin,
  SiYoutube as Youtube,
} from "@icons-pack/react-simple-icons";
import { Placeholder } from "@/components/ui/Placeholder";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GalleryImage from "@/components/GalleryImage";

const PARAGRAPH_KEYS = ["p1", "p2", "p3", "p4", "p5"] as const;
const FAQ_KEYS = ["1", "2", "3"] as const;

const CONTACTS = [
  { icon: Phone, label: "+995 55 55 55", tone: "bg-brand-ink" },
  { icon: Phone, label: "+995 55 55 55", tone: "bg-[oklch(0.62_0.16_150)]" },
  { icon: Phone, label: "+995 55 55 55", tone: "bg-[oklch(0.52_0.2_300)]" },
  { icon: Send, label: "+995 55 55 55", tone: "bg-[oklch(0.65_0.14_235)]" },
];

const GALLERY_IMAGES = [
  { mobile: "/blogImageMob2.png", desktop: "/blogImageDesk2.png" },
  { mobile: "/BlogImageMob3.png", desktop: "/blogImageDesk3.png" },
  { mobile: "/blogImageMob2.png", desktop: "/blogImageDesk4.png", desktopOnly: true },
  { mobile: "/BlogImageMob3.png", desktop: "/blogImageDesk3.png" },
  { mobile: "/blogImageMob2.png", desktop: "/blogImageDesk4.png", desktopOnly: true },
  { mobile: "/blogImageMob2.png", desktop: "/blogImageDesk2.png" },
];

function AboutPage() {
  const t = useTranslations("About");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background ">
      <main className="px-4 md:pl-[75px] md:pr-[70px] pt-10 md:pt-20 pb-30 lg:pt-12">
        {/* Intro */}
        <section>
          <h1 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            {t("title")}
          </h1>
          <picture>
            <source media="(min-width: 768px)" srcSet="/aboutUs.png" />
            <Image
              src="/aboutUsMobile.png"
              width={1296}
              height={545}
              className="w-full object-cover"
              alt={t("imageAlt")}
            />
          </picture>

          <h2 className="mt-10 text-xl leading-snug font-extrabold tracking-tight uppercase sm:text-3xl">
            {t("heading")}
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {PARAGRAPH_KEYS.map((key) => (
              <p key={key}>{t(key)}</p>
            ))}
            <p>
              {t.rich("tagline", {
                b: (chunks) => (
                  <strong className="text-foreground">{chunks}</strong>
                ),
              })}
            </p>
          </div>

          {/* Socials + links */}
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-4">
              {[Facebook, Youtube, Instagram, Linkedin, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={t("socialLabel")}
                  className="hover:text-primary"
                >
                  <Icon className="size-6 shrink-0" />
                </a>
              ))}
            </div>
            <div className="flex shrink-0 gap-3">
              {(["link1", "link2"] as const).map((key) => (
                <a
                  key={key}
                  href="#"
                  className="rounded-full border px-5 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
              {t("partners")}
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {t("seeAll")}
              </span>
              <button
                aria-label={t("prev")}
                className="grid size-7 place-items-center rounded-full border hover:border-primary"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label={t("next")}
                className="grid size-7 place-items-center rounded-full border hover:border-primary"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Placeholder
                  className="aspect-square w-full rounded-lg"
                  label="logo"
                />
                <p className="mt-3 text-[11px] leading-tight font-extrabold uppercase">
                  {t("companyLine1")}
                  <br />
                  {t("companyLine2")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary/60 py-12">
          <h2 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
            {t("faqTitle")}
          </h2>

          <div className="mt-6 max-w-[720px] space-y-3">
            {FAQ_KEYS.map((key, i) => (
              <div key={key} className="rounded-lg border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium uppercase sm:text-sm"
                >
                  <span className="min-w-0 flex-1">{t(`faq.${key}.q`)}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="border-t px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {t(`faq.${key}.a`)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Head office */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
            {t("headOffice")}
          </h2>

          <div className="mt-5 grid gap-6 rounded-2xl bg-secondary/60 p-4 sm:p-6 lg:grid-cols-[1fr_1fr_1fr]">
            <Placeholder
              className="aspect-[4/3] w-full rounded-xl border-2 border-primary/60"
              label="map"
            />

            <ul className="space-y-3 text-sm lg:border-r lg:pr-6">
              {CONTACTS.map(({ icon: Icon, label, tone }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full ${tone}`}
                  >
                    <Icon
                      className={cn(
                        "size-3.5 text-primary-foreground",
                        Icon === Phone ? "rotate-270" : "",
                      )}
                    />
                  </span>
                  {label}
                </li>
              ))}
              <li className="flex items-center gap-3 pt-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink">
                  <Mail className="size-3.5 text-primary-foreground" />
                </span>
                Scootarea@info.ge
              </li>
            </ul>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink">
                  <Clock className="size-3.5 text-primary-foreground" />
                </span>
                {t("hours")}
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink">
                  <MapPin className="size-3.5 text-primary-foreground" />
                </span>
                <span>
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
                </span>
              </li>
              <li className="flex items-center gap-3 pt-4">
                <div className="flex items-center gap-3">
                  {[Facebook, Instagram, Linkedin, Send].map((Icon, i) => (
                    <Icon key={i} className="size-4" />
                  ))}
                </div>
                <span className="text-muted-foreground">@ScootArea</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
            {t("gallery")}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {GALLERY_IMAGES.map((img, i) => (
              <GalleryImage key={i} {...img} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;