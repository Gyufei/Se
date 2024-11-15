"use client";
import { range } from "lodash";
import BagItem from "./bag-item";
import { formatNumber } from "@/lib/utils/number";
import RaeToken from "@/app/_common/rae-token";
import BagBuyBtn from "./bag-pay-btn";
import MsgTip, { IMsgPayload } from "@/components/share/msg-tip";
import { useState } from "react";

const bagNum = 3;
const total = 11.49;
const totalPriceValue = 30300;

export default function BuyBag() {
  function handleClear() {}

  function handleBuy() {
    setMsg({
      type: "success",
      msg: "Buy success",
    });
  }

  const [msg, setMsg] = useState<IMsgPayload>({
    type: null,
    msg: null,
  });

  return (
    <div className="w-[400px] bg-[#1D0E27]">
      <div className="flex justify-between items-center pt-12 px-6 pb-5 border-b-2 border-[#ffffff10]">
        <span className="text-[30px] text-white">
          Bag {bagNum ? `(${bagNum})` : ""}
        </span>
        <span
          onClick={handleClear}
          className="cursor-pointer text-base text-white opacity-60 hover:opacity-100"
        >
          Clear all
        </span>
      </div>
      <div className="pt-5 px-3">
        {range(3).map((i) => (
          <BagItem key={i} />
        ))}
      </div>
      <div className="bg-[#281A31] p-5 mx-6 mt-5">
        <div className="text-base text-[#B8B3B6]">Total</div>
        <div className="flex justify-between">
          <div>
            <div className="text-[40px] text-white font-medium">{total}</div>
            <div className="text-white opacity-60 text-xl">
              ${formatNumber(totalPriceValue)}
            </div>
          </div>
          <RaeToken className="self-end" />
        </div>
        <BagBuyBtn onClick={handleBuy} />
        <MsgTip className="mt-[15px]" msgPayload={msg} />
      </div>
    </div>
  );
}
