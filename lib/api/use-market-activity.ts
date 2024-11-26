import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";
import { sortBy } from "lodash";

export interface IActivity {
  order_id?: string;
  auction_id?: string;

  token_id: string;
  event: "Purchase" | "List" | "Delist" | "Vault";
  price: string;
  by: string;
  update_at: string;
}

export async function fetchMarketActivity(
  marketName?: string,
  tokenId?: string,
) {
  if (!marketName) return;

  const result = await apiFetcher(
    WithApiHost(
      `${ApiPaths.activity}/${marketName}` +
        (tokenId ? `?token_id=${tokenId}` : ""),
    ),
  );

  const newResult = sortBy(result, "update_at").reverse();

  return newResult as Array<IActivity>;
}

export function useMarketActivity(marketName?: string, tokenId?: string) {
  const result = useQuery({
    queryKey: [marketName, "activity", tokenId],
    queryFn: () => fetchMarketActivity(marketName, tokenId),
    enabled: !!marketName,
  });

  return result;
}
