// ProductDetailPage.tsx — Server Component
import {
  Battery,
  CalendarDays,
  CircleCheck,
  Gauge,
  Mountain,
  Package,
  Repeat,
  Timer,
  Users,
  Weight,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProductCard } from "@/components/cards/ProductCard";
import { QuantitySelector } from "@/components/product-detail/QuantitySelector";
import { ImageThumbnailGallery } from "@/components/product-detail/ImageThumbnailGallery";
import { type Product, type ProductUnits, type Scooter } from "@/types/product";
import ProductCardImage from "../ui/ProductCardImage";
import { getDiscountInfo } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PageType = "scooter" | "accessory" | "parts";

function getScooterSpecs(
  scooter: Scooter,
  units: ProductUnits,
): { Icon: LucideIcon; label: string; value: string }[] {
  return [
    { Icon: Repeat, label: "ძრავი", value: scooter.engine },
    {
      Icon: Gauge,
      label: "სიჩქარე",
      value: `${scooter.maxSpeed} ${units.kmH}`,
    },
    {
      Icon: Zap,
      label: "მაქსიმალური მანძილი",
      value: `${scooter.maxRange} ${units.km}`,
    },
    { Icon: Weight, label: "წონა", value: `${scooter.weight} ${units.kg}` },
    {
      Icon: CalendarDays,
      label: "გამოშვების თარიღი",
      value: String(new Date(scooter.releaseDate).getFullYear()),
    },
    { Icon: CircleCheck, label: "გარანტია", value: scooter.warranty },
    { Icon: Mountain, label: "აღმართი", value: scooter.inclineAngle },
    { Icon: Timer, label: "დატენვის დრო", value: scooter.chargingTime },
    {
      Icon: Package,
      label: "მგზავრის დასაშვები წონა",
      value: `${scooter.maxRiderWeight} ${units.kg}`,
    },
    {
      Icon: Users,
      label: "მგზავრის რეკომენდირებული წონა",
      value: `${scooter.recommendedRiderWeight} ${units.kg}`,
    },
    {
      Icon: Battery,
      label: "ძრავების რაოდენობა",
      value: String(scooter.motorCount),
    },
    { Icon: CircleCheck, label: "ბორბლის ზომა", value: scooter.wheelSize },
  ];
}

