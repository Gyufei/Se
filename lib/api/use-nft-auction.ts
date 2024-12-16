import { useQuery } from "@tanstack/react-query";
import { fetchAuction } from "./use-auction";
import { fetchMarketActivity } from "./use-market-activity";
import { INFT } from "./use-market-nfts";

export function useNftAuction(nft: INFT | undefined) {
  async function fetchNftAuction() {
    if (!nft) return;
    if (nft.status !== "VAULTED") return;

    const actData = await fetchMarketActivity(nft.market_name, nft.token_id);
    const auctionId = actData?.[0]?.auction_id;

    if (!auctionId) return;

    const auctionInfo = await fetchAuction(nft.market_name, auctionId);

    return auctionInfo;
  }

  const result = useQuery({
    queryKey: [nft?.market_name, "nft-auction", nft?.token_id],
    queryFn: fetchNftAuction,
    enabled: !!nft && nft.status === "VAULTED",
  });

  return result;
}
