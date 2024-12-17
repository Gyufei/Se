import { useCallback, useMemo, useState } from "react";
import { useTokens } from "../api/use-tokens";
import useGetAmountInOut from "./helper/use-get-amount-in-out";
import { useRaePrice } from "../api/use-rae-price";
import { divide, multiply } from "safebase";

export function useEthSwap() {
  const slippage = 0.01;
  const { data: tokens } = useTokens();
  const { getAmountIn, getAmountOut } = useGetAmountInOut();

  const { data: raePriceData, isPending: isRaePricePending } = useRaePrice();
  const raePrice = raePriceData?.price;

  const [ethPrice, setEthPrice] = useState("0");

  const EthToken = useMemo(() => {
    return tokens?.find((token) => token.symbol === "ETH");
  }, [tokens]);

  const USDTToken = useMemo(() => {
    return tokens?.find((token) => token.symbol === "USDT");
  }, [tokens]);

  const ethOutTo = useCallback(
    async (ehtAmount: string) => {
      if (!EthToken?.address || !USDTToken?.address || isRaePricePending)
        return;
      const amount = multiply(ehtAmount, String(10 ** EthToken.decimals));

      const usdtAmountOut = await getAmountOut(
        amount,
        EthToken.address,
        USDTToken.address,
      );

      const usdtAmountFmt = divide(
        String(usdtAmountOut),
        String(10 ** USDTToken.decimals),
      );

      setEthPrice(divide(usdtAmountFmt, ehtAmount));

      const raeAmount = divide(usdtAmountFmt, raePrice);

      const raeAmountWithSlippage = multiply(raeAmount, String(1 - slippage));

      return raeAmountWithSlippage;
    },
    [raePrice, isRaePricePending, EthToken, USDTToken, getAmountOut],
  );

  const raeInTo = useCallback(
    async (raeAmount: string) => {
      if (!EthToken?.address || !USDTToken?.address || isRaePricePending)
        return;
      const raeAmountWithSlippage = multiply(raeAmount, String(1 + slippage));
      const usdtAmount = multiply(raeAmountWithSlippage, raePrice);
      const usdtTokenAmount = multiply(
        usdtAmount,
        String(10 ** USDTToken.decimals),
      );

      const amountIn = await getAmountIn(
        usdtTokenAmount,
        USDTToken.address,
        EthToken.address,
      );

      const amountFmt = divide(
        String(amountIn),
        String(10 ** EthToken.decimals),
      );

      setEthPrice(divide(usdtAmount, amountFmt));

      return amountFmt;
    },
    [raePrice, isRaePricePending, EthToken, USDTToken, getAmountIn],
  );

  return {
    ethPrice,
    ethOutTo,
    raeInTo,
  };
}
