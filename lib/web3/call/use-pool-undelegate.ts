import { useWriteContract } from "wagmi";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { DelegatePoolABI } from "@/lib/abi/DelegatePool";

export function usePoolUndelegate() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: { poolId: string; undelegateNum: number },
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (e: any) => void;
    },
  ) => {
    try {
      const { poolId, undelegateNum } = args || {};

      const abiAddress = chainConfig.contracts.DelegatePool;

      const callParams = {
        abi: DelegatePoolABI,
        address: abiAddress as any,
        functionName: "undelegate",
        args: [poolId, BigInt(undelegateNum)],
      };

      const gasParams = await getGasParams({
        ...callParams,
      });

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
    } catch (e: any) {
      console.log("tx error", e);
    }
  };

  return {
    ...mutation,
    write,
  };
}
