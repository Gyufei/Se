"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { divide, multiply } from "safebase";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { useSetAtom } from "jotai";

import { cn } from "@/lib/utils/common";
import { useRaePrice } from "@/lib/api/use-rae-price";
import { useTokens } from "@/lib/api/use-tokens";
import { RAE } from "@/lib/const/platform";
import { GlobalMessageAtom } from "@/lib/state/global-message";
import { IToken } from "@/lib/types/token";
import { useChainConfig } from "@/lib/web3/use-chain-config";
import { formatNumber } from "@/lib/utils/number";
import { useBuyRae } from "@/lib/web3/call/use-buy-rae";
import { useTokenBalance } from "@/lib/web3/helper/use-token-balance";
import { useApprove } from "@/lib/web3/use-approve";
import { useEthSwap } from "@/lib/web3/use-eth-swap";
import { useQueryClient } from "@tanstack/react-query";

import { NumericalInput } from "@/components/ui/numerical-input";
import { Skeleton } from "@/components/ui/skeleton";
import ShouldConnectBtn from "../_common/should-connect-btn";
import SlippageSelect from "./gas-select";
import SwapPriceDisplay from "./swap-price-display";
import ToOtherAddr from "./to-other-addr";
import TokenSelect from "./token-select";
import { checkIsSameAddress } from "@/lib/utils/web3";
import { covertErrorMsg } from "@/lib/utils/error";
import { debounce } from "lodash";
import ErrorMessage from "../_common/error-message";

