import React from "react";
import { Placeholder } from "../components/Placeholder";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  SiFacebook as Facebook,
  SiInstagram as Instagram,
  SiLinkerd as Linkedin,
} from "@icons-pack/react-simple-icons";

const CONTACTS = [
  { icon: Phone, label: "+995 55 55 55", tone: "bg-brand-ink" },
  { icon: Phone, label: "+995 55 55 55", tone: "bg-[oklch(0.62_0.16_150)]" },
  { icon: Phone, label: "+995 55 55 55", tone: "bg-[oklch(0.52_0.2_300)]" },
  { icon: Send, label: "+995 55 55 55", tone: "bg-[oklch(0.65_0.14_235)]" },
];

const ContactPage = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
        კონტაქტი
      </h1>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gray-300 flex items-center gap-4 py-6 px-22">
        <h1 className="text-md font-extrabold tracking-tight uppercase sm:text-3xl ">
          სოციალური ქსელები{" "}
        </h1>
        <div className="flex gap-4">
          <Facebook />
          <Instagram />
          <Linkedin />
          <div>@ScootArea</div>
        </div>
      </div>
      <div>
        <section className="pt-10">
          <h1 className="text-xl font-extrabold tracking-tight uppercase sm:text-xl">
            სათაო ოფისი
          </h1>
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
                    <Icon className="size-3.5 text-primary-foreground" />
                  </span>
                  {label}
                </li>
              ))}
              <li className="flex items-center gap-3 border-t pt-4">
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
                ორშაბათი–შაბათი | 10:00 – 18:00
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink">
                  <MapPin className="size-3.5 text-primary-foreground" />
                </span>
                <span>
                  რუსთაველის გამზ. 10
                  <br />
                  თბილისი, საქართველო
                </span>
              </li>
              <li className="flex items-center gap-3 border-t pt-4">
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
        <section className="">
          <h1 className="text-xl font-extrabold tracking-tight uppercase sm:text-xl">
            ბათუმი
          </h1>
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
                    <Icon className="size-3.5 text-primary-foreground" />
                  </span>
                  {label}
                </li>
              ))}
              <li className="flex items-center gap-3 border-t pt-4">
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
                ორშაბათი–შაბათი | 10:00 – 18:00
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink">
                  <MapPin className="size-3.5 text-primary-foreground" />
                </span>
                <span>
                  რუსთაველის გამზ. 10
                  <br />
                  თბილისი, საქართველო
                </span>
              </li>
              <li className="flex items-center gap-3 border-t pt-4">
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
      </div>
    </div>
  );
};

export default ContactPage;
