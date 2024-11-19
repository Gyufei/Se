import type { IToken } from "@/lib/types/token";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "@/lib/api/use-endpoint";
import { useQuery } from "@tanstack/react-query";

export function useTokens() {
  const { cdnEndPoint } = useEndPoint();

  async function tFetcher() {
    const tokens = await apiFetcher(`${cdnEndPoint}/tokenlist/uni.json`);

    const newTokens = tokens.map((t: Record<string, any>) => {
      const newT = {
        ...t,
        logoURI: t.url,
      } as any;

      delete newT.url;

      if (newT.symbol === "WETH") {
        newT.symbol = "ETH";
      }

      return newT;
    });

    return newTokens as Array<IToken>;
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["tokens"],
    queryFn: tFetcher,
    staleTime: Infinity,
  });

  return {
    data,
    isPending,
    error,
  };
}
