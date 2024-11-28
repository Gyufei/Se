import { useReadContract, useAccount, useBalance } from "wagmi";
import { erc20Abi } from "viem";
import { useChainConfig } from "@/lib/web3/use-chain-config";

export function useTokenBalance({ address }: { address: string }) {
  const { chainConfig } = useChainConfig();
  const { address: myAccount } = useAccount();

  const isNativeToken = address === chainConfig.nativeTokenAddr;

  const ethResult = useBalance({
    address: myAccount,
    query: {
      enabled: !!(address && chainConfig && isNativeToken),
    },
  });

  const tokenResult = useReadContract({
    abi: erc20Abi,
    address: address as any,
    functionName: "balanceOf",
    args: [myAccount as any],
    query: {
      enabled: !!(address && chainConfig && !isNativeToken),
    },
  });

  const ethBalance = ethResult.data?.value || 0n;
  const tokenBalance = tokenResult.data || 0n;

  return isNativeToken
    ? {
        ...ethResult,
        data: ethBalance,
      }
    : {
        ...tokenResult,
        data: tokenBalance,
      };
}
