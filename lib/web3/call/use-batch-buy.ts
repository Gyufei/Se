import { useChainConfig } from "@/lib/web3/use-chain-config";
import { QuickMarketsABI } from "@/lib/abi/QuickMarkets";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useBatchBuy() {
  const { chainConfig } = useChainConfig();
  const mutation = useCommonWriteContract();

  async function writeContract(
    args: {
      orderIds: string[];
    },
    rest: CommonWriteContractRestParams,
  ) {
    try {
      const { orderIds } = args || {};
      const abiAddress = chainConfig.contracts.QuickMarkets;

      const callParams = {
        abi: QuickMarketsABI,
        address: abiAddress as any,
        functionName: "batchPurchaseAssets",
        args: [orderIds],
      };

      await mutation.writeContract(callParams, rest);
    } catch (e: any) {
      console.log("tx error", e);
    }
  }

  return {
    ...mutation,
    writeContract,
  };
}
