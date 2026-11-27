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
  SiGooglemaps,
  SiWaze,
  SiYoutube as Youtube,
} from "@icons-pack/react-simple-icons";
import { Placeholder } from "@/components/ui/Placeholder";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import GalleryImage from "@/components/GalleryImage";
import { EMAIL, PHONE_DISPLAY, PHONE_E164, SOCIAL_URLS } from "@/lib/contact";

const PARAGRAPH_KEYS = ["p1", "p2", "p3", "p4", "p5"] as const;
const FAQ_KEYS = ["1", "2", "3"] as const;

const SOCIALS = [
  { Icon: Facebook, label: "Facebook", href: SOCIAL_URLS.facebook },
  { Icon: Youtube, label: "YouTube", href: SOCIAL_URLS.youtube },
  { Icon: Instagram, label: "Instagram", href: SOCIAL_URLS.instagram },
  { Icon: Youtube, label: "LinkedIn", href: SOCIAL_URLS.linkedin },
  { Icon: Send, label: "Telegram", href: SOCIAL_URLS.telegram },
];

const ABOUT_LINKS = [
  { key: "link1", href: "/blog" },
  { key: "link2", href: "/contact" },
] as const;

const googleMapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const wazeUrl = (address: string) =>
  `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

const CONTACTS = [
  {
    icon: Phone,
    label: PHONE_DISPLAY,
    tone: "bg-brand-ink",
    href: `tel:${PHONE_E164}`,
  },
  {
    icon: Phone,
    label: PHONE_DISPLAY,
    tone: "bg-[oklch(0.62_0.16_150)]",
    href: `https://wa.me/${PHONE_E164.replace("+", "")}`,
    external: true,
  },
  {
    icon: Phone,
    label: PHONE_DISPLAY,
    tone: "bg-[oklch(0.52_0.2_300)]",
    href: `viber://chat?number=${encodeURIComponent(PHONE_E164)}`,
  },
  {
    icon: Send,
    label: PHONE_DISPLAY,
    tone: "bg-[oklch(0.65_0.14_235)]",
    href: `https://t.me/${PHONE_E164}`,
    external: true,
  },
];

const COLORS = {
  waze: "#33CCFF",
  gmaps: "#EA4335",
} as const;

const GALLERY_IMAGES = [
  { mobile: "/blogImageMob2.png", desktop: "/blogImageDesk2.png" },
  { mobile: "/BlogImageMob3.png", desktop: "/blogImageDesk3.png" },
  {
    mobile: "/blogImageMob2.png",
    desktop: "/blogImageDesk4.png",
  },
  { mobile: "/BlogImageMob3.png", desktop: "/blogImageDesk3.png" },
  {
    mobile: "/blogImageMob2.png",
    desktop: "/blogImageDesk4.png",
  },
  { mobile: "/blogImageMob2.png", desktop: "/blogImageDesk2.png" },
];

