import { useChainConfig } from "@/lib/web3/use-chain-config";
import { LuckyMarketsABI } from "@/lib/abi/LuckyMarkets";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";
import { IAuction } from "@/lib/api/use-auction";

export function useCreateAuction() {
  const { chainConfig } = useChainConfig();
  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: {
      nftAddr: string;
      tokenId: number;
      biddingCap: number;
      minBidAmount: number;
      taxRate: number;
      bidDuration: number;
      auctionType: IAuction["auction_type"];
    },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const {
        nftAddr,
        tokenId,
        biddingCap,
        minBidAmount,
        taxRate,
        bidDuration,
        auctionType,
      } = args || {};

      const abiAddress = chainConfig.contracts.LuckyMarkets;

      const bidType = auctionType === "NORMAL" ? 0 : 1;
      const minAmount = bidType ? 0 : minBidAmount;

      const callParams = {
        abi: LuckyMarketsABI,
        address: abiAddress as any,
        functionName: "createAuction",
        args: [
          nftAddr,
          BigInt(tokenId),
          BigInt(biddingCap),
          BigInt(minAmount),
          BigInt(taxRate),
          BigInt(bidDuration),
          bidType,
        ],
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
