import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { covertErrorMsg } from "@/lib/utils/error";
import { useClaimAsset } from "@/lib/web3/call/use-claim-asset";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useMemo } from "react";

export default function ClaimBidNFT({
  auctionId,
  winner,
}: {
  auctionId: string;
  winner: string;
}) {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { writeContract, isPending: isClaiming } = useClaimAsset();

  function handleClaim() {
    writeContract(
      {
        auctionId: Number(auctionId),
        winner,
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
    if (isClaiming) {
      return {
        text: "Claiming...",
        disabled: true,
      };
    }

    return {
      text: `Claim Your NFT`,
      disabled: false,
    };
  }, [isClaiming]);

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
