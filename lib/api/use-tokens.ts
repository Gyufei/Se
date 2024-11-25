import type { IToken } from "@/lib/types/token";
// import { apiFetcher } from "@/lib/fetcher";
// import { useEndPoint } from "@/lib/api/use-endpoint";
import { useQuery } from "@tanstack/react-query";

export function useTokens() {
  // const { cdnEndPoint } = useEndPoint();

  async function tFetcher() {
    // const tokens = await apiFetcher(`${cdnEndPoint}/tokenlist/uni.json`);
    const tokens = [
      {
        name: "Wrapped ETH",
        symbol: "WETH",
        decimals: 18,
        address: "0x4200000000000000000000000000000000000006",
        url: "https://cdn.tadle.com/eth/images/token/ETH.png",
      },
      {
        name: "Tether USD",
        symbol: "USDT",
        decimals: 6,
        address: "0x595dc397c37c8839b67d47123d61dd8df6d20e1c",
        url: "https://cdn.tadle.com/eth/images/token/USDT.png",
      },
      {
        name: "Tether USD",
        symbol: "USDC",
        decimals: 18,
        address: "0x9236d2e665D885dBbC58fD9dFb07AC95EF7a9B7C",
        url: "https://cdn.tadle.com/eth/images/token/USDC.png",
      },
    ];

    const newTokens = tokens.map((t: Record<string, any>) => {
      const newT = {
        ...t,
      } as any;

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
