import { useCallback, useEffect, useMemo, useState } from "react";
import { erc20Abi, isAddress } from "viem";
import { readContract } from "@wagmi/core";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import { USDTAbi } from "@/lib/abi/USDT";
import { useChainConfig } from "./use-chain-config";

export function useApprove(tokenAddr: string | undefined, tokenSymbol: string) {
  const { chainConfig } = useChainConfig();

  const allowAmount: number = 0;
  const config = useConfig();
  const spender = chainConfig.contracts.TesseraRouter;

  const { address: walletAccount } = useAccount();

  const [allowance, setAllowance] = useState<number | null>(null);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);

  const { writeContract, isPending: isApproving } = useWriteContract();

  const shouldWithApprove = useMemo(() => {
    if (!tokenAddr || !isAddress(tokenAddr)) return false;

    if (tokenSymbol === "ETH") return false;

    if (!walletAccount || !spender) return false;

    return true;
  }, [walletAccount, spender, tokenAddr, tokenSymbol]);

  const readAllowance = useCallback(async () => {
    if (!shouldWithApprove) return;

    setIsAllowanceLoading(true);

    try {
      const res = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddr as any,
        functionName: "allowance",
        args: [walletAccount!, spender as any],
      });

      setAllowance(Number(res) / 10 ** 18);
    } catch (e) {
      console.error("readAllowance error: =>", e);
    } finally {
      setIsAllowanceLoading(false);
    }
  }, [shouldWithApprove, walletAccount, config, spender, tokenAddr]);

  useEffect(() => {
    readAllowance();
  }, [readAllowance]);

  const isShouldApprove = useMemo(() => {
    if (!shouldWithApprove) return false;
    if (allowance == null || isAllowanceLoading) return false;

    if (allowance === 0) return true;
    if (allowance < allowAmount) return true;

    return false;
  }, [allowance, allowAmount, shouldWithApprove, isAllowanceLoading]);

  const approveBtnText = useMemo(() => {
    if (!shouldWithApprove) return "";

    if (isApproving) {
      return `Approving ${tokenSymbol}...`;
    }

    if (isShouldApprove) {
      return `Approve ${tokenSymbol}`;
    }

    return "";
  }, [shouldWithApprove, isShouldApprove, tokenSymbol, isApproving]);

  async function approveAction() {
    try {
      if (!shouldWithApprove) return () => {};

      const isUSDT = tokenSymbol === "USDT";
      const amountMax =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      const amount = isUSDT ? (allowAmount == 0 ? amountMax : "0") : amountMax;

      const callParams = {
        abi: isUSDT ? USDTAbi : erc20Abi,
        address: tokenAddr as any,
        functionName: "approve",
        args: [spender, amount],
      };

      writeContract(
        {
          ...(callParams as any),
        },
        {
          onSuccess: () => {
            readAllowance();
          },
          onError: (error) => {
            console.error("approveAction error: =>", error);
          },
        },
      );
    } catch (e) {
      console.error("approveAction error: =>", e);
    }
  }

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
