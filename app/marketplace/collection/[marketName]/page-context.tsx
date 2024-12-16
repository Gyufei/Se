"use client";

import { IMarket, useMarketByName } from "@/lib/api/use-markets";
import { INFT, useMarketNfts } from "@/lib/api/use-market-nfts";
import { createContext, useContext } from "react";

const CollectionPageContext = createContext<
  | {
      marketName: string;
      marketInfo: IMarket | undefined;
      marketNfts: INFT[] | undefined;
      isMarketPending: boolean;
      isNftsPending: boolean;
    }
  | undefined
>(undefined);

export function CollectionPageProvider({
  marketName,
  children,
}: {
  marketName: string;
  children: React.ReactNode;
}) {
  const { data: marketInfo, isPending: isMarketPending } =
    useMarketByName(marketName);

  const { data: marketNfts, isPending: isNftsPending } =
    useMarketNfts(marketName);

  return (
    <CollectionPageContext
      value={{
        marketName,
        marketInfo,
        marketNfts,
        isMarketPending,
        isNftsPending,
      }}
    >
      {children}
    </CollectionPageContext>
  );
}

export function useCollectionPageContext() {
  const context = useContext(CollectionPageContext);

  if (!context) {
    throw new Error(
      "useCollectionPageContext must be used within a CollectionPageProvider",
    );
  }

  return context;
}
