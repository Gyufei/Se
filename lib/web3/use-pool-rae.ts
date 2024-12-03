import { useAccount, useReadContract } from "wagmi";
import { DelegatePoolABI } from "../abi/DelegatePool";
import { useChainConfig } from "./use-chain-config";

export function usePoolRae(poolAddr: string | undefined) {
  const { chainConfig } = useChainConfig();
  const abiAddress = chainConfig.contracts.DelegatePool;
  const { address } = useAccount();

  const result = useReadContract({
    abi: DelegatePoolABI,
    address: abiAddress as any,
    functionName: "delegatorInfo",
    args: [poolAddr as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: !!poolAddr && !!address,
    },
  });

  return result;
}
