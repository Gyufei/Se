import { useWriteContract } from "wagmi";
import { useChainConfig } from "@/lib/use-chain-config";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { QuickMarketsABI } from "@/lib/abi/QuickMarkets";

export function useListAsset() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

  const write = async (
    args: {
      nftAddr: string;
      tokenId: number;
      price: number;
      seller: string;
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
      const { nftAddr, tokenId, price, seller } = args || {};

      const abiAddress = chainConfig.contracts.QuickMarkets;

      const callParams = {
        abi: QuickMarketsABI,
        address: abiAddress as any,
        functionName: "listAsset",
        args: [nftAddr, tokenId, price, seller],
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
