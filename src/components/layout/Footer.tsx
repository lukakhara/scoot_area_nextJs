import { Mail, MapPin, Phone, Map as MapIcon } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkerd as Linkedin,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { EMAIL, googleMapsUrl, PHONE_E164 } from "@/lib/contact";

const socials = [
  {
    Icon: SiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/scootarea",
  },
  {
    Icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/scootarea",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/scootarea",
  },
  {
    Icon: SiTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@scootarea",
  },
];

const iconCircle =
  "flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2C3E50] text-white";




export default function Footer() {
  const t = useTranslations("Footer");

  const productLinks = [
    { label: t("scooters"), href: "/scooters" },
    { label: t("gearAndAccessories"), href: "/equiment-accessories" },
    { label: t("spareParts"), href: "/parts" },
    { label: t("repair"), href: "/repair" },
  ] as const;

  const companyLinks = [
    { label: t("blog"), href: "/blog" },
    { label: t("aboutUs"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ] as const;

 

  return (
    <footer className="border-none md:border-t bg-secondary/60">
      <div className="flex flex-col gap-8 px-5 py-10 md:grid md:grid-cols-[1fr_2fr_2fr_1.5fr] md:items-center md:gap-4 md:px-8 md:py-[52px] lg:px-[87px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logoMobile.png"
            alt="Scoot Area logo"
            width={76}
            height={76}
            className="block h-auto w-[76px] object-contain md:hidden"
          />
          <Image
            src="/logoDesk.png"
            alt="Scoot Area logo"
            width={113}
            height={88}
            className="hidden h-auto w-[113px] object-contain md:block"
          />
        </Link>

        {/* Contacts */}
        <ul className="flex flex-col gap-4 text-sm text-[#212121]">
          <li>
            <a
              href={`tel:${PHONE_E164}`}
              className="flex items-center gap-3 hover:text-primary"
            >
              <span className={iconCircle}>
                <Phone className="size-3.5" />
              </span>
              <span className="text-nowrap">+995 55 55 55</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 hover:text-primary"
            >
              <span className={iconCircle}>
                <Mail className="size-3.5" />
              </span>
              <span>{EMAIL}</span>
            </a>
          </li>
          <li>
            <a
              href={googleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-primary"
            >
              <span className={iconCircle}>
                <MapPin className="size-3.5" />
              </span>
              <span>
                რუსთაველის გამზ. 10,
                <br />
                თბილისი, საქართველო
              </span>
            </a>
          </li>
        </ul>

        {/* Links: one list on mobile, two columns on desktop */}
        <div className="flex flex-col gap-2 md:contents">
          <ul className="flex flex-col gap-2 text-sm">
            {productLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-2 text-sm">
            {companyLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-4 md:mt-0">
              <Link
                href="/sitemap"
                className="flex items-center gap-3 hover:text-primary"
              >
                <span className={iconCircle}>
                  <MapIcon className="size-3.5" />
                </span>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#2C3E50] text-white">
        <div className="flex items-center justify-between px-5 py-4 text-xs md:px-8 lg:px-[87px]">
          <span>Created By Integrals</span>
          <div className="flex gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-6 items-center justify-center rounded-full bg-white text-[#2C3E50]"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
