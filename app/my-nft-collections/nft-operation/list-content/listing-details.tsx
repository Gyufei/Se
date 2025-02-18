"use client";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { RAE } from "@/lib/const/platform";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useApprove } from "@/lib/web3/use-approve";
import { useQueryClient } from "@tanstack/react-query";
import { multiply } from "safebase";
import { useListAsset } from "@/lib/web3/call/use-list-asset";
import { truncateAddr } from "@/lib/utils/web3";
import { useMyNFTCollectionsPageContext } from "../../page-context";
import { Skeleton } from "@/components/ui/skeleton";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { useApproveNft } from "@/lib/web3/use-approve-nft";
import { covertErrorMsg } from "@/lib/utils/error";
import ErrorMessage from "@/app/_common/error-message";
import { checkIsPlatformNFT } from "@/lib/helper/nft";

export default function ListingDetail() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { nftType, selectedNft, selectedNftMarket } =
    useMyNFTCollectionsPageContext();
  const guidePrice = selectedNftMarket?.guide_price;

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

  const { writeContract, isPending: isListing } = useListAsset();

  const { data: raePriceData, isPending: isRaePricePending } = useRaePrice();

  useEffect(() => {
    if (isPlatformNFT) {
      setSellPrice(selectedNft?.price || "");
    }
  }, [isPlatformNFT, selectedNft?.price]);

  const [sellPrice, setSellPrice] = useState("");
  const [sellPriceError, setSellPriceError] = useState("");

  const sellPriceValue = useMemo(() => {
    if (isRaePricePending || !raePriceData || !sellPrice) return "";

    return multiply(sellPrice, raePriceData.price);
  }, [raePriceData, sellPrice, isRaePricePending]);

  function handleInputPrice(v: string) {
    setSellPrice(v);
    checkPrice(v);
  }

  function checkPrice(v: string) {
    if (!v) {
      setSellPriceError("Price is required");
      return false;
    }

    if (Number(v) > Number(guidePrice || 0)) {
      setSellPriceError(`price greater than guide price: ${guidePrice}`);
      return false;
    }

    setSellPriceError("");
    return true;
  }

  function handleList() {
    if (!selectedNft) {
      return;
    }

    if (isShouldApproveRae) {
      approveActionRae();
      return;
    }

    if (isShouldApproveNft) {
      approveActionNft();
      return;
    }

    if (!checkPrice(sellPrice)) return;

    writeContract(
      {
        nftAddr: selectedNft.token_address,
        tokenId: Number(selectedNft.token_id),
        price: multiply(sellPrice, String(10 ** RAE.decimals)),
        seller: selectedNft.owner,
      },
      {
        onSuccess: () => {
          setSellPrice("");
          queryClient.invalidateQueries({
            queryKey: [selectedNft?.market_name, "nfts"],
          });
          setGlobalMsg({
            type: "success",
            message: "List successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "List failed"),
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

    if (isListing) {
      return {
        text: "Listing...",
        disabled: true,
      };
    }

    return {
      text: "List onto Quick Market",
      disabled: false,
    };
  }, [
    isShouldApproveNft,
    isApprovingNft,
    approveBtnTextNft,
    isShouldApproveRae,
    isApprovingRae,
    approveBtnTextRae,
    isListing,
  ]);

  return (
    <>
      <div className="bg-[#281A31] p-5 mt-5">
        <div className="text-xl font-medium text-white">Listing Details</div>

        <div className="flex items-end justify-between mt-5 relative">
          <div className="flex items-center mt-[15px]">
            <NumericalInput
              disabled={isPlatformNFT}
              className="h-12 w-[236px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed"
              placeholder="0"
              value={sellPrice}
              onUserInput={(v) => handleInputPrice(v)}
            />
            {isRaePricePending ? (
              <Skeleton className="w-[60px] h-[20px] ml-5" />
            ) : (
              sellPriceValue && (
                <div className="text-base text-white opacity-60 inline-block ml-5">
                  ~ ${sellPriceValue}
                </div>
              )
            )}
          </div>

          <RaeToken />
        </div>
        <ErrorMessage
          className="absolute bottom-[15px]"
          error={sellPriceError}
        />
      </div>
      <div className="flex items-center justify-between mt-5 space-x-5">
        <ShouldConnectBtn
          disabled={btnProps.disabled}
          className="w-full"
          onClick={handleList}
        >
          {btnProps.text}
        </ShouldConnectBtn>
        {nftType === "pool" && (
          <div className="flex-1 items-center h-12 bg-[#382743] border-none rounded-none flex justify-center space-x-[5px]">
            <span className="text-white text-base font-medium">
              Pool:&nbsp;
              {truncateAddr(selectedNft?.owner || "")}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
