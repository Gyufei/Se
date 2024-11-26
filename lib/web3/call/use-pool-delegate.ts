import { useWriteContract } from "wagmi";
import { useChainConfig } from "@/lib/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { DelegatePoolABI } from "@/lib/abi/DelegatePool";

export function usePoolDelegate() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: { poolId: string; delegateNum: number },
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (e: any) => void;
    },
  ) => {
    try {
      const { poolId, delegateNum } = args || {};

      const abiAddress = chainConfig.contracts.DelegatePool;

      const callParams = {
        abi: DelegatePoolABI,
        address: abiAddress as any,
        functionName: "delegate",
        args: [poolId, BigInt(delegateNum)],
      };

      const gasParams = await getGasParams(callParams);

      mutation.writeContract(
        {
          ...(callParams as any),
          ...gasParams,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
          onError: (e: any) => {
            onError?.(e);
          },
        },
      );
    } catch (e) {
      console.log("tx error", e);
    }
  };

  return {
    ...mutation,
    write,
  };
}
