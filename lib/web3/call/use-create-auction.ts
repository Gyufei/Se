import { useChainConfig } from "@/lib/web3/use-chain-config";
import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useCreateAuction() {
  const { chainConfig } = useChainConfig();
  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      nftAddr: string;
      tokenId: number;
      biddingCap: number;
      taxRate: number;
      bidDuration: number;
    },
    rest: CommonWriteContractRestParams,
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
