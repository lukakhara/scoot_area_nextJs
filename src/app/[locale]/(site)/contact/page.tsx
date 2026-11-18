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

type IconItem = { icon: IconType; color: string };

const SOCIALS: (IconItem & { href: string; label: string })[] = [
  { icon: FaFacebookF, color: COLORS.facebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, color: COLORS.instagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, color: COLORS.linkedin, href: "#", label: "LinkedIn" },
  { icon: FaTiktok, color: COLORS.tiktok, href: "#", label: "TikTok" },
];

const CONTACTS: (IconItem & { label: string })[] = [
  { icon: FiPhone, color: COLORS.ink, label: "+995 55 55 55" },
  { icon: FaWhatsapp, color: COLORS.whatsapp, label: "+995 55 55 55" },
  { icon: FaViber, color: COLORS.viber, label: "+995 55 55 55" },
  { icon: FaTelegramPlane, color: COLORS.telegram, label: "+995 55 55 55" },
];

const LOCATIONS = [
  { title: "სათაო ოფისი", hours: "ორშაბათი–შაბათი | 10:00 - 18:00" },
  { title: "ბათუმი", hours: "ორშაბათი–შაბათი | 10:00 - 18:00" },
];

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
          {SOCIALS.map(({ icon, color, href, label }) => (
            <a key={label} href={href} aria-label={label}>
              <Badge icon={icon} className="bg-[#2C3E50] md:size-8 size-5.5" />
            </a>
          ))}
          <span className="text-[14px] md:text-[18px] text-[#2C3E50]">@ScootArea</span>
        </div>
      </div>

      <div className="flex flex-col gap-13 pt-15 md:pt-20">
        {LOCATIONS.map(({ title, hours }, idx) => (
          <section key={title}>
            <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
              {title}
            </h2>
            <div className="mt-4 grid gap-8 rounded-2xl bg-card p-4 shadow-md lg:grid-cols-[1.3fr_0.5fr_0.9fr]">
              <div className="grid aspect-[2/1] w-full place-items-center rounded-xl border border-primary bg-muted text-primary">
                <FiMapPin className="size-8" />
              </div>

              <div className="flex flex-col gap-9 border-b border-[#9E9E9E] md:border-r pb-6 md:pb-0 text-[18px]">
                <div className="flex flex-col gap-4  ">
                  {CONTACTS.map(({ icon, color, label }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Badge icon={icon} color={color} className="size-9" />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Badge icon={FiMail} color={COLORS.ink} className="size-9" />
                  Scootarea@info.ge
                </div>
              </div>

              <ul className="flex flex-col gap-4 text-sm  text-[18px]">
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
                  <span>
                    რუსთაველის გამზ. 10
                    <br />
                    თბილისი, საქართველო
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <a href="#" aria-label="Waze">
                    <Badge
                      icon={FaWaze}
                      color={COLORS.waze}
                      className="size-9 rounded-md"
                    />
                  </a>
                  <a
                    href="#"
                    aria-label="Google Maps"
                    className="grid size-9 place-items-center"
                    style={{ color: COLORS.gmaps }}
                  >
                    <SiGooglemaps className="size-5" />
                  </a>
                </li>

                <div className="flex items-baseline pt-4 gap-4 md:hidden">
                  <div className="flex items-baseline gap-3">
                    {SOCIALS.map(({ icon, color, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="size-6"
                      >
                        <Badge icon={icon} className="bg-[#2C3E50]  " />
                      </a>
                    ))}
                  </div>

                  <span className="text-sm text-muted-foreground">
                    @ScootArea
                  </span>
                </div>
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
