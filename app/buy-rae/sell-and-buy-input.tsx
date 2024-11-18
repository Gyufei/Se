import Image from "next/image";
import { cn } from "@/lib/utils/common";
import { NumericalInput } from "@/components/share/numerical-input";
import TokenSelect from "./token-select";
import { IToken } from "@/lib/types/token";
import { formatNumber } from "@/lib/utils/number";

export default function SellAndBuyInput({
  payToken,
  setPayToken,
  payAmount,
  setPayAmount,
  buyAmount,
  setBuyAmount,
}: {
  payToken: IToken;
  setPayToken: any;
  payAmount: any;
  setPayAmount: any;
  buyAmount: any;
  setBuyAmount: any;
}) {
  const sellPrice = Number(payAmount) * 2233.1;

  return (
    <>
      <div className="bg-[#281A31] p-5 flex justify-between">
        <div className="flex-1">
          <div className="text-base text-white opacity-60">Sell</div>
          <NumericalInput
            className="mr-2 mt-[10px] h-[50px] w-full text-left text-3xl text-white bg-transparent placeholder:opacity-50 placeholder:text-2xl"
            placeholder="Input Sell Amount"
            value={payAmount}
            onUserInput={setPayAmount}
          />
          <div className="text-xl text-white opacity-60 mt-2">
            ${formatNumber(sellPrice)}
          </div>
        </div>
        <div className="flex items-end">
          <TokenSelect token={payToken} setToken={setPayToken} />
        </div>
      </div>

      <ArrowBetween className="-my-4 self-center" />

      <div className="bg-[#281A31] p-5 flex justify-between">
        <div className="flex-1">
          <div className="text-base text-white opacity-60">Buy</div>
          <NumericalInput
            className="mr-1 mt-[10px] w-full h-[50px] text-left text-3xl text-white bg-transparent placeholder:opacity-50 placeholder:text-2xl"
            placeholder="Input Buy Amount"
            value={buyAmount}
            onUserInput={setBuyAmount}
          />
          <div className="text-xl text-white opacity-60 mt-2">-</div>
        </div>
        <div className="flex items-end">
          <div className="h-10 flex w-[112px] cursor-pointer items-center justify-center rounded-none bg-[#382743]">
            <Image
              width={18}
              height={18}
              src="/icons/rae.svg"
              alt="selected token"
              className="mr-2 rounded-full"
            ></Image>
            <div className="pr-[4px] text-sm leading-5 text-white">RAE</div>
          </div>
        </div>
      </div>
    </>
  );
}

function ArrowBetween({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-lg border-4 border-[#1D0E27] bg-[#281A31]",
        className,
      )}
    >
      <Image src="/icons/arrow-down.svg" width={24} height={24} alt="down" />
    </div>
  );
}
