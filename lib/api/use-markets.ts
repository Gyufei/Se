import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";
import { ApiPaths, WithApiHost } from "@/lib/api/api-paths";

export type MarketType = "lucky" | "quick";

export interface IMarket {
  market_name: string;
  supported_market_types: MarketType[];
  block_chain: ChainType;
  nft_info: IMarketNftInfo;
  social_media: IMarketSocialMedia;
  guide_price: string;
  description: string;
}

export interface IMarketSocialMedia {
  website: string;
  discord: string;
  twitter: string;
  telegram: string;
}

export interface IMarketNftInfo {
  name: string;
  symbol: string;
  token_standard: string;
  token_uri: string;
  token_address: string;
}

export async function fetchMarkets() {
  const markets = await apiFetcher(WithApiHost(ApiPaths.markets));
  return markets as Array<IMarket>;
}

export function useMarkets() {
  const result = useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
  });

  return result;
}

export function useMarketByName(marketName: string) {
  const marketsResult = useMarkets();

  const market = marketsResult.data?.find((m) => m.market_name === marketName);

  return {
    ...marketsResult,
    data: market,
  };
}
