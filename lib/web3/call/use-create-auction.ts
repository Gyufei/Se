import { useWriteContract } from "wagmi";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";

export function useCreateAuction() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: {
      nftAddr: string;
      tokenId: number;
      biddingCap: number;
      taxRate: number;
      bidDuration: number;
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
      const { nftAddr, tokenId, biddingCap, taxRate, bidDuration } = args || {};

      const abiAddress = chainConfig.contracts.LuckyMarkets;

      const callParams = {
        abi: LuckyMarketsABI,
        address: abiAddress as any,
        functionName: "createAuction",
        args: [nftAddr, tokenId, biddingCap, taxRate, bidDuration],
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
