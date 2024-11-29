import { useChainConfig } from "@/lib/web3/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { QuickMarketsABI } from "@/lib/abi/QuickMarkets";
import { useWriteContract } from "wagmi";

export function useBatchBuy() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: {
      orderIds: string[];
    },
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (e: any) => void;
    },
  ) => {
    try {
      const { orderIds } = args || {};
      console.log(orderIds);

      const abiAddress = chainConfig.contracts.QuickMarkets;

      const callParams = {
        abi: QuickMarketsABI,
        address: abiAddress as any,
        functionName: "batchPurchaseAssets",
        args: [orderIds],
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
