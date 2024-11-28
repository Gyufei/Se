import { INFT, useMarketsNfts } from "@/lib/api/use-market-nfts";
import { useMarkets } from "@/lib/api/use-markets";
import { useCheckIsPoolCreator } from "@/lib/api/use-pools";
import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";

export type MyNFTCollectionsPageContextType = {
  myNfts: INFT[];
  poolNfts: INFT[];
  isPending: boolean;
  selectedNft: INFT | null;
  setSelectedNft: (nft: INFT) => void;
  nftType: NftOwnerType;
  setNftType: (type: NftOwnerType) => void;
};

export const MyNFTCollectionsPageContext = createContext<
  MyNFTCollectionsPageContextType | undefined
>(undefined);

export type NftOwnerType = "personal" | "pool";

export function MyNFTCollectionsPageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();

  const [nftType, setNftType] = useState<"personal" | "pool">("personal");
  const [selectedNft, setSelectedNft] = useState<INFT | null>(null);
  const { data: markets, isPending: isMarketsPending } = useMarkets();
  const { data: allNfts, isPending: isNftsPending } = useMarketsNfts(markets);

  const { data: asPoolCreator } = useCheckIsPoolCreator(address);

  const poolCreatorPoolAddrs = asPoolCreator.poolAddrs;

  const myNfts = allNfts.filter((nft) => nft.owner === address);

  const poolNfts = allNfts.filter((nft) =>
    poolCreatorPoolAddrs.includes(nft.owner),
  );

  const isPending = isMarketsPending || isNftsPending;

  return (
    <MyNFTCollectionsPageContext.Provider
      value={{
        myNfts,
        poolNfts,
        isPending,
        selectedNft,
        setSelectedNft,
        nftType,
        setNftType,
      }}
    >
      {children}
    </MyNFTCollectionsPageContext.Provider>
  );
}

export function useMyNFTCollectionsPageContext() {
  const context = useContext(MyNFTCollectionsPageContext);

  if (!context) {
    throw new Error(
      "useMyNFTCollectionsPageContext must be used within a MyNFTCollectionsPageContextProvider",
    );
  }

  return context;
}
