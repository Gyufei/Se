import { useAccount } from "wagmi";
import { INFT } from "../api/use-market-nfts";
import { useCheckIsPoolCreator } from "../api/use-pools";
import { checkIsSameAddress } from "../utils/web3";

export function useNftStatus(nft: INFT | undefined) {
  const { address } = useAccount();
  const { data: asPoolCreator } = useCheckIsPoolCreator(address);

  const addressArr = [...asPoolCreator.poolAddrs, address ? address : undefined];

  const isListed = nft?.status === "LISTED";
  const isVault = nft?.status === "VAULTED";
  const isPerson = nft?.status === "PERSON";

  const isBelongMyOrMyPool = address && addressArr.some((addr) => checkIsSameAddress(addr, nft?.owner));

  const isCanBuy = isListed && !addressArr.some((addr) => checkIsSameAddress(addr, nft?.owner));

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
