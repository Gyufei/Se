import type { Metadata } from "next";

import "./globals.css";
import { SpaceGroteskFont } from "./fonts";
import { cn } from "@/lib/utils/common";
import MainLayout from "./_layout/main-layout";
import WalletConnectProvider from "@/components/context/wallet-connect-context";
import { JotaiProviders } from "@/components/context/jotai-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Tessera",
    default: "Tessera",
  },
  description: "Tessera",
  // metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  // openGraph: {
  //   title: "Tessera",
  //   description: "Tessera",
  //   url: `https://${process.env.VERCEL_DOMAIN}`,
  //   siteName: "Tessera",
  //   images: "/img/xxx.png",
  //   locale: "en_US",
  //   type: "website",
  // },
  // icons: {
  //   icon: [
  //     { url: "/images/favicon-32x32.png" },
  //     { url: "/images/favs/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //   ],
  //   shortcut: "/images/shortcut-icon.png",
  //   apple: [
  //     { url: "/images/favs/apple-touch-icon.png" },
  //     {
  //       url: "/images/favs/apple-touch-icon.png",
  //       sizes: "180x180",
  //       type: "image/png",
  //     },
  //   ],
  //   other: {
  //     rel: "apple-touch-icon-precomposed",
  //     url: "/images/images/apple-touch-icon-precomposed.png",
  //   },
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Tessera",
  //   description: "Tessera",
  //   creator: "@tadle_com",
  //   images: ["/images/xxx.png"],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(SpaceGroteskFont.variable)}>
        <WalletConnectProvider>
          <JotaiProviders>
            <MainLayout>{children}</MainLayout>
          </JotaiProviders>
        </WalletConnectProvider>
      </body>
    </html>
  );
}
