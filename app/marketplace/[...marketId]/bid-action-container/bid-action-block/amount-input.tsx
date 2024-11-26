import Image from "next/image";
import { NumericalInput } from "@/components/share/numerical-input";

export default function AmountInput({
  amount,
  setAmount,
}: {
  amount: string;
  setAmount: (amount: string) => void;
}) {
  function handleDecrease() {
    if (Number(amount) > 0) {
      setAmount(String(Number(amount) - 1));
    }
  }

  function handleIncrease() {
    setAmount(String(Number(amount) + 1));
  }

  return (
    <div className="flex items-center space-x-3">
      <div
        onClick={handleDecrease}
        className="cursor-pointer h-12 w-12 flex items-center justify-center border border-[#ffffff20]"
      >
        <Image
          src="/icons/minus-border.svg"
          width={48}
          height={48}
          alt="minus"
        />
      </div>
      <div>
        <NumericalInput
          className="h-12 w-[100px] rounded-none bg-transparent border border-[#ffffff20] text-white text-center focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
          placeholder="0"
          value={amount}
          onUserInput={(v) => setAmount(v)}
        />
      </div>
      <div
        onClick={handleIncrease}
        className="cursor-pointer h-12 w-12 flex items-center justify-center border border-[#ffffff20]"
      >
        <Image
          src="/icons/plus-border.svg"
          width={48}
          height={48}
          alt="minus"
        />
      </div>
    </div>
  );
}
