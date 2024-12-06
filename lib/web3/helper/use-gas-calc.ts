import { round } from "lodash";
import { multiply } from "safebase";
import { useAccount, useGasPrice, usePublicClient } from "wagmi";

export function useGasCalc() {
  const { address } = useAccount();
  const { data: rawGasPrice } = useGasPrice();

  const publicClient = usePublicClient();

  function getGasPrice(gas?: number) {
    switch (Number(gas)) {
      case 0.05:
        return multiply(String(rawGasPrice), String(1.05));
      case 0.1:
        return multiply(String(rawGasPrice), String(1.1));
      case 0.15:
        return multiply(String(rawGasPrice), String(1.15));

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
        ...callParams,
        account: address,
      } as any);

      const gasPrice = getGasPrice(gas);
      const gasLimit = multiply(String(estGas), String(130 / 100));
      const maxPriorityFeePerGas = multiply(String(gasPrice), String(0.05));

      const gasParams: {
        maxFeePerGas?: bigint;
        gas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {
        maxFeePerGas: BigInt(round(gasPrice)),
        gas: BigInt(round(gasLimit)),
        maxPriorityFeePerGas: BigInt(round(maxPriorityFeePerGas)),
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
