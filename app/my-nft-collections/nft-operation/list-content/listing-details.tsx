"use client";
import { useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import RaeToken from "@/app/_common/rae-token";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/ui/numerical-input";
import { RAE } from "@/lib/const/rae";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useApprove } from "@/lib/web3/use-approve";
import { useQueryClient } from "@tanstack/react-query";
import { multiply } from "safebase";
import { useListAsset } from "@/lib/web3/call/use-list-asset";
import { truncateAddr } from "@/lib/utils/web3";
import { useMyNFTCollectionsPageContext } from "../../page-context";

const nftInfo = {
  name: "NFT #3333",
  nftAddr: "0x12345612131314141412414124214124",
  tokenId: 1,
};

export default function ListingDetail() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);
  const { nftType, selectedNft } = useMyNFTCollectionsPageContext();

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

  const { write, isPending: isCreating } = useListAsset();

  const [sellPrice, setSellPrice] = useState("");

  function handleList() {
    if (isShouldApproveRae) {
      approveActionRae();
      return;
    }

    if (isShouldApproveNft) {
      approveActionNft();
      return;
    }

    if (!selectedNft) {
      return;
    }

    write(
      {
        nftAddr: selectedNft.token_address,
        tokenId: Number(selectedNft.token_id),
        price: multiply(sellPrice, String(10 ** RAE.decimals)),
        seller: selectedNft.owner,
      },
      {
        onSuccess: () => {
          setSellPrice("");
          queryClient.invalidateQueries({ queryKey: [nftInfo.nftAddr] });
          setGlobalMsg({
            type: "success",
            message: "List successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: e.message || "List failed",
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

    if (!sellPrice) {
      return {
        text: "Enter a price",
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
    isCreating,
    sellPrice,
  ]);

  return (
    <>
      <div className="bg-[#281A31] p-5 mt-5">
        <div className="text-xl font-medium text-white">Listing Details</div>

        <div className="flex items-end justify-between mt-5">
          <div className="flex items-center mt-[15px]">
            <NumericalInput
              className="h-12 w-[236px] rounded-none leading-[48px] px-4 bg-[#1D0E27] text-white text-left focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5]"
              placeholder="0"
              value={sellPrice}
              onUserInput={(v) => setSellPrice(v)}
            />
            <div className="text-base text-white opacity-60 inline-block ml-5">
              ~ $3000
            </div>
          </div>

          <RaeToken />
        </div>
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
