import { IMarket, useMarketByName } from "@/lib/api/use-markets";
import { INFT, useMarketNfts } from "@/lib/api/use-market-nfts";
import { createContext, useContext } from "react";
import { useMarketActivity } from "@/lib/api/use-market-activity";
import { useAuction } from "@/lib/api/use-auction";
import { IAuction } from "@/lib/api/use-auction";
const LuckyNFTPageContext = createContext<
  | {
      marketInfo: IMarket | undefined;
      nftInfo: INFT | undefined;
      isPending: boolean;
      auctionInfo: IAuction | undefined;
      isAuctionPending: boolean;
    }
  | undefined
>(undefined);

export function LuckyNFTPageProvider({
  marketName,
  nftId,
  children,
}: {
  marketName: string;
  nftId: string;
  children: React.ReactNode;
}) {
  const { data: marketInfo, isPending: isMarketPending } =
    useMarketByName(marketName);

  const { data: marketNfts, isPending: isNftsPending } =
    useMarketNfts(marketName);

  const nftInfo = (marketNfts || []).find((n) => n.token_id === nftId);

  const isPending = isMarketPending || isNftsPending;

  const { data: activities } = useMarketActivity(marketName, nftId);

  const auctionId = activities?.[0]?.auction_id;

  const { data: auctionInfo, isPending: isAucPending } = useAuction(
    marketName,
    auctionId,
  );

  const isAuctionPending =
    isPending || nftInfo?.status !== "Vaulted" || !auctionId || isAucPending;

  return (
    <LuckyNFTPageContext.Provider
      value={{ marketInfo, nftInfo, auctionInfo, isAuctionPending, isPending }}
    >
      {children}
    </LuckyNFTPageContext.Provider>
  );
}

export function useLuckyNFTPageContext() {
  const context = useContext(LuckyNFTPageContext);

  if (!context) {
    throw new Error(
      "useLuckyNFTPageContext must be used within a LuckyNFTPageProvider",
    );
  }

  return context;
}