function AboutPage() {
  const t = useTranslations("About");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const address = `${t("addressLine1")}, ${t("addressLine2")}`;

  return (
    <main className="px-4 md:pl-[75px] md:pr-[70px] pt-10 md:pt-20 pb-30 lg:pt-25">
      {/* Intro 1 */}
      <section className=" flex flex-col gap-20">
        <section className="flex flex-col gap-7.75">
          <h1 className="text-2xl font-extrabold tracking-tight capitalize sm:text-[40px] pb-[31px]">
            {t("title")}
          </h1>
          <div className="flex ">
            <Image
              src="/image(14).png"
              width={1296}
              height={545}
              sizes="(min-width: 1296px) 1296px, 100vw"
              className="h-auto w-full object-cover"
              alt={t("imageAlt")}
            />
          </div>
        </section>

        {/* text section 2*/}
        <section className="flex flex-col gap-8">
          <h2 className=" text-xl leading-snug font-extrabold tracking-tight capitalize sm:text-[40px]">
            {t("heading")}
          </h2>

          <div className="flex flex-col text-sm leading-relaxed text-muted-foreground sm:text-[18px]">
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
        </section>

        {/* socials 3 */}
        <section className="flex min-w-0 justify-between flex-wrap items-center gap-4 pt-8">
          <div className="flex gap-8">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Icon className="size-8 shrink-0" />
              </a>
            ))}
          </div>

          <div className="flex shrink-0 gap-3 ">
            {ABOUT_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="rounded-full border px-5 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary text-[14px] md:text-[24px] "
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </section>

        {/* Partners 4 */}
        <section>
          <div className="grid grid-cols-[minmax(0,1fr)_auto]  items-center gap-4">
            <h2 className="truncate text-xl font-extrabold tracking-tight capitalize sm:text-2xl">
              {t("partners")}
            </h2>
            <div className="flex shrink-0 items-center gap-2 ">
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {t("seeAll")}
              </span>
              <button
                aria-label={t("prev")}
                className="grid size-7 place-items-center rounded-full border hover:border-primary "
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label={t("next")}
                className=" grid size-7 place-items-center rounded-full border hover:border-primary"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="mt-5 flex gap-4 ">
            {Array.from({ length: 10}).map((_, i) => (
              <div key={i}>
                <Placeholder
                  className="aspect-square w-full rounded-lg size-[122px]"
                  label="logo"
                />
                <p className="mt-3 text-[14px] leading-tight font-extrabold capitalize">
                  {t("companyLine1")}
                  <br />
                  {t("companyLine2")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary/60 py-12 ">
          <h2 className="text-[24px] font-extrabold tracking-tight capitalize sm:text-2xl">
            {t("faqTitle")}
          </h2>

          <div className="mt-6 max-w-[720px] space-y-3">
            {FAQ_KEYS.map((key, i) => (
              <div key={key} className="rounded-lg border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium capitalize sm:text-sm"
                >
                  <span className="min-w-0 flex-1 text-[12px]">
                    {t(`faq.${key}.q`)}
                  </span>
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
          <h2 className="text-[24px] font-extrabold tracking-tight capitalize sm:text-2xl">
            {t("headOffice")}
          </h2>

          <div className="mt-5 grid gap-6 rounded-2xl bg-secondary/60 p-4 sm:p-6 lg:grid-cols-[2fr_1fr_1fr]">
            <a
              href={googleMapsUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("headOffice")}
            >
              <Placeholder
                className="aspect-[4/3] w-full rounded-xl border-2 border-primary/60"
                label="map"
              />
            </a>

            <ul className="space-y-3 text-sm lg:border-r lg:pr-6 text-[18px]  ">
              {CONTACTS.map(({ icon: Icon, label, tone, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="flex items-center gap-3 hover:text-primary "
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full ${tone}`}
                    >
                      <Icon
                        className={cn(
                          "size-3.5 text-primary-foreground ",
                          Icon === Phone ? "rotate-270" : "",
                        )}
                      />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-4 ">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 hover:text-primary"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink">
                    <Mail className="size-3.5 text-primary-foreground" />
                  </span>
                  {EMAIL}
                </a>
              </li>
            </ul>

            <ul className="space-y-4  text-[18px] ">
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
               <div className="flex items-center gap-3">
                  <a
                    href={wazeUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Waze"
                    className="grid size-7 place-items-center rounded-md"
                    style={{ backgroundColor: COLORS.waze }}
                  >
                    <SiWaze className="size-4 text-white" />
                  </a>
                  <a
                    href={googleMapsUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Maps"
                    className="grid size-7 place-items-center"
                    style={{ color: COLORS.gmaps }}
                  >
                    <SiGooglemaps className="size-5" />
                  </a>
                </div>
              <li className="flex items-center gap-3 pt-4">
                <div className="flex items-center gap-3">
                  {SOCIALS.filter(({ label }) => label !== "YouTube").map(
                    ({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        <Icon className="size-8" />
                      </a>
                    ),
                  )}
                </div>
               
                <span className="text-muted-foreground text-[18px]">
                  @ScootArea
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-xl font-extrabold tracking-tight capitalize sm:text-2xl">
            {t("gallery")}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3  md:gap-4 lg:grid-cols-3 ">
            {GALLERY_IMAGES.map((img, i) => (
              <GalleryImage key={i} {...img} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default AboutPage;
