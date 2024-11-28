import { cn } from "@/lib/utils/common";
import RaePrice from "./rae-price";
import { Skeleton } from "@/components/ui/skeleton";

export default function NFTPrice({
  price,
  isPending = false,
  priceName = "Price",
  className,
}: {
  price: string;
  isPending?: boolean;
  priceName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-between items-center mt-6 space-x-5 font-medium",
        className,
      )}
    >
      <div className="bg-[#281A31] p-5 flex-1 h-[108px]">
        <div className="text-base text-white opacity-60">{priceName}</div>
        {isPending ? (
          <Skeleton className="w-[150px] h-[30px] mt-[10px]" />
        ) : (
          <div className="text-[30px] text-white mt-[10px]">${price}</div>
        )}
      </div>
      <RaePrice />
    </div>
  );
}
