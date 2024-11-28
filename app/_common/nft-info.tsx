import { Skeleton } from "@/components/ui/skeleton";
import { INFT } from "@/lib/api/use-market-nfts";
import Image from "next/image";

export default function NFTInfo({
  isPending,
  nft,
}: {
  isPending: boolean;
  nft?: INFT;
}) {
  return (
    <>
      <div className="flex items-center space-x-[5px] font-medium">
        <div className="h-[26px] w-[26px] border border-[#ffffff20] box-border p-[2px]">
          {isPending ? (
            <Skeleton className="h-[20px] w-[20px]" />
          ) : (
            <Image
              src="/images/mock-nft.png"
              width={20}
              height={20}
              alt="eth"
            />
          )}
        </div>
        {isPending ? (
          <Skeleton className="h-5 w-[120px]" />
        ) : (
          <>
            <span className="text-sm text-white">{nft?.market_name}</span>
            <div className="h-5 text-xs text-white rounded-full bg-[#71458E] px-2 flex items-center">
              {nft?.total_supply} NFT(S)
            </div>
          </>
        )}
      </div>
      <div className="mt-5 text-white text-[30px]">
        {isPending ? (
          <Skeleton className="h-8 w-[200px]" />
        ) : (
          <span>
            {nft?.market_name} #{nft?.token_id}
          </span>
        )}
      </div>
    </>
  );
}
