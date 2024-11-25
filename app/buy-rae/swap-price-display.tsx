import { Skeleton } from "@/components/ui/skeleton";
import { IToken } from "@/lib/types/token";
import { useMemo } from "react";
import { divide } from "safebase";

export default function SwapPriceDisplay({
  isLoading,
  isNative,
  payPrice,
  buyPrice,
  payToken,
  buyToken,
}: {
  isLoading: boolean;
  isNative: boolean;
  payPrice: string;
  buyPrice: string;
  payToken: IToken;
  buyToken: IToken;
}) {
  const displayPrice = useMemo(() => {
    if (!buyPrice || !Number(payPrice)) return "0";

    if (isNative) {
      return divide(buyPrice, payPrice);
    } else {
      return buyPrice;
    }
  }, [buyPrice, payPrice, isNative]);

  if (!payToken || !Number(buyPrice) || !Number(payPrice) || isLoading) {
    return <Skeleton className="w-[100px] h-6" />;
  }

  return (
    <div className="text-white opacity-60 text-sm">
      {payToken.symbol && (
        <>
          1 {buyToken.symbol} = {displayPrice} {payToken.symbol}
        </>
      )}
    </div>
  );
}
