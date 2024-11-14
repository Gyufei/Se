import { cn } from "@/lib/utils/common";
import numeral from "numeral";

export default function NFTPrice() {
  const price = 2000;
  const raePrice = 400;
  const raePriceChangePercent = 0.2;

  const isPercentUp = raePriceChangePercent >= 0;

  return (
    <div className="flex justify-between items-center mt-6 space-x-5 font-medium">
      <div className="bg-[#281A31] p-5 flex-1 h-[108px]">
        <div className="text-base text-white opacity-60">Price</div>
        <div className="text-[30px] text-white mt-[10px]">${price}</div>
      </div>
      <div className="flex justify-between bg-[#281A31] flex-1 h-[108px] p-5">
        <div>
          <div className="text-base text-white opacity-60">Rae Price</div>
          <div className="text-[30px] text-white mt-[10px]">${raePrice}</div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <span className="text-sm text-white opacity-60">24h</span>
          <span
            className={cn("text-xl", isPercentUp ? "text-green" : "text-red")}
          >
            {isPercentUp ? "+" : "-"}
            {numeral(raePriceChangePercent).format("0.[00]%")}
          </span>
        </div>
      </div>
    </div>
  );
}
