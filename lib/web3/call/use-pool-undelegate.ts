import { useChainConfig } from "@/lib/web3/use-chain-config";
import { DelegatePoolABI } from "@/lib/abi/DelegatePool";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function usePoolUndelegate() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: { poolId: string; undelegateNum: number },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { poolId, undelegateNum } = args || {};

      const abiAddress = chainConfig.contracts.DelegatePool;

      const callParams = {
        abi: DelegatePoolABI,
        address: abiAddress as any,
        functionName: "undelegate",
        args: [poolId, BigInt(undelegateNum)],
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
