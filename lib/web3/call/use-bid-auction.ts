import { useWriteContract } from "wagmi";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";

export function useBidAuction() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: {
      bidder: string;
      auctionId: number;
      amount: number;
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
      const { bidder, auctionId, amount } = args || {};

      const abiAddress = chainConfig.contracts.LuckyMarkets;

      const callParams = {
        abi: LuckyMarketsABI,
        address: abiAddress as any,
        functionName: "bidAuction",
        args: [bidder, auctionId, amount],
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
