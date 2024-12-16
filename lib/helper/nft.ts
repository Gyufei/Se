import { INFT } from "../api/use-market-nfts";
import { PlatformNFTAddrs } from "../const/platform";

export function checkIsPlatformNFT(nft: INFT | null) {
  if (!nft) return false;

  return PlatformNFTAddrs.includes(nft.token_address);
}
