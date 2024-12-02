import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useRetrieveNft() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      auctionId: number;
    },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { auctionId } = args || {};

      const abiAddress = chainConfig.contracts.LuckyMarkets;

      const callParams = {
        abi: LuckyMarketsABI,
        address: abiAddress as any,
        functionName: "retrieveNFT",
        args: [auctionId],
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
