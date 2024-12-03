import { useChainConfig } from "@/lib/web3/use-chain-config";
import { QuickMarketsABI } from "@/lib/abi/QuickMarkets";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useListAsset() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      nftAddr: string;
      tokenId: number;
      price: number;
      seller: string;
    },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { nftAddr, tokenId, price, seller } = args || {};

      const abiAddress = chainConfig.contracts.QuickMarkets;

      const callParams = {
        abi: QuickMarketsABI,
        address: abiAddress as any,
        functionName: "listAsset",
        args: [nftAddr, BigInt(tokenId), BigInt(price), seller],
      };

      mutation.writeContract(callParams, rest);
    } catch (e: any) {
      console.log("tx error", e);
    }
  };

  return {
    ...mutation,
    writeContract,
  };
}
