"use client";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { SignInDialogOpen } from "@/lib/state/dialog";
import { AccessTokenAtom } from "@/lib/state/user";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useSignMessage } from "wagmi";
import { SignMessageData } from "wagmi/query";

export default function SignInPop() {
  const [signInDialogOpen, setSignDialogOpen] = useAtom(SignInDialogOpen);
  const { signMessage, isPending: isSigning } = useSignMessage();
  const setUuid = useSetAtom(AccessTokenAtom);
  const setGlobalMsgTip = useSetAtom(GlobalMessageAtom);

  async function handleSignIn() {
    signMessage(
      {
        message: "Sign in to Tessera",
      },
      {
        onSuccess: (data) => {
          checkSignIn(data);
        },
        onError: (error) => {
          setGlobalMsgTip({
            type: "error",
            message: error.message || "Sign in failed",
          });
        },
      },
    );
  }

  function checkSignIn(signInData: SignMessageData | undefined) {
    if (isSigning) {
      return;
    }

    console.log("signInData", signInData);
    if (signInData) {
      setUuid(`test_${signInData}`);
    }

    setSignDialogOpen(false);
  }

  function handleClose() {
    if (isSigning) {
      return;
    }
    setSignDialogOpen(false);
  }

  if (!signInDialogOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 w-screen bg-[#281A31] px-5 pb-5 pt-10 md:absolute md:bottom-auto md:left-auto md:top-[calc(100%+12px)] md:w-[400px]">
      <div className="flex items-center justify-center space-x-1">
        <div className="flex h-16 w-16 items-center justify-center bg-[#382743] text-[30px] leading-[38px] text-white opacity-80">
          T
        </div>
        <Image src="/icons/connect-line.svg" width={80} height={10} alt="connect" />
        <div className="flex h-16 w-16 items-center justify-center bg-[#382743] text-white opacity-80">
          <Image src="/icons/wallet.svg" width={32} height={32} alt="wallet" />
        </div>
      </div>
      <div className="mt-[30px] flex flex-col items-center text-[30px] text-white">
        <div>Thanks for connecting </div>
        <div>your Wallet</div>
      </div>
      <div className="mt-5 text-sm font-medium text-white opacity-60">
        To experience the full suite of features on Tessera please sign in by signing the prompt in your wallet
      </div>

      <button
        disabled={isSigning}
        onClick={handleSignIn}
        className="mt-[30px] flex min-h-12 w-full flex-1 items-center justify-center bg-green text-base font-bold text-[#12021D] disabled:opacity-60"
      >
        {isSigning ? "Signing in..." : "Sign in with Wallet"}
      </button>
      <button
        disabled={isSigning}
        onClick={handleClose}
        className="mt-5 flex min-h-12 w-full flex-1 items-center justify-center bg-[#382743] text-base font-bold text-white opacity-60 hover:opacity-80 disabled:opacity-30"
      >
        I&apos;ll do it later
      </button>
    </div>
  );
}
