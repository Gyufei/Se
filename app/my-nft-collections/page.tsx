"use client";

import { Suspense } from "react";
import ListDisplay from "./list-display";
import NftOperation from "./nft-operation";
import { MyNFTCollectionsPageContextProvider } from "./page-context";

export default function Page() {
  return (
    <Suspense>
      <MyNFTCollectionsPageContextProvider>
        <div className="flex">
          <ListDisplay />
          <NftOperation />
        </div>
      </MyNFTCollectionsPageContextProvider>
    </Suspense>
  );
}
