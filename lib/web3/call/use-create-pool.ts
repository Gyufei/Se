import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { DelegatePoolABI } from "@/lib/abi/DelegatePool";

export function useCreatePool() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const {
    isPending: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: mutation.data,
    query: {
      enabled: !!mutation.data,
    },
  });

  const write = async (
    args: { name: string; bonus: number },
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (e: any) => void;
    },
  ) => {
    try {
      const { name, bonus } = args || {};

      const abiAddress = chainConfig.contracts.DelegatePool;

      const callParams = {
        abi: DelegatePoolABI,
        address: abiAddress as any,
        functionName: "createPool",
        args: [name, BigInt(bonus)],
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
    writeContractRes: mutation,
    write,
    isPending: mutation.isPending || (mutation.data && isTxPending),
    error: mutation.error || txError,
    isSuccess: isTxSuccess,
  };
}
