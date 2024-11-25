import { ChainConfigs } from "./const/chain-config";
import { ChainType } from "./types/chain";

export function useChainConfig() {
  const chainConfig = ChainConfigs[ChainType.Uni];

  return {
    chainConfig,
  };
}
