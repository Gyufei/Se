import { useWriteContract } from "wagmi";
import { useCorrectChain } from "./use-switch-chain";
import { useGasCalc } from "./use-gas-calc";

export interface CommonWriteContractRestParams {
  onSuccess?: () => void;
  onError?: (e: any) => void;
  gas?: number;
}

export function useCommonWriteContract() {
  const mutation = useWriteContract();

  const { switchToTargetChain } = useCorrectChain();
  const { getGasParams } = useGasCalc();

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
            rest?.onSuccess?.();
          },
          onError: (e: any) => {
            rest?.onError?.(e);
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
  };
}
