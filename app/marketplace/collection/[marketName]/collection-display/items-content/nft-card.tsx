import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { capitalize } from "lodash";
import { INFT } from "@/lib/api/use-market-nfts";
import { cn } from "@/lib/utils/common";
import { useCartContext } from "../../cart-context";
import { checkIsExist } from "../../cart-reducer";
import { useNftStatus } from "@/lib/common/use-nft-status";
import { useNftAuction } from "@/lib/api/use-nft-auction";
import NftFallbackImage  from "@/app/_common/nft-fallback-image";

export default function NFTCard({ nft }: { nft: INFT }) {
  const router = useRouter();
  const { isListed, isVault, isPerson, isCanBuy } = useNftStatus(nft);

  const [isHover, setIsHover] = useState(false);
  const { data: auctionInfo } = useNftAuction(nft);

  const nftPrice = useMemo(() => {
    if (isVault) return auctionInfo?.bidding_cap;
    return nft.price;
  }, [auctionInfo, nft.price, isVault]);

  function handleHover(hover: boolean) {
    if (!isCanBuy && !isVault && !isPerson) return;
    setIsHover(hover);
  }

  function handleGoDetail(nft: INFT) {
    router.push(`/marketplace/collection/${nft.market_name}/${nft.token_id}`);
  }

  return (
    <div
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="cursor-pointer w-[200px] h-[260px] overflow-hidden bg-[#1D0E27] border-2 border-transparent hover:border-green relative"
      onClick={() => {
        handleGoDetail(nft);
      }}
    >
      <NftFallbackImage
        src={nft.token_uri}
        width={200}
        height={200}
        alt="nft"
        className={cn(
          "transition-all duration-500 ease-in-out",
          isHover && "scale-[1.15]",
        )}
      />
      {(isListed || isVault) && (
        <div
          className={cn(
            "absolute top-[10px] right-[10px] h-5 flex px-2 items-center text-white text-xs",
            isListed && "bg-[#71458E]",
            isVault && "bg-[#DB734A]",
          )}
        >
          {capitalize(nft.status)}
        </div>
      )}
      <div
        className={cn(
          "h-[88px] pt-5 px-[15px] bg-[#1D0E27] pb-[15px] absolute w-full bottom-0 transition-all duration-500 ease-in-out",
          isHover && "h-[130px]",
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-white ">
            <span className="text-sm">
              {nft.name} #{nft.token_id}
            </span>
            <span className="text-base font-medium mt-[10px]">
              {nftPrice} RAE
            </span>
          </div>
        </div>
        <>
          {isHover && (
            <>
              {isPerson && <NoListBtn />}
              {isCanBuy && <AddToBagBtn nft={nft} />}
              {isVault && <ViewVaultBtn nft={nft} />}
            </>
          )}
        </>
      </div>
    </div>
  );
}

const BtnClx =
  "bg-green w-full flex items-center justify-center h-8 text-[#12021D] mt-[10px] text-xs font-bold";

function AddToBagBtn({ nft }: { nft: INFT }) {
  const { cartItems, addProduct, removeProduct } = useCartContext() || {};
  const isExist = checkIsExist(cartItems, nft.token_id);

  function handleAddToBag(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    if (isExist) {
      removeProduct?.(nft);
    } else {
      addProduct?.(nft);
    }
  }

  return (
    <button
      className={cn(
        BtnClx,
        isExist ? "bg-[rgb(255,95,82)] text-white" : "bg-green",
      )}
      onClick={(e) => handleAddToBag(e)}
    >
      {isExist ? "Remove from Quick Bag" : "Add to Quick Bag"}
    </button>
  );
}

function NoListBtn() {
  return (
    <div className="w-full flex items-center justify-center h-8 bg-[rgba(255,255,255,0.3)] text-black mt-[10px] text-xs font-bold">
      Not Listed
    </div>
  );
}

function ViewVaultBtn({ nft }: { nft: INFT }) {
  const router = useRouter();

  function handleViewVault(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    router.push(
      `/marketplace/collection/${nft.market_name}/vault/${nft.token_id}`,
    );
  }

  return (
    <button className={BtnClx} onClick={(e) => handleViewVault(e)}>
      View Vault
    </button>
  );
}
