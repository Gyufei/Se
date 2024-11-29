import { PersonalAndPoolBtns } from "./personal-and-pool-btns";
import NftList from "./nft-list";
import { NftOwnerType, useMyNFTCollectionsPageContext } from "../page-context";

export default function NftListDisplay() {
  const { nftType, setNftType, myNfts, poolNfts, setSelectedNft, isPending } =
    useMyNFTCollectionsPageContext();

  function handleTypeChange(type: NftOwnerType) {
    if (type === nftType) return;

    setNftType(type);
    setSelectedNft(null);
  }

  return (
    <div className="mt-[45px] mb-[60px] flex flex-1 justify-center">
      <div className="w-[650px]">
        <div className="text-white text-4xl font-medium">
          My NFT Collections
        </div>
        <PersonalAndPoolBtns
          isPending={isPending}
          type={nftType}
          setType={handleTypeChange}
          typeNumbers={{
            personal: myNfts.length,
            pool: poolNfts.length,
          }}
        />
        <NftList type={nftType} />
      </div>
    </div>
  );
}
