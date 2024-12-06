import { useCallback } from "react";
import { useChainId, useSwitchChain } from "wagmi";
import { useChainConfig } from "../use-chain-config";

export function useCorrectChain() {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const { chainConfig } = useChainConfig();

  const switchToTargetChain = useCallback(
    async function () {
      if (!chainId) {
        return true;
      }

      if (Number(chainId) !== Number(chainConfig.network)) {
        return switchChainAsync({ chainId });
      }

      return true;
    },
    [chainId, chainConfig, switchChainAsync],
  );

  return {
    switchToTargetChain,
  };
}
