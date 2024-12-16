import { use } from "react";
import { CartContextProvider } from "./cart-context";
import { CollectionPageProvider } from "./page-context";

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
    <CollectionPageProvider marketName={marketName}>
      <CartContextProvider marketName={marketName}>
        {children}
      </CartContextProvider>
    </CollectionPageProvider>
  );
}
