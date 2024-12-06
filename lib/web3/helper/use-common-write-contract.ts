import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useCorrectChain } from "./use-switch-chain";
import { useGasCalc } from "./use-gas-calc";
import { useEffect, useRef } from "react";

export interface CommonWriteContractRestParams {
  onSuccess?: () => void;
  onError?: (e: any) => void;
  gas?: number;
}

export function useCommonWriteContract() {
  const mutation = useWriteContract();

  const { switchToTargetChain } = useCorrectChain();
  const { getGasParams } = useGasCalc();

  const successFnRef = useRef<() => void | undefined>();
  const errorFnRef = useRef<(_e: any) => void | undefined>();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error,
  } = useWaitForTransactionReceipt({
    hash: mutation.data,
    query: {
      enabled: !!mutation.data,
    },
  });

  useEffect(() => {
    if (isConfirmed && successFnRef.current) {
      successFnRef.current();
    }
  }, [isConfirmed]);

  useEffect(() => {
    if ((mutation.error || error) && errorFnRef.current) {
      errorFnRef.current(mutation.error || error);
    }
  }, [error, mutation.error]);

  async function overrideWriteContract(
    callParams: Parameters<typeof mutation.writeContract>[0],
    rest: CommonWriteContractRestParams,
  ) {
    try {
      const switchRes = await switchToTargetChain();
      if (!switchRes) {
        return;
      }

      const gasParams = await getGasParams(callParams, rest?.gas);

      mutation.writeContract(
        {
          ...(callParams as any),
          ...gasParams,
        },
        {
          onSuccess: () => {
            successFnRef.current = rest?.onSuccess;
          },
          onError: () => {
            errorFnRef.current = rest?.onError;
          },
        },
      );
    } catch (e: any) {
      return e;
    }
  }

  return {
    ...mutation,
    writeContract: overrideWriteContract,
    isPending: mutation.isPending || (mutation.data && isConfirming),
    isSuccess: isConfirmed,
  };
}
