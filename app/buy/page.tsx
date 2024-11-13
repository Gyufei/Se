"use client";
import { NumericalInput } from "@/components/share/numerical-input";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/common";
import TokenSelect from "./token-select";
import { IToken } from "@/lib/types/token";

export default function BuyPage() {
  const [sellAmount, setSellAmount] = useState("0");
  const [sellToken, setSellToken] = useState<IToken>({
    symbol: "",
    logoURI: "/icons/empty.svg",
    decimals: 9,
  } as IToken);
  const sellPrice = Number(sellAmount) * 2233;

  return (
    <div className="flex flex-col items-center pt-[100px]">
      <div className="text-[40px] font-medium text-white">Buy RAE</div>

      <div className="mt-5 bg-[#1D0E27] flex flex-col items-stretch p-6 w-[440px]">
        <div className="bg-[#281A31] p-5 flex justify-between">
          <div>
            <div className="text-base text-white opacity-60">Sell</div>
            <NumericalInput
              className="mr-1 mt-[10px] h-[50px] max-w-[300px] text-left text-3xl text-white placeholder:opacity-50"
              placeholder="Input Sell Amount"
              value={sellAmount}
              onUserInput={setSellAmount}
            />
            <div className="text-xl text-white opacity-60 mt-2">
              ${sellPrice}
            </div>
          </div>
          <div className="flex items-end">
            <TokenSelect token={sellToken} setToken={setSellToken} />
          </div>
        </div>

        <ArrowBetween className="-my-4 self-center" />

        <div className="bg-[#281A31] p-5">
          <div className="text-base text-white opacity-60">Buy</div>
          <NumericalInput
            className="mr-1 mt-[10px] h-[50px] max-w-[300px] text-left text-3xl text-white placeholder:opacity-50"
            placeholder="Input Sell Amount"
            value={sellAmount}
            onUserInput={setSellAmount}
          />
          <div className="text-xl text-white opacity-60 mt-2">-</div>
        </div>
      </div>
    </div>
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
