import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { capitalize } from "lodash";
import { INFT } from "@/lib/api/use-market-nfts";
import { cn } from "@/lib/utils/common";
import { useCartContext } from "../../cart-context";
import { checkIsExist } from "../../cart-reducer";
import { useNftStatus } from "@/lib/common/use-nft-status";
import { useNftAuction } from "@/lib/api/use-nft-auction";
import NftFallbackImage from "@/app/_common/nft-fallback-image";
import { useDeviceSize } from "@/lib/common/use-device-size";

export default function NFTCard({ nft }: { nft: INFT }) {
  const router = useRouter();
  const { isListed, isVault, isPerson, isCanBuy } = useNftStatus(nft);
  const { isMobileSize } = useDeviceSize();

  const [isHover, setIsHover] = useState(false);
  const { data: auctionInfo } = useNftAuction(nft);

  const nftPrice = useMemo(() => {
    if (isVault) return auctionInfo?.bidding_cap;
    return nft.price;
  }, [auctionInfo, nft.price, isVault]);

  const showBtn = (isCanBuy || isVault || isPerson) && (isHover || isMobileSize);

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
      className="relative h-[252px] w-[168px] cursor-pointer overflow-hidden border-2 border-transparent bg-[#1D0E27] hover:border-green md:h-[260px] md:w-[200px]"
      onClick={() => {
        handleGoDetail(nft);
      }}
    >
      <NftFallbackImage
        src={nft.token_uri}
        width={isMobileSize ? 164 : 200}
        height={isMobileSize ? 252 : 260}
        alt="nft"
        className={cn("transition-all duration-500 ease-in-out", isHover && "scale-[1.15]")}
      />
      {(isListed || isVault) && (
        <div
          className={cn(
            "absolute right-[10px] top-[10px] flex h-5 items-center px-2 text-xs text-white",
            isListed && "bg-[#71458E]",
            isVault && "bg-[#DB734A]",
          )}
        >
          {capitalize(nft.status)}
        </div>
      )}
      <div
        className={cn(
          "absolute bottom-0 h-[116px] w-full bg-[#1D0E27] p-3 transition-all duration-500 ease-in-out md:h-[88px] md:px-[15px] md:pb-[15px] md:pt-5",
          isHover && "md:h-[130px]",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-white">
            <span className="text-sm">
              {nft.name} #{nft.token_id}
            </span>
            <span className="mt-[10px] text-base font-medium">{nftPrice} RAE</span>
          </div>
        </div>
        <>
          {showBtn && (
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

const BtnClx = "bg-green w-full flex items-center justify-center h-8 text-[#12021D] mt-[10px] text-xs font-bold";

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
      className={cn(BtnClx, isExist ? "bg-[rgb(255,95,82)] text-white" : "bg-green")}
      onClick={(e) => handleAddToBag(e)}
    >
      {isExist ? "Remove from Quick Bag" : "Add to Quick Bag"}
    </button>
  );
}

function NoListBtn() {
  return (
    <div className="mt-[10px] flex h-8 w-full items-center justify-center bg-[rgba(255,255,255,0.3)] text-xs font-bold text-black">
      Not Listed
    </div>
  );
}

function ViewVaultBtn({ nft }: { nft: INFT }) {
  const router = useRouter();

  function handleViewVault(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    router.push(`/marketplace/collection/${nft.market_name}/vault/${nft.token_id}`);
  }

  return (
    <button className={BtnClx} onClick={(e) => handleViewVault(e)}>
      View Vault
    </button>
  );
}
