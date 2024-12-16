"use client";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { RAE } from "@/lib/const/platform";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useCreateAuction } from "@/lib/web3/call/use-create-auction";
import { useApprove } from "@/lib/web3/use-approve";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { add, multiply } from "safebase";
import { useMyNFTCollectionsPageContext } from "../../page-context";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { Skeleton } from "@/components/ui/skeleton";
import { useApproveNft } from "@/lib/web3/use-approve-nft";
import { covertErrorMsg } from "@/lib/utils/error";
import ErrorMessage from "@/app/_common/error-message";
import { checkIsPlatformNFT } from "@/lib/helper/nft";

export default function CreateBidding() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { selectedNft } = useMyNFTCollectionsPageContext();
  const isPlatformNFT = checkIsPlatformNFT(selectedNft);

  const {
    isShouldApprove: isShouldApproveNft,
    isApproving: isApprovingNft,
    approveAction: approveActionNft,
    approveBtnText: approveBtnTextNft,
  } = useApproveNft(
    selectedNft?.token_address || "",
    selectedNft?.token_id || "",
    `#${selectedNft?.token_id}`,
  );

  const {
    isShouldApprove: isShouldApproveRae,
    isApproving: isApprovingRae,
    approveAction: approveActionRae,
    approveBtnText: approveBtnTextRae,
  } = useApprove(RAE.address, RAE.symbol);

  const { writeContract, isPending: isCreating } = useCreateAuction();

  const { data: raePriceData, isPending: isRaePricePending } = useRaePrice();

  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [durationError, setDurationError] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [taxRateError, setTaxRateError] = useState("");
  const [bidCap, setBidCap] = useState("");
  const [bidCapError, setBidCapError] = useState("");

  const bidCapValue = useMemo(() => {
    if (isRaePricePending || !raePriceData || !bidCap) return "";

    return multiply(bidCap, raePriceData.price);
  }, [raePriceData, bidCap, isRaePricePending]);

  function handleDaysChange(v: string) {
    setDays(v);
    checkDuration(v, hours);
  }
  function handleHoursChange(v: string) {
    setHours(v);
    checkDuration(days, v);
  }
  function handleTaxRateChange(v: string) {
    setTaxRate(v);
    checkTaxRate(v);
  }
  function handleBidCapChange(v: string) {
    setBidCap(v);
    checkBidCap(v);
  }
  function checkDuration(d: string, h: string) {
    if (!d && !h) {
      setDurationError("Enter duration");
      return false;
    }
    setDurationError("");
    return true;
  }
  function checkTaxRate(v: string) {
    if (Number(v) >= 100) {
      setTaxRateError("Invalid tax rate");
      return false;
    }
    setTaxRateError("");
    return true;
  }
  function checkBidCap(v: string) {
    if (!v) {
      setBidCapError("Enter bidding cap");
      return false;
    }

    if (
      isPlatformNFT &&
      Number(v) > multiply(selectedNft?.price || "0", "1.5")
    ) {
      setBidCapError("Bidding cap cannot be greater than 150% of the price");
      return false;
    }

    setBidCapError("");
    return true;
  }

  function checkToConfirm() {
    const isDurationValid = checkDuration(days, hours);
    const isTaxRateValid = checkTaxRate(taxRate);
    const isBidCapValid = checkBidCap(bidCap);

    return isDurationValid && isTaxRateValid && isBidCapValid;
  }

  function handleConfirm() {
    if (!selectedNft) return;

    if (isShouldApproveRae) {
      approveActionRae();
      return;
    }

    if (isShouldApproveNft) {
      approveActionNft();
      return;
    }

    if (!checkToConfirm()) return;

    const bidDuration = Number(
      add(
        multiply(days || "0", String(24 * 60 * 60)),
        multiply(hours || "0", String(60 * 60)),
      ),
    );

    writeContract(
      {
        nftAddr: selectedNft.token_address,
        tokenId: Number(selectedNft.token_id),
        biddingCap: Number(multiply(bidCap, String(10 ** RAE.decimals))),
        taxRate: Number(multiply(taxRate || "0", String(10 ** 2))),
        bidDuration,
        minBidAmount: 0,
        auctionType: "NORMAL",
      },
      {
        onSuccess: () => {
          setDays("");
          setHours("");
          setTaxRate("");
          setBidCap("");
          queryClient.invalidateQueries({ queryKey: [] });
          setGlobalMsg({
            type: "success",
            message: "Vault successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "Vault failed"),
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

    if (isCreating) {
      return {
        text: "Vaulting...",
        disabled: true,
      };
    }

    return {
      text: "Vault",
      disabled: false,
    };
  }, [
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
          <div className="relative flex items-center space-x-5">
            <div className="flex flex-col">
              <span className="text-base text-white opacity-60">Days</span>
              <NumericalInput
                className="h-12 w-[118px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
                placeholder="0"
                value={days}
                onUserInput={(v) => handleDaysChange(v)}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base text-white opacity-60">Hours</span>
              <NumericalInput
                className="h-12 w-[118px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
                placeholder="0"
                value={hours}
                onUserInput={(v) => handleHoursChange(v)}
              />
            </div>
            <ErrorMessage
              error={durationError}
              className="absolute -bottom-[22px]"
            />
          </div>

          <div className="flex flex-col relative">
            <span className="text-base text-white opacity-60">
              Tax Rate (%)
            </span>
            <NumericalInput
              className="h-12 w-[90px] mt-[15px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
              placeholder="0"
              value={taxRate}
              onUserInput={(v) => handleTaxRateChange(v)}
            />
            <ErrorMessage
              className="absolute -bottom-[22px] ml-0 whitespace-nowrap"
              error={taxRateError}
            />
          </div>
        </div>

        <div className="flex relative items-end justify-between mt-5">
          <div className="flex flex-col">
            <span className="text-base text-white opacity-60">Bidding Cap</span>
            <div className="flex items-center mt-[15px]">
              <NumericalInput
                className="h-12 w-[236px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
                placeholder="0"
                value={bidCap}
                onUserInput={(v) => handleBidCapChange(v)}
              />
              {isRaePricePending ? (
                <Skeleton className="w-[60px] h-[20px] ml-5" />
              ) : (
                bidCapValue && (
                  <div className="text-base text-white opacity-60 inline-block ml-5">
                    ~ ${bidCapValue}
                  </div>
                )
              )}
            </div>
            <ErrorMessage
              className="absolute -bottom-[20px] ml-0"
              error={bidCapError}
            />
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
