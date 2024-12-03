import { useChainConfig } from "@/lib/web3/use-chain-config";
import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";
import { DelegatePoolABI } from "@/lib/abi/DelegatePool";

export function useBidAuction() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      bidder: string;
      auctionId: number;
      amount: number;
      asPool: boolean;
    },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { bidder, auctionId, amount, asPool } = args || {};

      const delegatePoolAbiAddress = chainConfig.contracts.DelegatePool;
      const luckyMarketAbiAddress = chainConfig.contracts.LuckyMarkets;

      const callParams = asPool
        ? {
            abi: DelegatePoolABI,
            address: delegatePoolAbiAddress as any,
            functionName: "bidAuction",
            args: [bidder, BigInt(auctionId), BigInt(amount)],
          }
        : {
            abi: LuckyMarketsABI,
            address: luckyMarketAbiAddress as any,
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
