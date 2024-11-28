import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "./api-paths";

export interface IRaePrice {
  price: string;
  price_change_percentage_24h: string;
}

export async function fetchRaePrice() {
  const result = await apiFetcher(WithApiHost(ApiPaths.raePrice));
  return result as IRaePrice;
}

export function useRaePrice() {
  const result = useQuery({
    queryKey: ["rae-price"],
    queryFn: fetchRaePrice,
  });

  return result;
}
