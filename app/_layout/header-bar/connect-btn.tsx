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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { DisconnectBtn } from "./disconnect-btn";

const ConnectBtnText = "h-10 px-5 flex items-center text-[14px] font-bold";

export default function ConnectBtn() {
  const uuid = useAtomValue(AccessTokenAtom);
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const [popOpen, setPopOpen] = useState(false);

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
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger
          className={cn(ConnectBtnText, "bg-[#2A1C34] space-x-[10px]")}
        >
          <AddressImg
            className="rounded-full"
            address={address}
            width={20}
            height={20}
          />
          <div className="text-white opacity-60 hover:opacity-100">
            {truncateAddr(address, [7, 4])}
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="flex w-[174px] flex-col items-stretch rounded-none border-0 bg-[#382743] p-[5px]"
        >
          <DisconnectBtn setPopOpen={setPopOpen} />
        </PopoverContent>
      </Popover>
      <SignInPop />
    </div>
  );
}
