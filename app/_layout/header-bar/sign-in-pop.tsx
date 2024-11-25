"use client";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { SignInDialogOpen } from "@/lib/state/other";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import { useSignMessage } from "wagmi";
import { SignMessageData } from "wagmi/query";

export default function SignInPop() {
  const [signInDialogOpen, setSignDialogOpen] = useAtom(SignInDialogOpen);
  const { signMessage, isPending: isSigning } = useSignMessage();
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

    console.log(signInData);
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
    <div className="z-10 px-5 pt-10 pb-5 top-[calc(100%+12px)] right-0 bg-[#281A31] absolute w-[400px]">
      <div className="flex items-center justify-center space-x-1">
        <div className="text-white text-[30px] leading-[38px] opacity-80 bg-[#382743] h-16 w-16 flex items-center justify-center">
          T
        </div>
        <Image
          src="/icons/connect-line.svg"
          width={80}
          height={10}
          alt="connect"
        />
        <div className="text-white opacity-80 bg-[#382743] h-16 w-16 flex items-center justify-center">
          <Image src="/icons/wallet.svg" width={32} height={32} alt="wallet" />
        </div>
      </div>
      <div className="flex flex-col items-center text-white text-[30px] mt-[30px]">
        <div>Thanks for connecting </div>
        <div>your Wallet</div>
      </div>
      <div className="text-sm text-white opacity-60 mt-5 font-medium">
        To experience the full suite of features on Tessera please sign in by
        signing the prompt in your wallet
      </div>

      <button
        disabled={isSigning}
        onClick={handleSignIn}
        className="bg-green mt-[30px] w-full min-h-12 flex justify-center items-center flex-1 text-[#12021D] text-base font-bold disabled:opacity-60"
      >
        {isSigning ? "Signing in..." : "Sign in with Wallet"}
      </button>
      <button
        disabled={isSigning}
        onClick={handleClose}
        className="bg-[#382743] mt-5 w-full min-h-12 flex justify-center items-center flex-1 text-white opacity-60 text-base font-bold hover:opacity-80 disabled:opacity-30"
      >
        I&apos;ll do it later
      </button>
    </div>
  );
}
