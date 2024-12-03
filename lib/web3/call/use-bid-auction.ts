import { useChainConfig } from "@/lib/web3/use-chain-config";
import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useBidAuction() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      bidder: string;
      auctionId: number;
      amount: number;
    },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { bidder, auctionId, amount } = args || {};

      const abiAddress = chainConfig.contracts.LuckyMarkets;

      const callParams = {
        abi: LuckyMarketsABI,
        address: abiAddress as any,
        functionName: "bidAuction",
        args: [bidder, BigInt(auctionId), BigInt(amount)],
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
