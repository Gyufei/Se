import { use } from "react";
import { CartContextProvider } from "./cart-context";
import { QuickPageProvider } from "./page-context";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ marketName: string }>;
}) {
  const pageParams = use(params);
  const marketName = pageParams.marketName;

  return (
    <QuickPageProvider marketName={marketName}>
      <CartContextProvider marketName={marketName}>
        {children}
      </CartContextProvider>
    </QuickPageProvider>
  );
}
