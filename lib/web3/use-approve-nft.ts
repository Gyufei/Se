import { useCallback, useEffect, useMemo, useState } from "react";
import { erc721Abi, isAddress } from "viem";
import { readContract } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useChainConfig } from "./use-chain-config";
import { checkIsSameAddress } from "../utils/web3";

export function useApproveNft(
  nftAddr: string | undefined,
  nftId: string | undefined,
  nftName: string | undefined,
) {
  const { chainConfig } = useChainConfig();
  const config = useConfig();
  const spender = chainConfig.contracts.TesseraRouter;

  const { address: walletAccount } = useAccount();

  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isApprovedLoading, setIsApprovedLoading] = useState(false);

  const mutation = useWriteContract();
  const confirmMutation = useWaitForTransactionReceipt({
    hash: mutation.data,
    query: {
      enabled: !!mutation.data,
    },
  });
  const isApproving =
    mutation.isPending || (mutation.isSuccess && confirmMutation.isPending);

  const shouldWithApprove = useMemo(() => {
    if (!nftAddr || !isAddress(nftAddr) || !nftId) return false;
    if (!walletAccount || !spender) return false;

    return true;
  }, [walletAccount, spender, nftAddr, nftId]);

  const readAllowance = useCallback(async () => {
    if (!shouldWithApprove) return;

    setIsApprovedLoading(true);

    try {
      const res = await readContract(config, {
        abi: erc721Abi,
        address: nftAddr as any,
        functionName: "getApproved",
        args: [BigInt(nftId!)],
      });

      setIsApproved(checkIsSameAddress(res, spender));
    } catch (e) {
      console.error("readAllowance error: =>", e);
    } finally {
      setIsApprovedLoading(false);
    }
  }, [shouldWithApprove, config, nftAddr, nftId, spender]);

  useEffect(() => {
    readAllowance();
  }, [readAllowance]);

  useEffect(() => {
    if (confirmMutation.isSuccess) {
      readAllowance();
    }
  }, [confirmMutation.isSuccess, readAllowance]);

  const isShouldApprove = useMemo(() => {
    if (!shouldWithApprove) return false;
    if (isApproved || isApprovedLoading) return false;

    if (!isApproved) return true;
    return false;
  }, [isApproved, shouldWithApprove, isApprovedLoading]);

  const approveBtnText = useMemo(() => {
    if (!shouldWithApprove) return "";

    if (isApproving) {
      return `Approving ${nftName}...`;
    }

    if (isShouldApprove) {
      return `Approve ${nftName}`;
    }

    return "";
  }, [shouldWithApprove, isShouldApprove, nftName, isApproving]);

  async function approveAction() {
    try {
      if (!shouldWithApprove) return () => {};

      const callParams = {
        abi: erc721Abi,
        address: nftAddr as any,
        functionName: "approve",
        args: [spender, BigInt(nftId!)],
      };

      mutation.writeContract(
        {
          ...(callParams as any),
        },
        {
          onSuccess: () => {},
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
