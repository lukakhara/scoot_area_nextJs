import { Plus } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { ScooterCompare } from "@/types/product";
import ProductCardImage from "@/components/ui/ProductCardImage";


type ScootersResponse = {
  data: ScooterCompare[];
};

const CANDIDATES = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  title: "Ninebot by Segway - F30 Plus",
  color: "ფერი: შავი",
  price: "750.00₾",
}));

export  default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scooters`);
  if(!res.ok){
    throw new Error(`Failed to fetch data`);
  }
  const {data:scooters}:ScootersResponse = await res.json();

  console.log(scooters);
  

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
        <h1 className="text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
          შეადარე სასურველი პროდუქტები
        </h1>

        {/* Selection list */}
        <section className="mt-6">
          <div className="hidden grid-cols-[minmax(0,1fr)_140px_40px] items-center gap-4 border-b pb-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase sm:grid">
            <span>პროდუქტი</span>
            <span>ფასი</span>
            <span />
          </div>

          <ul>
            {scooters.map((scooter) => (
              <li
                key={scooter.id}
                className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 border-b py-4 sm:grid-cols-[minmax(0,1fr)_140px_40px]"
              >
                <div className="flex  items-center gap-4 sm:col-span-1">
                  <div className="size-32">
                    <ProductCardImage src={scooter.images[0]} alt={`${scooter.name}'s image` } width={128} height={128}/>
                  </div>
                 
                
                  <div className=" flex flex-col">
                    <p className=" text-xs font-bold uppercase ">
                      {scooter.name}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      scooter.color temporarily
                    </p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-muted-foreground">
                  {scooter.price}₾
                </span>

                <button
                  aria-label="არჩევა"
                  
                  className={`justify-self-end flex size-4 items-center justify-center rounded-full border transition-colors ${
                    true
                      ? "border-sale bg-sale"
                      : "border-border"
                  }`}
                />
              </li>
            ))}
          </ul>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-semibold uppercase transition-colors hover:border-primary hover:text-primary">
            <Plus className="size-4" /> შედარება
          </button>
        </section>
      </main>
    </div>
  );
}
