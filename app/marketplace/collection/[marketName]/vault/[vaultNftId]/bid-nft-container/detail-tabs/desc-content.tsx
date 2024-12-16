import { Skeleton } from "@/components/ui/skeleton";
import { useLuckyNFTPageContext } from "../../page-context";

export default function DescContent() {
  const { isMarketAndNftPending, nftInfo, marketInfo } =
    useLuckyNFTPageContext();

  return (
    <div className="flex flex-col mt-10">
      {isMarketAndNftPending ? (
        <>
          <Skeleton className="w-[200px] h-6" />
          <Skeleton className="w-full h-10 mt-5" />
        </>
      ) : (
        <>
          <div className="text-lg text-white font-medium">
            {nftInfo?.market_name} {nftInfo?.token_id}
          </div>
          <div className="text-white text-xs mt-5 opacity-80 font-medium">
            {marketInfo?.description}
          </div>
        </>
      )}
    </div>
  );
}
