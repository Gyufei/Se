import { useCallback, useEffect, useMemo, useState } from "react";
import { erc721Abi, isAddress } from "viem";
import { readContract } from "@wagmi/core";
import { useAccount, useConfig, useWriteContract } from "wagmi";
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
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);

  const { writeContract, isPending: isApproving } = useWriteContract();

  const shouldWithApprove = useMemo(() => {
    if (!nftAddr || !isAddress(nftAddr) || !nftId) return false;
    if (!walletAccount || !spender) return false;

    return true;
  }, [walletAccount, spender, nftAddr, nftId]);

  const readAllowance = useCallback(async () => {
    if (!shouldWithApprove) return;

    setIsAllowanceLoading(true);

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
      setIsAllowanceLoading(false);
    }
  }, [shouldWithApprove, config, nftAddr, nftId, spender]);

  useEffect(() => {
    readAllowance();
  }, [readAllowance]);

  const isShouldApprove = useMemo(() => {
    if (!shouldWithApprove) return false;
    if (!isApproved || isAllowanceLoading) return false;

    if (isApproved) return true;
    return false;
  }, [isApproved, shouldWithApprove, isAllowanceLoading]);

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
