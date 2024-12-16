import { truncateAddr } from "@/lib/utils/web3";
import { useCheckIsPool } from "@/lib/api/use-pools";
import { AddressImg } from "@/app/_common/address-img";
import { Skeleton } from "@/components/ui/skeleton";

import { useLuckyNFTPageContext } from "../page-context";

export default function WonBy() {
  const { isAuctionPending, auctionInfo } = useLuckyNFTPageContext();

  const winner = auctionInfo?.winner;

  const { data: isPool, isPending: isPoolPending } = useCheckIsPool(
    auctionInfo?.winner,
  );

  return (
    <div className="p-5 bg-[#281a31] mt-6">
      <div className="text-base text-white font-medium">Vault was won by</div>
      <div className="h-14 px-4 flex items-center space-x-3 bg-[#1D0E27] mt-[15px]">
        {isAuctionPending || isPoolPending ? (
          <>
            <Skeleton className="w-[24px] h-[24px]" />
            <Skeleton className="w-[100px] h-5" />
          </>
        ) : (
          <>
            <AddressImg address={winner} width={24} height={24} />
            <span className="text-white text-base font-medium">
              {isPool ? "Pool" : "Wallet"}: {truncateAddr(winner, [5, 5])}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
