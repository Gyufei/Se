import { useWaitForTransactionReceipt } from "wagmi";
import { RAEMarketsABI } from "@/lib/abi/RAEMarkets";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function useBuyRae() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const {
    isPending: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: mutation.data,
    query: {
      enabled: !!mutation.data,
    },
  });

  const writeContract = async (
    args: {
      payAmount: number;
      buyAmount: number;
      buyer: string;
      payTokenAddress: string;
      gas: number;
    },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { payAmount, buyAmount, buyer, payTokenAddress, gas } = args || {};
      const isNativeToken = payTokenAddress === chainConfig.nativeTokenAddr;

      const abiAddress = chainConfig.contracts.RAEMarkets;

      const valueParams = isNativeToken
        ? {
            value: BigInt(payAmount),
          }
        : {};

      const callParams = {
        abi: RAEMarketsABI,
        address: abiAddress as any,
        functionName: isNativeToken
          ? "purchaseRAEWithETH"
          : "purchaseRAEWithToken",
        args: isNativeToken
          ? [BigInt(buyAmount), buyer]
          : [payTokenAddress, payAmount, buyer],
        ...valueParams,
      };

      mutation.writeContract(callParams as any, {
        ...rest,
        gas,
      });
    } catch (e) {
      console.log("tx error", e);
    }
  };

  return {
    ...mutation,
    writeContract,
    isPending: mutation.isPending || (mutation.data && isTxPending),
    error: mutation.error || txError,
    isSuccess: isTxSuccess,
  };
}
