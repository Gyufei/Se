import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { useRetrieveNft } from "@/lib/web3/call/use-retrieve-nft";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useMemo } from "react";

export default function RetrieveBidNFT({ auctionId }: { auctionId: string }) {
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { writeContract, isPending: isClaiming } = useRetrieveNft();

  function handleClaim() {
    writeContract(
      {
        auctionId: Number(auctionId),
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
