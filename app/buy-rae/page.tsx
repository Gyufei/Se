"use client";
import { useState } from "react";
import { IToken } from "@/lib/types/token";
import SellAndBuyInput from "./sell-and-buy-input";
import ToOtherAddr from "./to-other-addr";
import BuyOption from "./buy-option";
import ShouldConnectBtn from "../_common/should-connect-btn";

export default function Page() {
  const [payAmount, setPayAmount] = useState("0");
  const [payToken, setPayToken] = useState<IToken>({
    symbol: "",
    imgSrc: "/icons/empty.svg",
    decimals: 9,
  } as IToken);

  const [buyAmount, setBuyAmount] = useState("0");

  const [toAddr, setToAddr] = useState("");

  function handleSellInput(v: string) {
    setPayAmount(v);
  }

  function handleBuyInput(v: string) {
    setBuyAmount(v);
  }

  function handleBuy() {}

  return (
    <div className="flex flex-col items-center pt-[100px]">
      <div className="text-[40px] font-medium text-white">Buy RAE</div>

      <div className="mt-5 bg-[#1D0E27] flex flex-col items-stretch p-6 w-[440px]">
        <SellAndBuyInput
          payToken={payToken}
          setPayToken={setPayToken}
          payAmount={payAmount}
          setPayAmount={handleSellInput}
          buyAmount={buyAmount}
          setBuyAmount={handleBuyInput}
        />

        <ToOtherAddr addr={toAddr} setAddr={setToAddr} />

        <ShouldConnectBtn className="w-full mt-5" onClick={handleBuy}>
          Buy
        </ShouldConnectBtn>

        <BuyOption payToken={payToken} />
      </div>
    </div>
  );
}
