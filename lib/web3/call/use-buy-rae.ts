import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGasCalc } from "@/lib/web3/helper/use-gas-calc";
import { RAEMarketsABI } from "@/lib/abi/RAEMarkets";
import { useChainConfig } from "@/lib/use-chain-config";

export function useBuyRae() {
  const { chainConfig } = useChainConfig();
  const { getGasParams } = useGasCalc();

  const mutation = useWriteContract();

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

  const write = async (
    args: {
      payAmount: number;
      buyAmount: number;
      buyer: string;
      payTokenAddress: string;
      gas: number;
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

      const gasParams = await getGasParams(callParams, gas);

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
    } catch (e) {
      console.log("tx error", e);
    }
  };

  return {
    writeContractRes: mutation,
    write,
    isPending: mutation.isPending || (mutation.data && isTxPending),
    error: mutation.error || txError,
    isSuccess: isTxSuccess,
  };
}
