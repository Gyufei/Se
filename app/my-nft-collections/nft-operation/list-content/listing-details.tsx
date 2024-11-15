"use client";
import RaeToken from "@/app/_common/rae-token";
import { NumericalInput } from "@/components/share/numerical-input";
import { useState } from "react";

export default function ListingDetail() {
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-[#281A31] p-5 mt-5">
      <div className="text-xl font-medium text-white">Listing Details</div>

      <div className="flex items-end justify-between mt-5">
        <div className="flex items-center mt-[15px]">
          <NumericalInput
            className="h-12 w-[236px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
            placeholder="0"
            value={amount}
            onUserInput={(v) => setAmount(v)}
          />
          <div className="text-base text-white opacity-60 inline-block ml-5">
            ~ $3000
          </div>
        </div>

        <RaeToken />
      </div>
    </div>
  );
}
