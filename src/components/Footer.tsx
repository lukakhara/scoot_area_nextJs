import { Mail, MapPin, Phone, Map as MapIcon } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkerd  } from "@icons-pack/react-simple-icons";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/60">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 md:grid-cols-2 lg:grid-cols-4 align-content-start">
         <picture className="block w-full h-full ">
                <source
                  media="(min-width: 768px)"
                  srcSet='/logoDesk.png'
      
                />
                <Image
                  src='/logoMobile.png'
                  className=" w-full h-full max-w-[140px]  object-cover relative -top-9 left-0"
                  alt="product image"
                  height={140}
                  width={140}
                />
          </picture>

        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Phone className="size-4 text-primary" /> +995 55 55 55
          </li>
          <li className="flex items-center gap-2">
            <Mail className="size-4 text-primary" /> Scootarea@info.ge
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 text-primary" /> რუსთაველის გამზ. 10, თბილისი, საქართველო
          </li>
        </ul>

        <ul className="space-y-2 text-sm">
          {["სკუტერები", "ელექტრო ველოსიპედები", "სათადარიგო ნაწილები", "შეკეთება"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-primary">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <ul className="space-y-2 text-sm">
          
          {["ბლოგი", "ჩვენს შესახებ", "კონტაქტი"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-primary">
                {l}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <MapIcon className="size-4 text-primary" />
            <a href="#" className="hover:text-primary">
              Sitemap
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-full bg-[#2C3E50]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-4 text-xs   text-white">
          <span >Created By Integrais</span>
          <div className="flex gap-3">
            <SiFacebook className="size-4" />
            <SiInstagram className="size-4" />
            <SiLinkerd className="size-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
