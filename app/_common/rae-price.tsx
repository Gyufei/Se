import { Skeleton } from "@/components/ui/skeleton";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { cn } from "@/lib/utils/common";
import { formatPercent } from "@/lib/utils/number";

export default function RaePrice() {
  const { data: raePriceData, isPending: isRaePricePending } = useRaePrice();

  const raePrice = raePriceData?.price;
  const raePriceChangePercent = raePriceData?.price_change_percentage_24h;
  const isPercentUp =
    raePriceChangePercent && Number(raePriceChangePercent) >= 0;

  return (
    <div className="flex justify-between bg-[#281A31] flex-1 h-[108px] p-5">
      <div>
        <div className="text-base text-white opacity-60">Rae Price</div>
        {isRaePricePending ? (
          <Skeleton className="w-[120px] h-[30px] mt-[10px] mb-1" />
        ) : (
          <div className="text-[30px] text-white mt-[10px] mb-1">
            ${raePrice}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end items-end">
        <span className="text-sm text-white opacity-60">24h</span>
        {isRaePricePending ? (
          <Skeleton className="w-[50px] h-[20px]" />
        ) : (
          <span
            className={cn("text-xl", isPercentUp ? "text-green" : "text-red")}
          >
            {isPercentUp ? "+" : "-"}
            {formatPercent(raePriceChangePercent!)}
          </span>
        )}
      </div>
    </div>
  );
}
