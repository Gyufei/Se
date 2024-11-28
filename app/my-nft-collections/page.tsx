"use client";
import ListDisplay from "./list-display";
import NftOperation from "./nft-operation";
import { MyNFTCollectionsPageContextProvider } from "./page-context";

export default function Page() {
  return (
    <MyNFTCollectionsPageContextProvider>
      <div className="flex">
        <ListDisplay />
        <NftOperation />
      </div>
    </MyNFTCollectionsPageContextProvider>
  );
}
