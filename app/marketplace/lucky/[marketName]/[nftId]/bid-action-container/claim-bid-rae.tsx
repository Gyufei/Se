import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useRetrieveBid } from "@/lib/web3/call/use-retrieve-bid";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useMemo } from "react";
import { useAccount } from "wagmi";

const auctionId = 0;
const nftNum = 15;

export default function ClaimBidRae() {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);
  const { address } = useAccount();

  const { write, isPending: isClaiming } = useRetrieveBid();

  function handleClaim() {
    write(
      {
        auctionId,
        bidder: address!,
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
            message: e.message || "Claim failed",
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
      text: `Claim ${nftNum} NFT`,
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
