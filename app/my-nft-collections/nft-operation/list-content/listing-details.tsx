"use client";
import { useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import RaeToken from "@/app/_common/rae-token";
import SelectPoolPop from "@/app/_common/select-pool-pop";
import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { NumericalInput } from "@/components/share/numerical-input";
import { RAE } from "@/lib/const/rae";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useApprove } from "@/lib/web3/use-approve";
import { useQueryClient } from "@tanstack/react-query";
import { multiply } from "safebase";
import { useListAsset } from "@/lib/web3/call/use-list-asset";

const isConnect = true;

const nftInfo = {
  name: "NFT #3333",
  nftAddr: "0x12345612131314141412414124214124",
  tokenId: 1,
};

export default function ListingDetail() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);
  const { address } = useAccount();

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
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  function handleList() {
    if (isShouldApproveRae) {
      approveActionRae();
      return;
    }

    if (isShouldApproveNft) {
      approveActionNft();
      return;
    }

    const seller = selectedPool || address;

    if (!seller) {
      return;
    }

    write(
      {
        nftAddr: nftInfo.nftAddr,
        tokenId: nftInfo.tokenId,
        price: multiply(sellPrice, String(10 ** RAE.decimals)),
        seller,
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
        {isConnect && (
          <SelectPoolPop
            selectedPool={selectedPool}
            setSelectedPool={setSelectedPool}
          />
        )}
      </div>
    </>
  );
}
