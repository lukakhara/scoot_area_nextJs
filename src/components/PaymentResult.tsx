import { BadgeCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

type PaymentResult = "success" | "error";

interface PaymentResultProps {
  result: PaymentResult;
  orderNumber?: string;
}

const PaymentResult = ({
  result,
  orderNumber = "00000",
}: PaymentResultProps) => {
    const router = useRouter();

  const isSuccess = result === "success";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center">
        {isSuccess ? (
          <>
            <BadgeCheck
              size={48}
              strokeWidth={1.8}
              className="mb-6 text-green-500"
            />

            <h1 className="text-xl font-normal text-[#111]">
              თქვენი გადახდა მიღებულია
            </h1>

            <p className="mt-1 text-[15px] text-[#777]">
              შეკვეთის ნომერი #{orderNumber}
            </p>
          </>
        ) : (
          <>
            <CircleX
              size={42}
              strokeWidth={1.5}
              className="mb-6 text-orange-500"
            />

            <h1 className="text-xl font-normal text-[#111]">
              გადახდა არ განხორციელდა
            </h1>
          </>
        )}

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-10 rounded-full border border-[#555] px-4 py-2 text-[15px] text-[#333] transition-colors hover:bg-gray-50"
        >
          დაბრუნება მთავარ გვერდზე
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;