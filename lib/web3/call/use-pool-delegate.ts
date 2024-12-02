import { useChainConfig } from "@/lib/web3/use-chain-config";
import { DelegatePoolABI } from "@/lib/abi/DelegatePool";
import {
  CommonWriteContractRestParams,
  useCommonWriteContract,
} from "../helper/use-common-write-contract";

export function usePoolDelegate() {
  const { chainConfig } = useChainConfig();

  const mutation = useCommonWriteContract();

  const writeContract = async (
    args: { poolId: string; delegateNum: number },
    rest: CommonWriteContractRestParams,
  ) => {
    try {
      const { poolId, delegateNum } = args || {};

      const abiAddress = chainConfig.contracts.DelegatePool;

      const callParams = {
        abi: DelegatePoolABI,
        address: abiAddress as any,
        functionName: "delegate",
        args: [poolId, BigInt(delegateNum)],
      };

      mutation.writeContract(callParams, rest);
    } catch (e) {
      console.log("tx error", e);
    }
  };

  return {
    ...mutation,
    writeContract,
  };
}