export default function Page() {
  const { address: myAddress } = useAccount();
  const { data: tokens } = useTokens();
  const { chainConfig } = useChainConfig();
  const queryClient = useQueryClient();
  const setGlobalMsg = useSetAtom(GlobalMessageAtom);

  const { ethPrice, ethOutTo, raeInTo } = useEthSwap();
  const { data: raePriceData, isPending: isRaePricePending } = useRaePrice();
  const raePrice = raePriceData?.price;

  const { writeContract, isPending: isTxPending } = useBuyRae();

  const checkIsNative = useCallback(
    (token: IToken) => {
      return checkIsSameAddress(token.address, chainConfig.nativeTokenAddr);
    },
    [chainConfig],
  );

  const [payAmount, setPayAmount] = useState("");
  const [payToken, setPayToken] = useState<IToken>({
    symbol: "",
    url: "/icons/empty.svg",
    decimals: 18,
  } as IToken);

  const { data: balance, queryKey: getBalanceQueryKey } = useTokenBalance({
    address: payToken.address,
  });
  const payBalance = useMemo(() => {
    return divide(String(balance), String(10 ** payToken.decimals));
  }, [balance, payToken.decimals]);

  const { isShouldApprove, isApproving, approveAction, approveBtnText } =
    useApprove(payToken.address, payToken.symbol);

  const buyToken = RAE;
  const [buyAmount, setBuyAmount] = useState("");
  const [toOther, setToOther] = useState(false);
  const [toAddr, setToAddr] = useState("");

  const [isOutLoading, setIsOutLoading] = useState(false);
  const [isInLoading, setIsInLoading] = useState(false);

  const [gas, setGas] = useState(0.05);
  const [errorTip, setErrorTip] = useState("");

  const isNativePayToken = useMemo(
    () => checkIsNative(payToken),
    [payToken, checkIsNative],
  );

  const sellPrice = useMemo(() => {
    if (isNativePayToken) {
      return multiply(payAmount || "0", ethPrice);
    } else {
      return payAmount;
    }
  }, [ethPrice, payAmount, isNativePayToken]);

  const btnProp = useMemo(() => {
    if (isShouldApprove) {
      return {
        text: approveBtnText,
        disabled: isApproving,
      };
    }

    if (isTxPending) {
      return {
        text: "Buying...",
        disabled: true,
      };
    }

    return {
      text: "Buy",
      disabled: false,
    };
  }, [isShouldApprove, approveBtnText, isTxPending, isApproving]);

  const calcPayToAmount = useCallback(
    async (value: string, isNative: boolean) => {
      if (isNative) {
        const amountOut = await ethOutTo(value);
        setBuyAmount(amountOut || "0");
      } else {
        const amount = divide(value, raePrice);
        setBuyAmount(amount || "0");
      }

      setIsOutLoading(false);
    },
    [ethOutTo, raePrice],
  );

  const calcShouldPay = useCallback(
    async (value: string, isNative: boolean) => {
      if (isNative) {
        const amountOut = await raeInTo(value);
        setPayAmount(amountOut || "0");
      } else {
        const amount = multiply(value, raePrice);
        setPayAmount(amount || "0");
      }

      setIsInLoading(false);
    },
    [raePrice, raeInTo],
  );

  const debounceCalcPayToAmount = useMemo(
    () => debounce(calcPayToAmount, 1000),
    [calcPayToAmount],
  );

  const debounceCalcShouldPay = useMemo(
    () => debounce(calcShouldPay, 1000),
    [calcShouldPay],
  );

  async function handlePayTokenChange(t: IToken) {
    setPayToken(t);
    await calcPayToAmount(payAmount, checkIsNative(t));
  }

  async function handlePayInput(value: string) {
    setIsOutLoading(true);
    setPayAmount(value);

    checkError("1", value, toOther, toAddr);

    if (Number(value) === 0) {
      setBuyAmount(value);
      setIsOutLoading(false);
      return;
    }

    debounceCalcPayToAmount(value, isNativePayToken);
  }

  async function handleBuyInput(value: string) {
    setIsInLoading(true);
    setBuyAmount(value);

    checkError(value, "1", toOther, toAddr);

    if (Number(value) === 0) {
      setPayAmount(value);
      setIsInLoading(false);
      return;
    }

    debounceCalcShouldPay(value, isNativePayToken);
  }

  function handleOtherChange(value: boolean) {
    setToOther(value);
    checkError(buyAmount, payAmount, value, toAddr);
  }

  function handleOtherAddrChange(value: string) {
    setToAddr(value);
    checkError(buyAmount, payAmount, toOther, value);
  }

  function checkError(
    buyValue: string,
    payValue: string,
    toOtherArg: boolean,
    toAddrArg: string,
  ) {
    if (Number(buyValue) === 0) {
      setErrorTip("Input A Amount");
      return false;
    }

    if (Number(payValue) === 0) {
      setErrorTip("Input A Amount");
      return false;
    }

    if (payBalance < Number(payValue)) {
      setErrorTip("Insufficient Balance");
      return false;
    }

    if (toOtherArg && !toAddrArg) {
      setErrorTip("Input Recipient");
      return false;
    }

    if (toOtherArg && toAddrArg && !isAddress(toAddrArg, { strict: false })) {
      setErrorTip("Invalid Recipient");
      return false;
    }

    setErrorTip("");
    return true;
  }

  function handleConfirm() {
    if (isShouldApprove) {
      approveAction();
      return;
    }

    if (!checkError(buyAmount, payAmount, toOther, toAddr)) {
      return;
    }

    writeContract(
      {
        payAmount: multiply(payAmount, String(10 ** payToken.decimals)),
        buyAmount: multiply(buyAmount, String(10 ** buyToken.decimals)),
        buyer: toAddr || myAddress!,
        payTokenAddress: payToken.address,
        gas,
      },
      {
        onSuccess: () => {
          setPayAmount("0");
          setBuyAmount("0");
          queryClient.invalidateQueries({ queryKey: [getBalanceQueryKey] });
          setGlobalMsg({
            type: "success",
            message: "Swap successfully",
          });
        },
        onError: (e: any) => {
          setGlobalMsg({
            type: "error",
            message: covertErrorMsg(e, "Swap failed"),
          });
        },
      },
    );
  }

  useEffect(() => {
    if (tokens?.length) {
      handlePayTokenChange(tokens[0]);
    }
  }, [tokens]);

  return (
    <div className="flex flex-col items-center pt-[100px]">
      <div className="text-[40px] font-medium text-white">Buy RAE</div>

      <div className="mt-5 bg-[#1D0E27] flex flex-col items-stretch p-6 w-[440px]">
        <div className="bg-[#281A31] p-5 flex justify-between">
          <div className="flex-1">
            <div className="text-base text-white opacity-60">Sell</div>
            {isInLoading ? (
              <Skeleton className="mr-1 mt-[10px] w-[150px] h-[50px]" />
            ) : (
              <NumericalInput
                className="mr-2 mt-[10px] h-[50px] w-full text-left text-3xl text-white bg-transparent placeholder:opacity-50 placeholder:text-2xl"
                placeholder="0"
                value={payAmount}
                onUserInput={handlePayInput}
              />
            )}
            <div className="text-xl text-white opacity-60 mt-2">
              ${formatNumber(sellPrice)}
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <span className="text-base text-white opacity-60">
              Balance: {formatNumber(payBalance)}
            </span>
            <TokenSelect token={payToken} setToken={handlePayTokenChange} />
          </div>
        </div>

        <ArrowBetween className="-my-4 self-center" />

        <div className="bg-[#281A31] p-5 flex justify-between">
          <div className="flex-1">
            <div className="text-base text-white opacity-60">Buy</div>
            {isOutLoading ? (
              <Skeleton className="mr-1 mt-[10px] w-[150px] h-[50px]" />
            ) : (
              <NumericalInput
                className="mr-1 mt-[10px] w-full h-[50px] text-left text-3xl text-white bg-transparent placeholder:opacity-50 placeholder:text-2xl"
                placeholder="0"
                value={buyAmount}
                onUserInput={handleBuyInput}
              />
            )}
            <div className="text-xl text-white opacity-60 mt-2">-</div>
          </div>
          <div className="flex items-end">
            <div className="h-10 flex w-[112px] cursor-pointer items-center justify-center rounded-none bg-[#382743]">
              <Image
                width={18}
                height={18}
                src={buyToken.url}
                alt="selected token"
                className="mr-2 rounded-full"
              ></Image>
              <div className="pr-[4px] text-sm leading-5 text-white">
                {buyToken.symbol}
              </div>
            </div>
          </div>
        </div>

        <ToOtherAddr
          toOther={toOther}
          setToOther={handleOtherChange}
          addr={toAddr}
          setAddr={handleOtherAddrChange}
        />

        <div className="mt-5 relative">
          <ErrorMessage
            className="w-full text-center mb-1 absolute -top-[30px]"
            error={errorTip}
          />

          <ShouldConnectBtn
            disabled={btnProp.disabled}
            className="w-full"
            onClick={handleConfirm}
          >
            {btnProp.text}
          </ShouldConnectBtn>
        </div>

        <div className="flex justify-between items-center mt-[15px]">
          <SwapPriceDisplay
            isLoading={isRaePricePending}
            isNative={isNativePayToken}
            payPrice={ethPrice}
            buyPrice={raePrice}
            payToken={payToken}
            buyToken={buyToken}
          />

          <SlippageSelect gas={gas} setGas={setGas} />
        </div>
      </div>
    </div>
  );
}

function ArrowBetween({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-lg border-4 border-[#1D0E27] bg-[#281A31]",
        className,
      )}
    >
      <Image src="/icons/arrow-down.svg" width={24} height={24} alt="down" />
    </div>
  );
}
