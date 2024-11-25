import { multiply } from "safebase";
import { useAccount, useGasPrice, usePublicClient } from "wagmi";

export function useGasCalc() {
  const { address } = useAccount();
  const { data: rawGasPrice } = useGasPrice();

  const publicClient = usePublicClient();

  function getGasPrice(gas?: number) {
    switch (Number(gas)) {
      case 0.05:
        return multiply(rawGasPrice, String(1.05));
      case 0.1:
        return multiply(rawGasPrice, String(1.1));
      case 0.15:
        return multiply(rawGasPrice, String(1.15));

      default:
        return rawGasPrice;
    }
  }

  const getGasParams = async (
    callParams: Record<string, any>,
    gas?: number,
  ) => {
    try {
      const estGas = await publicClient!.estimateContractGas({
        from: address,
        ...callParams,
      } as any);

      const gasPrice = getGasPrice(gas);
      const gasLimit = multiply(Number(estGas), String(130 / 100)).toFixed();
      const maxPriorityFeePerGas = Math.ceil(multiply(Number(gasPrice), 0.05));

      const gasParams: {
        maxFeePerGas?: bigint;
        gas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {
        maxFeePerGas: gasPrice,
        gas: BigInt(gasLimit),
        maxPriorityFeePerGas: BigInt(maxPriorityFeePerGas),
      };

      console.log(gasParams);
      return gasParams;
    } catch (e) {
      console.error("calc gas error: =>", e);
      return {};
    }
  };

  return {
    getGasParams,
  };
}
