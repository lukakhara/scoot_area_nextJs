'use client'
import { useState } from "react";

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
import { Placeholder } from "@/components/Placeholder";
// import desktopImage from "/public/aboutUs.png";
// import mobileImage from "/public/aboutUsMobile.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PARAGRAPHS = [
  "ჩვენ გვჯერა, რომ გადაადგილება უნდა იყოს მარტივი, სწრაფი და ეკოლოგიურად სუფთა. სწორედ ამიტომ დაფუძნდა ScootArea — ბრენდი, რომელიც ქალაქურ გადაადგილებას აკავშირებს თანამედროვე ტექნოლოგიებთან, სტილთან და პასუხისმგებლობასთან.",
  "ScootArea გთავაზობთ მრავალფეროვან არჩევანს ხარისხიან და სანდო ელექტრო სკუტერებში, ეკიპირებასა და სათადარიგო ნაწილებში. ჩვენთან დაგხვდებათ ყველაფერი, რაც სჭირდება შენს გადაადგილებას — პროდუქტი, ტექნიკური მხარდაჭერა და ცოდნა, რომელიც გზას თავდაჯერებულად გატარებს.",
  "ჩვენი მიზანია, შევქმნათ ისეთი სივრცე, სადაც მომხმარებელი გრძნობს კომფორტს, იღებს მომსახურებას მაღალ დონეზე და ხვდება ისეთ ადამიანებს, რომლებიც მასავით ენთუზიაზმით უყურებენ მოძრაობას.",
  "გადაადგილება მხოლოდ მოძრაობა არ არის — ეს არის თავისუფლება, დრო და არჩევანი. ScootArea გეხმარება, რომ ეს არჩევანი იყოს შენზე მორგებული.",
  "გვჯერა, რომ მომავალი ელექტრულია — და ჩვენ მზად ვართ, შენც გაგიზიაროთ ეს მომავალი დღესვე.",
];
const FAQ = [
  {
    q: "როგორ შევიძინო ელექტრო სკუტერი?",
    a: "აირჩიეთ სასურველი მოდელი კატალოგში, დაამატეთ კალათაში და გააფორმეთ შეკვეთა. მიტანა ხდება 1-3 სამუშაო დღეში.",
  },
  {
    q: "რა უპირატესობაა ამჟამ სკუტარეაში შეძენას?",
    a: "ოფიციალური გარანტია, ავტორიზებული სერვის-ცენტრი, სათადარიგო ნაწილების მარაგი და ტექნიკური კონსულტაცია.",
  },
  {
    q: "მოქმედებს თუ არა საგარანტიო პირობები პროდუქციაზე?",
    a: "დიახ, ყველა სკუტერს აქვს მწარმოებლის გარანტია, ხოლო აქსესუარებზე ვრცელდება ინდივიდუალური პირობები.",
  },
];

const CONTACTS = [
  { icon: Phone, label: "+995 55 55 55", tone: "bg-brand-ink" },
  { icon: Phone, label: "+995 55 55 55", tone: "bg-[oklch(0.62_0.16_150)]" },
  { icon: Phone, label: "+995 55 55 55", tone: "bg-[oklch(0.52_0.2_300)]" },
  { icon: Send, label: "+995 55 55 55", tone: "bg-[oklch(0.65_0.14_235)]" },
];

function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Intro */}
        <section className="mx-auto max-w-[1400px] px-5 pt-8 pb-12 lg:pt-12">
          <h1 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            ჩვენს შესახებ
          </h1>
          <picture>
            <source media="(min-width: 768px)" srcSet="/aboutUsMobile.png" />
            <Image
              src="/aboutUs.png"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
              alt="product image"
            />
          </picture>

          <h2 className="mt-10 text-xl leading-snug font-extrabold tracking-tight uppercase sm:text-3xl">
            შენს გადაადგილებას ახალი მიმართულება აქვს
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              <strong className="text-foreground">ScootArea</strong> — ეს არის
              გზა, რომელიც შენით იწყება, მაგრამ მარტო არასდროს გატარებ.
            </p>
          </div>

          {/* Socials + links */}
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-4">
              {[Facebook, Youtube, Instagram, Linkedin, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="hover:text-primary"
                >
                  <Icon className="size-6 shrink-0" />
                </a>
              ))}
            </div>
            <div className="flex shrink-0 gap-3">
              {["ლინკი 1", "ლინკი 2"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="rounded-full border px-5 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="mx-auto max-w-[1400px] px-5 pb-14">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
              პარტნიორები
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-xs text-muted-foreground sm:inline">
                ყველას ნახვა
              </span>
              <button
                aria-label="უკან"
                className="grid size-7 place-items-center rounded-full border hover:border-primary"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="წინ"
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
                  კომპანიის
                  <br />
                  სახელი
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary/60 py-12">
          <div className="mx-auto max-w-[1400px] px-5">
            <h2 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
              ხშირად დასმული კითხვები
            </h2>

            <div className="mt-6 max-w-[720px] space-y-3">
              {FAQ.map((item, i) => (
                <div key={i} className="rounded-lg border bg-card">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium uppercase sm:text-sm"
                  >
                    <span className="min-w-0 flex-1">{item.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="border-t px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Head office */}
        <section className="mx-auto max-w-[1400px] px-5 py-12">
          <h2 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
            სათაო ოფისი
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
                    <Icon className={cn(" size-3.5 text-primary-foreground", Icon === Phone ? "rotate-270" : "")} />
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

        {/* Gallery */}
        <section className="mx-auto max-w-[1400px] px-5 pb-16">
          <h2 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl">
            გალერეა
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Placeholder
                key={i}
                className="aspect-[4/3] w-full rounded-xl"
                label="gallery"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
