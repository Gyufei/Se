import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import { useChainConfig } from "@/lib/use-chain-config";
import { useWriteContract } from "wagmi";
import { useGasCalc } from "../helper/use-gas-calc";

export function useClaimAsset() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: {
      auctionId: number;
      winner: string;
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
      const { auctionId, winner } = args || {};

      const abiAddress = chainConfig.contracts.LuckyMarkets;

      const callParams = {
        abi: LuckyMarketsABI,
        address: abiAddress as any,
        functionName: "claimAsset",
        args: [auctionId, winner],
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
