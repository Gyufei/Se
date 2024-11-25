import { useReadContract } from "wagmi";
import { useChainConfig } from "../use-chain-config";
import { RAEMarketsABI } from "../abi/RAEMarkets";

export default function useRaePrice() {
  const { chainConfig } = useChainConfig();
  const abiAddress = chainConfig.contracts.RAEMarkets;

  const result = useReadContract({
    abi: RAEMarketsABI,
    address: abiAddress as any,
    functionName: "raePrice",
    args: [],
  });

  return result;
}
