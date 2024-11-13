import { cn } from "@/lib/utils/common";

const winnerPaid = 50;
const winnerProfit = 60;
const winnerProfitPercent = 0.23;

export default function WinnerPrice() {
  const isPercentUp = winnerProfitPercent >= 0;

  return (
    <div className="mt-5 flex justify-between space-x-5">
      <div className="bg-[#281A31] p-5 flex-1 font-medium">
        <div className="text-white opacity-60">Winner Paid</div>
        <div className="mt-[10px] text-[30px] text-white leading-[38px]">
          {winnerPaid} RAE
        </div>
        <div className="mt-[10px] text-sm text-white opacity-80">
          Vault value = {winnerPaid} RAE
        </div>
      </div>
      <div className="bg-[#281A31] p-5 flex-1 font-medium">
        <div className="text-white opacity-60">Winner Profit</div>
        <div
          className={cn(
            "text-[30px] leading-[38px] mt-[10px]",
            isPercentUp ? "text-green" : "text-red",
          )}
        >
          {isPercentUp ? "+" : "-"}
          {winnerProfitPercent * 100}%
        </div>
        <div className="mt-[10px] text-white opacity-60">${winnerProfit}</div>
      </div>
    </div>
  );
}
