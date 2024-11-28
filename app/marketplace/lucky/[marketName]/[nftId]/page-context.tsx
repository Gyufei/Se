import { IMarket, useMarketByName } from "@/lib/api/use-markets";
import { INFT, useMarketNfts } from "@/lib/api/use-market-nfts";
import { createContext, useContext } from "react";
import { useMarketActivity } from "@/lib/api/use-market-activity";
import { useAuction } from "@/lib/api/use-auction";
import { IAuction } from "@/lib/api/use-auction";

const LuckyNFTPageContext = createContext<
  | {
      marketName: string;
      marketInfo: IMarket | undefined;
      nftId: string;
      nftInfo: INFT | undefined;
      isMarketAndNftPending: boolean;

      auctionId: string | undefined;
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

  const isMarketAndNftPending = isMarketPending || isNftsPending;

  const { data: activities } = useMarketActivity(marketName, nftId);

  const auctionId = activities?.[0]?.auction_id;

  const { data: auctionInfo, isPending: isAucPending } = useAuction(
    marketName,
    auctionId,
  );

  const isAuctionPending =
    isMarketAndNftPending ||
    nftInfo?.status !== "VAULTED" ||
    !auctionId ||
    isAucPending;

  return (
    <LuckyNFTPageContext.Provider
      value={{
        marketName,
        nftId,
        auctionId,
        marketInfo,
        nftInfo,
        auctionInfo,
        isAuctionPending,
        isMarketAndNftPending,
      }}
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
