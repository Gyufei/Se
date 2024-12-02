import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useClaimAsset() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      auctionId: number;
      winner: string;
    },
    rest: CommonWriteContractRestParams,
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
