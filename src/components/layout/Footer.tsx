import { Mail, MapPin, Phone, Map as MapIcon } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,

  SiTiktok,
} from "@icons-pack/react-simple-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";

const socials = [
  { Icon: SiFacebook, label: "Facebook", href: "#" },
  { Icon: SiInstagram, label: "Instagram", href: "#" },
  { Icon: SiInstagram, label: "LinkedIn", href: "#" },
  { Icon: SiTiktok, label: "TikTok", href: "#" },
];

const iconCircle =
  "flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2C3E50] text-white";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t bg-secondary/60">
      <div className="flex flex-col gap-8 px-5 py-10 md:grid md:grid-cols-[1fr_2fr_2fr_1.5fr] md:items-center md:gap-4 md:px-8 md:py-[52px] lg:px-[87px]">
        {/* Logo */}
        <div>
          <Image
            src="/logoMobile.png"
            alt="Scoot Area logo"
            width={76}
            height={58}
            className="block h-auto w-[76px] object-contain md:hidden"
          />
          <Image
            src="/logoDesk.png"
            alt="Scoot Area logo"
            width={113}
            height={88}
            className="hidden h-auto w-[113px] object-contain md:block"
          />
        </div>

        {/* Contacts */}
        <ul className="flex flex-col gap-4 text-sm text-[#212121]">
          <li className="flex items-center gap-3">
            <span className={iconCircle}>
              <Phone className="size-3.5" />
            </span>
            <p className="text-nowrap">+995 55 55 55</p>
          </li>
          <li className="flex items-center gap-3">
            <span className={iconCircle}>
              <Mail className="size-3.5" />
            </span>
            <p>Scootarea@info.ge</p>
          </li>
          <li className="flex items-center gap-3">
            <span className={iconCircle}>
              <MapPin className="size-3.5" />
            </span>
            <p>
              რუსთაველის გამზ. 10,
              <br />
              თბილისი, საქართველო
            </p>
          </li>
        </ul>

        {/* Links: one list on mobile, two columns on desktop */}
        <div className="flex flex-col gap-2 md:contents">
          <ul className="flex flex-col gap-2 text-sm">
            {[
              t("scooters"),
              t("electricBicycles"),
              t("spareParts"),
              t("repair"),
            ].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-2 text-sm">
            {[t("blog"), t("aboutUs"), t("contact")].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
            <li className="mt-4 flex items-center gap-3 md:mt-0">
              <span className={iconCircle}>
                <MapIcon className="size-3.5" />
              </span>
              <a href="#" className="hover:text-primary">
                Sitemap
              </a>
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