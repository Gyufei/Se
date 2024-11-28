"use client";

import { IMarket, useMarketByName } from "@/lib/api/use-markets";
import { INFT, useMarketNfts } from "@/lib/api/use-market-nfts";
import { createContext, useContext } from "react";

const QuickPageContext = createContext<
  | {
      marketName: string;
      marketInfo: IMarket | undefined;
      marketNfts: INFT[] | undefined;
      isMarketPending: boolean;
      isNftsPending: boolean;
    }
  | undefined
>(undefined);

export function QuickPageProvider({
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
    <QuickPageContext.Provider
      value={{
        marketName,
        marketInfo,
        marketNfts,
        isMarketPending,
        isNftsPending,
      }}
    >
      {children}
    </QuickPageContext.Provider>
  );
}

export function useQuickPageContext() {
  const context = useContext(QuickPageContext);

  if (!context) {
    throw new Error(
      "useQuickPageContext must be used within a QuickPageProvider",
    );
  }

  return context;
}
