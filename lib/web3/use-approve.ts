import { useCallback, useEffect, useMemo, useState } from "react";
import { erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { USDTAbi } from "@/lib/abi/USDT";
import { ChainType } from "@/lib/types/chain";
import { ChainConfigs } from "@/lib/const/chain-config";

export function useApprove(
  tokenAddr: string,
  tokenSymbol: string,
  skipApprove: boolean = false,
) {
  const allowAmount: number = 0;

  const config = useConfig();
  const chainConf = ChainConfigs[ChainType.Uni];
  const spender = chainConf.contracts.TesseraRouter;

  const { address: walletAccount } = useAccount();

  const [allowance, setAllowance] = useState<number | null>(null);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { data: hash, writeContract } = useWriteContract();

  const { data: txReceipt, error: txError } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  const shouldWithApprove = useMemo(() => {
    if (skipApprove) return false;

    if (!tokenAddr) return false;

    if (tokenSymbol === "ETH" || tokenSymbol === "BNB") return false;

    if (!walletAccount || !spender || !tokenAddr) return false;

    return true;
  }, [skipApprove, walletAccount, spender, tokenAddr, tokenSymbol]);

  const readAllowance = useCallback(async () => {
    if (!shouldWithApprove) return;

    setIsAllowanceLoading(true);

    const res = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddr as any,
      functionName: "allowance",
      args: [walletAccount!, spender as any],
    });

    setIsAllowanceLoading(false);
    setAllowance(Number(res) / 10 ** 18);
  }, [shouldWithApprove, walletAccount, config, spender, tokenAddr]);

  useEffect(() => {
    readAllowance();
  }, [readAllowance]);

  useEffect(() => {
    if (txReceipt) {
      setIsApproving(false);
      readAllowance();
    }

    if (txError) {
      setIsApproving(false);
    }
  }, [txReceipt, txError, readAllowance]);

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
    if (!shouldWithApprove) return () => {};

    setIsApproving(true);

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

    writeContract(callParams as any);
  }

  return {
    isShouldApprove,
    isApproving,
    approveAction,
    approveBtnText,
  };
}
