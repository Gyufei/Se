import { useAccount } from "wagmi";
import { INFT } from "../api/use-market-nfts";
import { useCheckIsPoolCreator } from "../api/use-pools";

export function useNftStatus(nft: INFT | undefined) {
  const { address } = useAccount();
  const { data: asPoolCreator } = useCheckIsPoolCreator(address);

  const addressArr = [...asPoolCreator.poolAddrs, address];

  const isListed = nft?.status === "LISTED";
  const isVault = nft?.status === "VAULTED";
  const isPerson = nft?.status === "PERSON";

  const isBelongMyOrMyPool = address && addressArr.includes(nft?.owner);
  const isCanBuy = address && !addressArr.includes(nft?.owner) && isListed;
  const isCanList = isPerson && isBelongMyOrMyPool;
  const isCanVault = isPerson && isBelongMyOrMyPool;

  return {
    isListed,
    isVault,
    isPerson,
    isCanBuy,
    isCanList,
    isCanVault,
  };
}
