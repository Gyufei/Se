"use client";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { RAE } from "@/lib/const/rae";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useCreateAuction } from "@/lib/web3/call/use-create-auction";
import { useApprove } from "@/lib/web3/use-approve";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { multiply } from "safebase";

const nftInfo = {
  name: "NFT #3333",
  nftAddr: "0x12345612131314141412414124214124",
  tokenId: 1,
};

export default function CreateBidding() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const {
    isShouldApprove: isShouldApproveNft,
    isApproving: isApprovingNft,
    approveAction: approveActionNft,
    approveBtnText: approveBtnTextNft,
  } = useApprove(nftInfo.nftAddr, nftInfo.name);

  const {
    isShouldApprove: isShouldApproveRae,
    isApproving: isApprovingRae,
    approveAction: approveActionRae,
    approveBtnText: approveBtnTextRae,
  } = useApprove(RAE.address, RAE.symbol);

  const { write, isPending: isCreating } = useCreateAuction();

  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [bidCap, setBidCap] = useState("");

  function handleConfirm() {
    if (isShouldApproveRae) {
      approveActionRae();
      return;
    }

    if (isShouldApproveNft) {
      approveActionNft();
      return;
    }

    const bidDuration =
      multiply(days || "0", String(24 * 60 * 60)) +
      multiply(hours || "0", String(60 * 60));

    write(
      {
        nftAddr: nftInfo.nftAddr,
        tokenId: nftInfo.tokenId,
        biddingCap: multiply(bidCap, String(10 ** RAE.decimals)),
        taxRate: multiply(taxRate, String(10 ** 2)),
        bidDuration,
      },
      {
        onSuccess: () => {
          setDays("");
          setHours("");
          setTaxRate("");
          setBidCap("");
          queryClient.invalidateQueries({ queryKey: [nftInfo.nftAddr] });
          setGlobalMsg({
            type: "success",
            message: "Vault successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: e.message || "Vault failed",
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (isShouldApproveNft) {
      return {
        text: approveBtnTextNft,
        disabled: isApprovingNft,
      };
    }

    if (isShouldApproveRae) {
      return {
        text: approveBtnTextRae,
        disabled: isApprovingRae,
      };
    }

    if (!days && !hours) {
      return {
        text: "Enter duration",
        disabled: true,
      };
    }

    if (!taxRate) {
      return {
        text: "Enter tax rate",
        disabled: true,
      };
    }

    if (Number(taxRate) >= 100) {
      return {
        text: "Invalid tax rate",
        disabled: true,
      };
    }

    if (!bidCap) {
      return {
        text: "Enter bidding cap",
        disabled: true,
      };
    }

    if (isCreating) {
      return {
        text: "Depositing...",
        disabled: true,
      };
    }

    return {
      text: "Deposit",
      disabled: false,
    };
  }, [
    days,
    hours,
    taxRate,
    bidCap,
    isShouldApproveNft,
    isApprovingNft,
    approveBtnTextNft,
    isShouldApproveRae,
    isApprovingRae,
    approveBtnTextRae,
    isCreating,
  ]);

  return (
    <>
      <div className="bg-[#281A31] p-5 mt-5">
        <div className="text-xl font-medium text-white">Bidding Details</div>
        <div className="flex items-center justify-between mt-9">
          <div className="flex items-center space-x-5">
            <div className="flex flex-col">
              <span className="text-base text-white opacity-60">Days</span>
              <NumericalInput
                className="h-12 w-[118px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
                placeholder="0"
                value={days}
                onUserInput={(v) => setDays(v)}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base text-white opacity-60">Hours</span>
              <NumericalInput
                className="h-12 w-[118px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
                placeholder="0"
                value={hours}
                onUserInput={(v) => setHours(v)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-base text-white opacity-60">
              Tax Rate (%)
            </span>
            <NumericalInput
              className="h-12 w-[90px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
              placeholder="0"
              value={taxRate}
              onUserInput={(v) => setTaxRate(v)}
            />
          </div>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div className="flex flex-col">
            <span className="text-base text-white opacity-60">Bidding Cap</span>
            <div className="flex items-center mt-[15px]">
              <NumericalInput
                className="h-12 w-[236px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
                placeholder="0"
                value={bidCap}
                onUserInput={(v) => setBidCap(v)}
              />
              <div className="text-base text-white opacity-60 inline-block ml-5">
                ~ $3000{" "}
              </div>
            </div>
          </div>

          <RaeToken />
        </div>
      </div>
      <ShouldConnectBtn
        disabled={btnProps.disabled}
        className="mt-5 w-full"
        onClick={handleConfirm}
      >
        {btnProps.text}
      </ShouldConnectBtn>
    </>
  );
}
