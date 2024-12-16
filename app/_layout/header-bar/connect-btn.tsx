"use client";
import { cn } from "@/lib/utils/common";
import { truncateAddr } from "@/lib/utils/web3";
import SignInPop from "./sign-in-pop";
import { useAtomValue, useSetAtom } from "jotai";
import { SignInDialogOpen } from "@/lib/state/dialog";
import { useAccount, useAccountEffect } from "wagmi";
import { AccessTokenAtom } from "@/lib/state/user";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { AddressImg } from "@/app/_common/address-img";

const ConnectBtnText = "h-10 px-5 flex items-center text-[14px] font-bold";

export default function ConnectBtn() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const uuid = useAtomValue(AccessTokenAtom);

  useAccountEffect({
    onConnect(_data) {
      if (!uuid) {
        setSignDialogOpen(true);
      }
    },
    onDisconnect() {},
  });

  const setSignDialogOpen = useSetAtom(SignInDialogOpen);

  function handleConnect() {
    if (!openConnectModal) return;

    openConnectModal();
  }

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className={cn(ConnectBtnText, "bg-green text-[#12021d]")}
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button className={cn(ConnectBtnText, "bg-[#2A1C34] space-x-[10px]")}>
        <AddressImg
          className="rounded-full"
          address={address}
          width={20}
          height={20}
        />
        <div className="text-white opacity-60 hover:opacity-100">
          {truncateAddr(address)}
        </div>
      </button>
      <SignInPop />
    </div>
  );
}
