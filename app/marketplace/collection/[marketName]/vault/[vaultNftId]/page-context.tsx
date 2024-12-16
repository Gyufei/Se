import { IMarket } from "@/lib/api/use-markets";
import { INFT } from "@/lib/api/use-market-nfts";
import { createContext, useContext } from "react";
import { IAuction } from "@/lib/api/use-auction";
import { useNftAuction } from "@/lib/api/use-nft-auction";
import { useCollectionPageContext } from "../../page-context";

const LuckyNFTPageContext = createContext<
  | {
      marketName: string;
      marketInfo: IMarket | undefined;
      nftId: string;
      nftInfo: INFT | undefined;
      isMarketAndNftPending: boolean;

      auctionInfo: IAuction | undefined;
      isAuctionPending: boolean;
    }
  | undefined
>(undefined);

export function LuckyNFTPageProvider({
  marketName,
  vaultNftId,
  children,
}: {
  marketName: string;
  vaultNftId: string;
  children: React.ReactNode;
}) {
  const { marketInfo, marketNfts, isMarketPending, isNftsPending } =
    useCollectionPageContext();

  const nftInfo = (marketNfts || []).find((n) => n.token_id === vaultNftId);

  const isMarketAndNftPending = isMarketPending || isNftsPending;

  const { data: auctionInfo, isPending: isAucPending } = useNftAuction(nftInfo);

  const isAuctionPending =
    isMarketAndNftPending ||
    nftInfo?.status !== "VAULTED" ||
    !auctionInfo ||
    isAucPending;

  return (
    <LuckyNFTPageContext
      value={{
        marketName,
        nftId: vaultNftId,
        marketInfo,
        nftInfo,
        auctionInfo,
        isAuctionPending,
        isMarketAndNftPending,
      }}
    >
      {children}
    </LuckyNFTPageContext>
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
