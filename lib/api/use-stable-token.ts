import { useMemo } from "react";
import { useTokens } from "./use-tokens";
import { ChainType } from "@/lib/types/chain";

export function useStableToken(chain: ChainType) {
  const { data: tokens, isPending } = useTokens();

  const stableTokens = useMemo(() => {
    const stableTokenList =
      chain === ChainType.Uni ? ["USDT", "USDC", "ETH"] : [];

    if (!tokens) return [];

    return tokens.filter((t) => stableTokenList.includes(t.symbol));
  }, [tokens, chain]);

  return {
    data: stableTokens,
    isPending,
  };
}
