import NFTInfo from "../../_common/nft-info";
import VaultListTabs from "./vault-list-tabs";

export default function NftOperation() {
  return (
    <div className="w-[580px] px-6 py-[46px] bg-[#1d0e27]">
      <NFTInfo />
      <VaultListTabs />
    </div>
  );
}
