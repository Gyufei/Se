"use client";
import Image from "next/image";

const isSignIn = false;

export default function SignInPop() {
  if (isSignIn) return null;

  function handleClick() {}

  return (
    <div className="px-5 pt-10 pb-5 top-[calc(100%+12px)] right-0 bg-[#281A31] absolute w-[400px]">
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
        onClick={handleClick}
        className="bg-green mt-[30px] w-full min-h-12 flex justify-center items-center flex-1 text-[#12021D] text-base font-bold"
      >
        Sign in with Wallet
      </button>
      <button
        onClick={handleClick}
        className="bg-[#382743] mt-5 w-full min-h-12 flex justify-center items-center flex-1 text-white opacity-60 text-base font-bold"
      >
        I&apos;ll do it later
      </button>
    </div>
  );
}
