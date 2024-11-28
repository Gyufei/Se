import { ChainConfigs } from "@/lib/const/chain-config";
import { ChainType } from "@/lib/types/chain";

export function useChainConfig() {
  const chainConfig = ChainConfigs[ChainType.Uni];

  return {
    chainConfig,
  };
}
