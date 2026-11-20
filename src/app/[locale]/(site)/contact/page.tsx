import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaViber,
  FaTelegramPlane,
  FaWaze,
} from "react-icons/fa";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
import { SiGooglemaps } from "react-icons/si";
import { cn } from "@/lib/utils";
import { PHONE_DISPLAY, PHONE_E164, EMAIL } from "@/lib/contact";


const COLORS = {
  ink: "#111827",
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  tiktok: "#000000",
  whatsapp: "#25D366",
  viber: "#7360F2",
  telegram: "#229ED9",
  waze: "#33CCFF",
  gmaps: "#EA4335",
} as const;

const PHONE_DIGITS = PHONE_E164.replace("+", "");




type IconItem = { icon: IconType; color: string };

const SOCIALS: (IconItem & { href: string; label: string })[] = [
  {
    icon: FaFacebookF,
    color: COLORS.facebook,
    href: "https://www.facebook.com/scootarea",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    color: COLORS.instagram,
    href: "https://www.instagram.com/scootarea",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    color: COLORS.linkedin,
    href: "https://www.linkedin.com/company/scootarea",
    label: "LinkedIn",
  },
  {
    icon: FaTiktok,
    color: COLORS.tiktok,
    href: "https://www.tiktok.com/@scootarea",
    label: "TikTok",
  },
];

const CONTACTS: (IconItem & {
  label: string;
  href: string;
  external?: boolean;
})[] = [
  {
    icon: FiPhone,
    color: COLORS.ink,
    label: PHONE_DISPLAY,
    href: `tel:${PHONE_E164}`,
  },
  {
    icon: FaWhatsapp,
    color: COLORS.whatsapp,
    label: PHONE_DISPLAY,
    href: `https://wa.me/${PHONE_DIGITS}`,
    external: true,
  },
  {
    icon: FaViber,
    color: COLORS.viber,
    label: PHONE_DISPLAY,
    href: `viber://chat?number=${encodeURIComponent(PHONE_E164)}`,
  },
  {
    icon: FaTelegramPlane,
    color: COLORS.telegram,
    label: PHONE_DISPLAY,
    href: `https://t.me/${PHONE_E164}`,
    external: true,
  },
];

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("რუსთაველის გამზ. 10, თბილისი, საქართველო");

const LOCATIONS = [
  {
    title: "სათაო ოფისი",
    hours: "ორშაბათი–შაბათი | 10:00 - 18:00",
    address: "რუსთაველის გამზ. 10, თბილისი, საქართველო",
  },
  {
    title: "ბათუმი",
    hours: "ორშაბათი–შაბათი | 10:00 - 18:00",
    address: "რუსთაველის გამზ. 10, თბილისი, საქართველო", // TODO: Batumi address
  },
];

const googleMapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const wazeUrl = (address: string) =>
  `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

function Badge({
  icon: Icon,
  color = COLORS.ink,
  className,
  iconClassName = "size-4",
}: {
  icon: IconType;
  color?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      style={{ backgroundColor: color }}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full text-white ",
        className,
      )}
    >
      <Icon className={iconClassName} />
    </span>
  );
}

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col gap-4 px-4 pt-10 pb-20 md:px-18 md:pt-20 md:pb-30">
      <h1 className="text-[24px] font-extrabold uppercase tracking-tight sm:text-[40px]">
        კონტაქტი
      </h1>

      <div className="-mx-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 bg-muted px-4 py-8 md:-mx-18 md:px-18">
        <h2 className="text-[16px] font-extrabold uppercase tracking-tight sm:text-[22px]">
          სოციალური ქსელები
        </h2>
        <div className="flex items-center gap-2.5">
          {SOCIALS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge icon={icon} className="bg-[#2C3E50] md:size-8 size-5.5" />
            </a>
          ))}
          <span className="text-[14px] md:text-[18px] text-[#2C3E50]">
            @ScootArea
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-13 pt-15 md:pt-20">
        {LOCATIONS.map(({ title, hours, address }) => (
          <section key={title}>
            <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
              {title}
            </h2>
            <div className="mt-4 grid gap-8 rounded-2xl bg-card p-4 shadow-md lg:grid-cols-[1.3fr_0.5fr_0.9fr]">
              <a
                href={googleMapsUrl(address)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} – Google Maps`}
                className="grid aspect-[2/1] w-full place-items-center rounded-xl border border-primary bg-muted text-primary"
              >
                <FiMapPin className="size-8" />
              </a>

              <div className="flex flex-col gap-9 border-b md:border-b-0 border-[#9E9E9E] md:border-r pb-6 md:pb-0 text-[18px]">
                <div className="flex flex-col gap-4">
                  {CONTACTS.map(({ icon, color, label, href, external }) => (
                    <a
                      key={href}
                      href={href}
                      {...(external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="flex items-center gap-3 hover:text-primary"
                    >
                      <Badge icon={icon} color={color} className="size-9" />
                      {label}
                    </a>
                  ))}
                </div>

                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 pt-4 hover:text-primary"
                >
                  <Badge icon={FiMail} color={COLORS.ink} className="size-9" />
                  {EMAIL}
                </a>
              </div>

              <ul className="flex flex-col gap-4 text-sm text-[18px]">
                <li className="flex items-center gap-3">
                  <Badge icon={FiClock} color={COLORS.ink} className="size-9" />
                  {hours}
                </li>
                <li className="flex items-start gap-3">
                  <Badge
                    icon={FiMapPin}
                    color={COLORS.ink}
                    className="size-9"
                  />
                  <span>{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <a
                    href={wazeUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Waze"
                  >
                    <Badge
                      icon={FaWaze}
                      color={COLORS.waze}
                      className="size-9 rounded-md"
                    />
                  </a>
                  <a
                    href={googleMapsUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Maps"
                    className="grid size-9 place-items-center"
                    style={{ color: COLORS.gmaps }}
                  >
                    <SiGooglemaps className="size-5" />
                  </a>
                </li>

                <li className="flex items-baseline gap-4 pt-4 md:hidden">
                  <div className="flex items-baseline gap-3">
                    {SOCIALS.map(({ icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-6"
                      >
                        <Badge icon={icon} className="bg-[#2C3E50]" />
                      </a>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    @ScootArea
                  </span>
                </li>
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
