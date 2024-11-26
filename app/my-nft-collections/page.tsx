"use client";
import ListDisplay from "./list-display";
import NftOperation from "./nft-operation";

export default function Page() {
  return (
    <div className="flex">
      <ListDisplay />
      <NftOperation />
    </div>
  );
}
