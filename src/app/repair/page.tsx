import { Clock, Phone } from "lucide-react";
import Image from "next/image";

const Repair = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
      <h1 className="max-w-xl text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
        შეკეთება
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8.5">
        <picture>
          <source src="/repairDes.png" media="(min-width : 768px)" />
          <Image
            src="/repairMob.png"
            alt="repairing image"
            width={629}
            height={639}
          />
        </picture>
        <div className="flex gap-18 flex-col">
          <p>
            ScootArea მხოლოდ სკუტერების გაყიდვით არ შემოიფარგლება — ჩვენ
            ვზრუნავთ იმაზე, რომ შენი სკუტერი მუდამ სამუშაო მდგომარეობაში იყოს.
            შესრულებული სერვისები მოიცავს დიაგნოსტიკას, ტექნიკური ხარვეზების
            გამოსწორებას, ელემენტებისა და ნაწილების შეცვლას, ბატარეის ან ძრავის
            პრობლემების მოგვარებას და სხვა. ჩვენი სერვისი უზრუნველყოფილია
            სერტიფიცირებული ხელოსნებით, რომლებიც კარგად იცნობენ როგორც ჩვენს
            მოდელებს, ისე ზოგად ბაზარზე გავრცელებულ ბრენდებს.ვმუშაობთ სწრაფად,
            გამოყენებული ნაწილები შეესაბამება ხარისხის სტანდარტებს და
            მომხმარებლისთვის ყოველთვის ღია ვართ დეტალური კონსულტაციისთვის. თუ
            შენს სკუტერს სჭირდება პროფესიული შეკეთება ან ტექნიკური შემოწმება —
            დაგვიკავშირდი დღესვე.
          </p>
          <div className="flex flex-col gap-4 ">
            <div>
              <Phone className=" size-3.5 text-primary-foreground" />
              ხელოსნის ნომერი: +995 55 55 55
            </div>
            <div>
              <Clock className=" size-3.5 text-primary-foreground" />
              სამუშაო საათები:ორშაბათი-შაბათი | 10:00 - 18:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repair;
