"use client";
import RaeToken from "@/app/_common/rae-token";
import { NumericalInput } from "@/components/share/numerical-input";
import { useState } from "react";

export default function CreateBidding() {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [bidCap, setBidCap] = useState("");

  return (
    <div className="bg-[#281A31] p-5 mt-5">
      <div className="text-xl font-medium text-white">Bidding Details</div>
      <div className="flex items-center justify-between mt-9">
        <div className="flex items-center space-x-5">
          <div className="flex flex-col">
            <span className="text-base text-white opacity-60">Days</span>
            <NumericalInput
              className="h-12 w-[118px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
              placeholder="0"
              value={days}
              onUserInput={(v) => setDays(v)}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base text-white opacity-60">Hours</span>
            <NumericalInput
              className="h-12 w-[118px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
              placeholder="0"
              value={hours}
              onUserInput={(v) => setHours(v)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-base text-white opacity-60">Tax Rate (%)</span>
          <NumericalInput
            className="h-12 w-[90px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
            placeholder="0"
            value={taxRate}
            onUserInput={(v) => setTaxRate(v)}
          />
        </div>
      </div>

      <div className="flex items-end justify-between mt-5">
        <div className="flex flex-col">
          <span className="text-base text-white opacity-60">Bidding Cap</span>
          <div className="flex items-center mt-[15px]">
            <NumericalInput
              className="h-12 w-[236px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
              placeholder="0"
              value={bidCap}
              onUserInput={(v) => setBidCap(v)}
            />
            <div className="text-base text-white opacity-60 inline-block ml-5">
              ~ $3000{" "}
            </div>
          </div>
        </div>

        <RaeToken />
      </div>
    </div>
  );
}