export default function ProductDetailPage({
  pageType,
  product,
  similar,
  units,
}: {
  pageType: PageType;
  product: Product;
  similar?: Product[];
  units?: ProductUnits;
}) {
  const isScooter = pageType === "scooter";
  const mainImage = product.images?.[0];
  const { discountPercent } = getDiscountInfo(product);

  const hasDiscount = Boolean(product.discountPrice);
  const currentPrice = hasDiscount ? product.discountPrice : product.price;

  return (
    <div className="min-h-screen bg-background ">
      <main className="flex w-full flex-col justify-center md:px-[70px] px-4  pb-20  pt-10 md:pt-20 md:pb-30   gap-15 md:gap-20  ">
        <div
          className={
            isScooter
              ? "grid gap-8 lg:grid-cols-2"
              : "mt-5 grid gap-8 lg:mt-0 lg:grid-cols-2 lg:gap-14 lg:pt-8"
          }
        >
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`relative col-span-3 overflow-hidden rounded-2xl w-full ${
                isScooter ? "bg-card" : "bg-secondary p-4"
              }`}
            >
              {mainImage ? (
                <div className="relative w-full h-[324px] md:h-[634px] md:w-full shadow-[0_-2px_10px_0_rgba(0,0,0,0.05),2px_5px_5px_0_rgba(0,0,0,0.05)] ">
                  <ProductCardImage
                    src={mainImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover min-w-full "
                  />
                </div>
              ) : (
                <Placeholder
                  className="aspect-[4/3] w-full"
                  label={product.name}
                />
              )}

              {hasDiscount && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">
                  {discountPercent}% ფასდაკლება
                </span>
              )}
            </div>

            {isScooter && mainImage && (
              <ImageThumbnailGallery imagePath={mainImage} />
            )}
          </div>

          <div>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight uppercase sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3 lg:gap-5">
              <span
                className={cn(
                  "text-2xl font-bold  lg:text-[32px]",
                  hasDiscount && "text-[#EA2700]",
                )}
              >
                {currentPrice}₾
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through lg:text-[32px]">
                  {product.price}₾
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-stretch gap-3 border-b border-b-[#EA6200] pb-6 lg:mt-8 lg:gap-5">
              <QuantitySelector isScooter={isScooter} />

              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-[100px] border border-[#212121] px-[13px] py-[6.5px] text-[13px] md:px-6 md:py-[12.5px] md:text-[24px]"
              >
                კალათაში დამატება
              </button>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-[100px] border border-[#212121] px-[13px] py-[6.5px] text-[13px] md:px-6 md:py-[12.5px] md:text-[24px]"
              >
                ყიდვა
              </button>
            </div>

            {isScooter && units ? (
              <ul className="mt-8 space-y-3 rounded-2xl bg-[#F5F5F5] p-6 text-sm text-[#212121]">
                {getScooterSpecs(product as Scooter, units).map(
                  ({ Icon, label, value }) => (
                    <li
                      key={label}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0 text-foreground/70" />
                        {label}
                      </div>
                      <span className="font-medium text-foreground">
                        {value}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            ) : (
              !isScooter && (
                <div className="mt-8 space-y-4">
                  <p>
                    ელექტრო სკუტერი ხშირად აღწევს 25-დან 50 კმ/სთ-მდე სიჩქარეს.
                    წაქცევის ან შეჯახების შემთხვევისას, ჩაფხუტი მნიშვნელოვნად
                    ამცირებს თავის ტრავმის რისკს. ეს არ არის არჩევანი — ეს
                    აუცილებლობაა.
                  </p>
                  <div className="space-y-2 ">
                    <div>ძირითადი მახასიათებლები:</div>
                    <ul className=" list-disc pl-4">
                      <li>
                        სერტიფიცირებული დაცვა (CE / EN 1078 / DOT) - შეესაბამება
                        ევროპულ და საერთაშორისო სტანდარტებს
                      </li>
                      <li>
                        მსუბუქი კონსტრუქცია - კომფორტული ხანგრძლივი ტარებისთვის
                      </li>
                      <li>
                        ვენტილაციის სისტემა - სუნთქვისუნარიანი მასალა, რომელიც
                        ხელს უშლის გადახურებას
                      </li>
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {isScooter && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold xl:text-[40px]">
              რატომ ნაინბოტ {product.name}? {/* about: {product.name} */}
            </h2>

            <div className="mt-4 flex flex-col gap-6 ">
              {/* {product.description} */}
              <p>
                სეგვეის ნაინბოტ სი20 არის ელექტრო ქიქსკუტერების სერიის ნაწილი,
                რომელიც შექმნილია ექსკლუზიურად მოზარდებისთვის. დამატებითი
                ყურადღება დაეთმო უსაფრთხოების მახასიათებლებს, როგორიცაა
                ელასტიური რეზინის საბურავები, რაც უზრუნველყოფს სუპერ მოჭიდებას
                ზედაპირზე. ქიქ სკუტერი არის ძალიან მსუბუქი (10 კგ) და შეიძლება
                დაიკეცოს ერთი ხელით.
              </p>
              <p>
                ატმოსფერული განათება განლაგებულია საფეხურის ქვედა ნაწილში და
                არის 3 სხვადასხვა ფერში, ტარების რეჟიმის მიხედვით. ბატარეა
                მოთავსებულია საფეხურზე, რომელიც ინარჩუნებს სიმძიმის ცენტრს დაბალ
                დონეზე და აადვილებს სკუტერის მართვას. ჩართვის ღილაკი
                ინტეგრირებულია დროსელზე და ასევე გამოიყენება ტარების რეჟიმებს
                შორის გადასართავად. კარგი ხახუნის TPR (თერმოპლასტიკური რეზინის)
                სახელური, რომელიც ასევე ადვილად იწმინდება, გამოიყენება მეტი
                კომფორტისა და სტაბილურობის შესაქმნელად.
              </p>
              <p>
                გარდა ამისა ქიქსკუტერი აღჭურვილია ხელით მომუშავე უკანა მუხრუჭით,
                რაც ყოველთვის უზრუნველყოფს დამუხრუჭების უსაფრთხო მანძილს.
                სკუტერის სრულად დამუხტვა შესაძლებელია სულ რაღაც 5 საათში.
                ჭკვიანი ბატარეის მართვის სისტემა (BMS) აკონტროლებს, რომ
                ელექტროენერგია არ დაიკარგოს ბატარეის მუშაობის დროს, რათა თავიდან
                აიცილოს ისეთი კრიტიკული სიტუაციები, როგორიცაა გადატვირთვა და
                განმუხტვა, გადახურება, მოკლე ჩართვა და სხვა.
              </p>
            </div>
          </div>
        )}

        {isScooter && (
          <div>
            <section className=" grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from([
                "/blogImageDesk2.png",
                "/blogImageDesk3.png",
                "/blogImageDesk4.png",
                "/blogImageDesk3.png",
                "/blogImageDesk4.png",
                "/blogImageDesk2.png",
              ]).map((image, i) => (
                <Image
                  src={image}
                  key={i}
                  alt="Product Image"
                  width={411}
                  height={411}
                  className="aspect-[4/3] w-full rounded-xl"
                />

                // <Placeholder
                //   key={i}
                //   className="aspect-[4/3] w-full rounded-xl"
                //   label="photo"
                // />
              ))}
            </section>
          </div>
        )}

        <section className="pt-5 md:pt-10 ">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
            მსგავსი პროდუქცია
          </h2>
          <div
            className={
              isScooter
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
            }
          >
            {!similar ? (
              <p>Similar products could not be fetched.</p>
            ) : similar.length === 0 ? (
              <p>No similar products found.</p>
            ) : (
              similar.map((item) => <ProductCard key={item.id} item={item} />)
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
