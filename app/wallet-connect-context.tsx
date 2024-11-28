"use client";

import "@rainbow-me/rainbowkit/styles.css";
import React, { type ReactNode } from "react";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http, WagmiProvider, type Config } from "wagmi";
import { unichainSepolia } from "wagmi/chains";

const queryClient = new QueryClient();

const projectId = "ce2c2a3fb5d8e2a39ad4181746ddd873";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const wagmiConfig = getDefaultConfig({
  appName: "Tessera",
  projectId,
  chains: [unichainSepolia],
  ssr: true,
  transports: {
    [unichainSepolia.id]: http("https://sepolia.unichain.org"),
  },
});

function WalletConnectProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({})}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WalletConnectProvider;
