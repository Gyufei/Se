import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { unichainSepolia } from "@reown/appkit/networks";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const projectId = "ce2c2a3fb5d8e2a39ad4181746ddd873";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [unichainSepolia];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [unichainSepolia.id]: http("https://sepolia.unichain.org"),
  },
});

export const config = wagmiAdapter.wagmiConfig;
