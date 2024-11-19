import { useMemo } from "react";
import { useTokens } from "./use-tokens";
import { ChainType } from "@/lib/types/chain";

export function useStableToken(chain: ChainType) {
  const { data: tokens, isLoading } = useTokens(chain);

  const stableTokens = useMemo(() => {
    const stableTokenList =
      chain === ChainType.ETH
        ? ["USDT", "USDC", "ETH"]
        : chain === ChainType.BNB
        ? ["USDT", "USDC", "BNB"]
        : chain === ChainType.SOLANA
        ? ["USDC", "SOL"]
        : [];

    if (!tokens) return [];

    return tokens.filter((t) => stableTokenList.includes(t.symbol));
  }, [tokens, chain]);

  return {
    data: stableTokens,
    isLoading,
  };
}
