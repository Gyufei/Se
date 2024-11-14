import { cn } from "@/lib/utils/common";
import RaePrice from "./rae-price";

export default function NFTPrice({
  priceName = "Price",
  className,
}: {
  priceName?: string;
  className?: string;
}) {
  const price = 2000;

  return (
    <div
      className={cn(
        "flex justify-between items-center mt-6 space-x-5 font-medium",
        className,
      )}
    >
      <div className="bg-[#281A31] p-5 flex-1 h-[108px]">
        <div className="text-base text-white opacity-60">{priceName}</div>
        <div className="text-[30px] text-white mt-[10px]">${price}</div>
      </div>
      <RaePrice />
    </div>
  );
}
