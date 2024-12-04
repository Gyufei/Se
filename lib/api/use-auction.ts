import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";

export interface IAuction {
  id: string;
  token_id: string;
  seller: string;
  bidding_cap: string;
  min_bid_amount: string;
  total_bids: string;
  tax_rate: string;
  tax_amount: string;
  start_time: string;
  end_time: string;
  winner: string;
  winning_bid: string;
  vault_addr: string;
  bidders: string[];
  bid_amounts: string[];
  bid_withdrawn: boolean[];
  sell_withdrawn: boolean;
  status: "NOTEXIST" | "BIDDING" | "COMPLETED" | "FAILED";
  auction_type: "NORMAL" | "REFUNDABLE";
  bidder_infos: {
    bidder: string;
    bid_amount: string;
    bid_withdrawn: boolean;
  }[];
}

export async function fetchAuction(marketName: string, auctionId?: string) {
  if (!auctionId) return;

  const result = await apiFetcher(
    WithApiHost(`${ApiPaths.auction}/${marketName}/${auctionId}`),
  );

  const bidderInfos = result.bidders.map((bidder: string, index: number) => ({
    bidder,
    bid_amount: result.bid_amounts[index],
    bid_withdrawn: result.bid_withdrawn[index],
  }));

  const newRes = {
    ...result,
    id: auctionId,
    bidder_infos: bidderInfos,
  };

  return newRes as IAuction;
}

export function useAuction(marketName: string, auctionId?: string) {
  const result = useQuery({
    queryKey: [marketName, "auction", auctionId],
    queryFn: () => fetchAuction(marketName, auctionId),
    enabled: !!marketName && !!auctionId,
  });

  return result;
}
