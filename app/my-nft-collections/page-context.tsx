"use client";
import { INFT, useMarketsNfts } from "@/lib/api/use-market-nfts";
import { useMarkets } from "@/lib/api/use-markets";
import { useCheckIsPoolCreator } from "@/lib/api/use-pools";
import { sortBy } from "lodash";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount } from "wagmi";

export type MyNFTCollectionsPageContextType = {
  myNfts: INFT[];
  poolNfts: INFT[];
  isPending: boolean;
  selectedNft: INFT | null;
  setSelectedNft: (nft: INFT | null) => void;
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
  const searchParams = useSearchParams();
  const nftId = searchParams.get("nftId");
  const marketName = searchParams.get("marketName");

  const [nftType, setNftType] = useState<"personal" | "pool">("personal");
  const [selectedNft, setSelectedNft] = useState<INFT | null>(null);
  const { data: markets, isPending: isMarketsPending } = useMarkets();
  const { data: allNfts, isPending: isNftsPending } = useMarketsNfts(markets);

  const { data: asPoolCreator } = useCheckIsPoolCreator(address);

  const poolCreatorPoolAddrs = asPoolCreator.poolAddrs;

  const myNfts = sortBy(
    sortBy(
      allNfts.filter((nft) => nft.owner === address),
      sortNftByNftId,
    ),
    sortNftByMarketName,
  );

  const poolNfts = sortBy(
    sortBy(
      allNfts.filter((nft) => poolCreatorPoolAddrs.includes(nft.owner)),
      sortNftByMarketName,
    ),
    sortNftByNftId,
  );

  const isPending = isMarketsPending || isNftsPending;

  const checkIsSameNft = useCallback(
    (nft: INFT) => nft.token_id === nftId && nft.market_name === marketName,
    [nftId, marketName],
  );

  useEffect(() => {
    if (!marketName || !nftId) return;

    const paramNft = allNfts.find(checkIsSameNft);
    if (!paramNft) return;

    const isPoolNft = poolNfts.some(checkIsSameNft);
    const isMyNft = myNfts.some(checkIsSameNft);
    if (!isPoolNft && !isMyNft) return;

    const type = isPoolNft ? "pool" : "personal";
    setNftType(type);
    setSelectedNft(paramNft);
  }, [
    searchParams,
    poolNfts,
    myNfts,
    allNfts,
    nftId,
    marketName,
    checkIsSameNft,
  ]);

  function sortNftByMarketName(n: INFT) {
    if (!marketName) return 0;
    return n.market_name !== marketName ? 1 : -1;
  }

  function sortNftByNftId(n: INFT) {
    if (!nftId) return 0;
    return n.token_id !== nftId ? 1 : -1;
  }

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
