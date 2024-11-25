import { useConfig } from "wagmi";
import { UniswapRouterABI } from "@/lib/abi/UniswapRouter";
import { readContract } from "@wagmi/core";
import { useChainConfig } from "@/lib/use-chain-config";

export default function useGetAmountInOut() {
  const config = useConfig();
  const { chainConfig } = useChainConfig();
  const abiAddress = chainConfig.contracts.UniswapV2Router;

  async function getAmountOut(
    payAmount: string,
    payTokenAddr: string,
    buyTokenAddr: string,
  ) {
    const result = await readContract(config, {
      abi: UniswapRouterABI,
      address: abiAddress as any,
      functionName: "getAmountsOut",
      args: [BigInt(payAmount), [payTokenAddr as any, buyTokenAddr as any]],
    });

    return result[1];
  }

  async function getAmountIn(
    buyAmount: string,
    payTokenAddr: string,
    buyTokenAddr: string,
  ) {
    const result = await readContract(config, {
      abi: UniswapRouterABI,
      address: abiAddress as any,
      functionName: "getAmountsIn",
      args: [BigInt(buyAmount), [buyTokenAddr as any, payTokenAddr as any]],
    });

    return result[0];
  }

  return {
    getAmountOut,
    getAmountIn,
  };
}
