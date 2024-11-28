import ShouldConnectBtn from "@/app/_common/should-connect-btn";
import { INFT } from "@/lib/api/use-market-nfts";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { formatNumber } from "@/lib/utils/number";
import { multiply } from "safebase";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { checkIsExist } from "../cart-reducer";
import { useCartContext } from "../cart-context";
import { cn } from "@/lib/utils/common";
import { useMemo } from "react";
import { useNftStatus } from "@/lib/common/use-nft-statu";
import { useRouter } from "next/navigation";

export default function PriceAndOperation({
  isPending,
  nft,
}: {
  isPending: boolean;
  nft: INFT | undefined;
}) {
  const { isCanBuy, isCanList, isCanVault } = useNftStatus(nft);
  const { data: raePrice, isPending: isRaePricePending } = useRaePrice();

  const priceValue = useMemo(() => {
    if (!nft?.price || !raePrice?.price) return "0";

    return multiply(nft.price, raePrice?.price);
  }, [nft?.price, raePrice?.price]);

  return (
    <div className="bg-[#281A31] p-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <span className="text-[#B8B3B6]">Price</span>
        <Image
          src="/icons/logo-on-white.svg"
          width={20}
          height={20}
          alt="logo"
        />
      </div>
      <div className="flex mt-[10px] mb-5 items-center justify-between">
        {isPending || !nft ? (
          <Skeleton className="w-[130px] h-[40px]" />
        ) : (
          <div className="text-[40px] text-white">{nft.price} RAE</div>
        )}
        {isPending || isRaePricePending ? (
          <Skeleton className="w-[100px] h-[20px] my-2" />
        ) : (
          <div className="text-white opacity-60 text-xl">
            ~ ${formatNumber(priceValue)}
          </div>
        )}
      </div>

      {nft && (
        <div className="flex gap-2">
          {isCanBuy && <AddToBagBtn nft={nft} />}
          {isCanList && <ListOntoQuickBtn nft={nft} />}
          {isCanVault && <VaultOntoLuckyBtn nft={nft} />}
        </div>
      )}
    </div>
  );
}

function AddToBagBtn({ nft }: { nft: INFT }) {
  const { cartItems, addProduct, removeProduct } = useCartContext() || {};
  const isExist = checkIsExist(cartItems, nft.token_id);

  function handleAddToBag() {
    if (isExist) {
      removeProduct?.(nft);
    } else {
      addProduct?.(nft);
    }
  }

  return (
    <button
      className={cn(
        "bg-green w-full flex items-center justify-center h-12 text-[#12021D] mt-[10px] text-base font-bold",
        isExist ? "bg-[rgb(255,95,82)] text-white" : "bg-green",
      )}
      onClick={handleAddToBag}
    >
      {isExist ? "Remove from Bag -" : "Add to Bag +"}
    </button>
  );
}

function ListOntoQuickBtn({ nft }: { nft: INFT }) {
  const router = useRouter();

  function handleList() {
    router.push(
      `/my-nft-collection?marketName=${nft.market_name}&nftId=${nft.token_id}&action=list`,
    );
  }

  return (
    <ShouldConnectBtn className="flex-1" onClick={handleList}>
      List onto Quick Market
    </ShouldConnectBtn>
  );
}

function VaultOntoLuckyBtn({ nft }: { nft: INFT }) {
  const router = useRouter();

  function handleVault() {
    router.push(
      `/my-nft-collection?marketName=${nft.market_name}&nftId=${nft.token_id}&action=vault`,
    );
  }

  return (
    <ShouldConnectBtn className="flex-1" onClick={handleVault}>
      Vault onto Lucky Market
    </ShouldConnectBtn>
  );
}
