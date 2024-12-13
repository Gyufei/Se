import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { covertErrorMsg } from "@/lib/utils/error";
import { useRetrieveBid } from "@/lib/web3/call/use-retrieve-bid";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useMemo } from "react";

export default function ClaimBidRae({
  auctionId,
  claimNum,
  bidder,
}: {
  auctionId: string | undefined;
  claimNum: string;
  bidder: string | undefined;
}) {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { writeContract, isPending: isClaiming } = useRetrieveBid();

  function handleClaim() {
    writeContract(
      {
        auctionId: Number(auctionId),
        bidder: bidder!,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [auctionId] });
          setGlobalMsg({
            type: "success",
            message: "Claim successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "Claim failed"),
          });
        },
      },
    );
  }

  const btnProps = useMemo(() => {
    if (!auctionId || !bidder) {
      return {
        text: "Claim NFT",
        disabled: true,
      };
    }

    if (isClaiming) {
      return {
        text: "Claiming...",
        disabled: true,
      };
    }

    return {
      text: `Claim ${claimNum} NFT`,
      disabled: false,
    };
  }, [isClaiming, claimNum, auctionId, bidder]);

  return (
    <ShouldConnectBtn
      disabled={btnProps.disabled}
      className="mt-5 w-full"
      onClick={handleClaim}
    >
      {btnProps.text}
    </ShouldConnectBtn>
  );
}
