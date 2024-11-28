import { flatten } from "lodash";
import {
  QueryObserverResult,
  useQuery,
  useQueries,
} from "@tanstack/react-query";

import { apiFetcher } from "../fetcher";
import { WithApiHost } from "./api-paths";
import { IMarket, IMarketNftInfo } from "./use-markets";
import { useMarketByName } from "./use-markets";

export type INFT = {
  token_id: string;
  owner: string;
  price: string;
  status: "LISTED" | "VAULTED" | "PERSON";
  market_name: string;
  total_supply: number;
} & IMarketNftInfo;

export async function fetchMarketNfts(marketInfo?: IMarket) {
  if (!marketInfo) {
    return [];
  }

  const nfts = await apiFetcher(WithApiHost(`/${marketInfo.market_name}`));

  for (const nft of nfts) {
    nft.market_name = marketInfo.market_name;
    nft.total_supply = nfts.length;
  }

  const newNfts = nfts.map((n: Record<string, any>) => ({
    ...marketInfo.nft_info,
    ...n,
    // token_uri: `${marketInfo.nft_info.token_uri}/${n.token_id}`,
    token_uri: `https://api.pudgypenguins.io/lil/image/${n.token_id}`,
  }));

  return newNfts as Array<INFT>;
}

export function useMarketNfts(marketName: string) {
  const { data: market, isPending: isMarketPending } =
    useMarketByName(marketName);

  async function fetcher() {
    const nfts = await fetchMarketNfts(market);
    return nfts;
  }

  const result = useQuery({
    queryKey: [marketName, "nfts"],
    queryFn: fetcher,
    enabled: !!marketName && !isMarketPending,
  });

  return result;
}

function CombineResults(results: QueryObserverResult<INFT[], unknown>[]) {
  return {
    data: flatten(results.map((result) => result?.data || [])),
    isPending: results.some((result) => result?.isPending),
  };
}

export function useMarketsNfts(markets: IMarket[] | undefined) {
  const marketsNfts = useQueries({
    queries: markets?.length
      ? markets.map((m) => ({
          queryKey: [m.market_name, "nfts"],
          queryFn: () => fetchMarketNfts(m),
        }))
      : [],
    combine: CombineResults,
  });

  return marketsNfts;
}
