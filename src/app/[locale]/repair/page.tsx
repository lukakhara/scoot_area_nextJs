import { Clock, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Repair() {
  const t = await getTranslations("Repair");

  return (
    <div className="px-4 md:pl-[75px] md:pr-[70px] pt-10 md:pt-20 pb-30 lg:pt-12">
      <h1 className="mb-4 max-w-xl text-[40px] font-bold tracking-tight capitalize sm:text-4xl lg:mb-8">
        {t("title")}
      </h1>

      <div className="flex flex-col md:flex-row  gap-8 lg:gap-9">
        <div className="relative aspect-[629/639] w-full  rounded-[20px] flex-1">
          <Image
            src="/repairDes.png"
            alt="Technician repairing a scooter wheel"
            width={629}
            height={634}
            className="object-cover w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col  gap-18 md:min-h-full flex-1">
          <div className="flex flex-col text-[14px] md:text-[20px]  text-[#606060] ">
            <p>
              {t("aboutScootarea")}
            </p>
            <p className="w-full invisible">. </p>
            <p>
             {t("containing")}
            </p>
            <p className="w-full invisible">. </p>
            <p>
               {t("aboutSpecialists")}
            </p>
          </div>

          <ul className="flex flex-col gap-4 text-[12.14px] md:text-[18px] font-medium">
            <li className="flex items-center gap-3 ">
              <span className="flex size-[20.23px] md:size-7.5 shrink-0 items-center justify-center rounded-full bg-slate-700">
                <Phone className="size-[9.44px] md:size-3.5 text-white" />
              </span>
              {t("mechanicNumber")}: +995 55 55 55 55
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-[20.23px] md:size-7.5 shrink-0 items-center justify-center rounded-full bg-slate-700">
                <Clock className="size-[9.44px] md:size-3.5 text-white" />
              </span>
              {t("workingHours")} | 10:00 – 18:00
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
