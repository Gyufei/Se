import { isProduction } from "./env";
import { ChainType } from "../types/chain";

export interface IChainConfig {
  name: string;
  network: string | number;
  logo: string;
  rpcs: Record<string, string>;
  zeroAddr: string;
  contracts: Record<string, string>;
  isEvm: boolean;
  chainType: ChainType;
}

export const ChainConfigs: Record<string, IChainConfig> = {
  [ChainType.Uni]: {
    name: "Unichain",
    chainType: ChainType.Uni,
    logo: "/icons/uni.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 1301 : 1301,
    rpcs: {
      default: isProduction
        ? process.env.NEXT_PUBLIC_DEFAULT_RPC_UNI ||
          "https://sepolia.unichain.org"
        : "https://sepolia.unichain.org",
    },
    contracts: isProduction
      ? {
          // prod
          RAE: "0x220B90BeB97d6F03bF377a1A74346b294B2E754B",
          RAEMarkets: "0x48d9D13d3FaA10b76D852E4E7c877Fd506A9F9Af",
          TesseraNFT: "0xe267f42eaC525D5217e47ea5a73C71A586d14c1e",
          QuickMarkets: "0xE0909861b7F0965f7f34559a416581aa791B9f32",
          LuckyMarkets: "0xf028A5a700dE7677C96be0c3244d88de3e4613af",
          TesseraRouter: "0xcBE664Be989638ee08fe15051570b9C8b205DA95",
          Vault: "0x8F5F3B3A2d7A5CA1e97317Da31b7d8DCF2e71CBB",
          DelegatePool: "0x66cA738e57008b3dA5d60e22a0ACdeb1094B1f65",
        }
      : {
          // test
          RAE: "0x220B90BeB97d6F03bF377a1A74346b294B2E754B",
          RAEMarkets: "0x48d9D13d3FaA10b76D852E4E7c877Fd506A9F9Af",
          TesseraNFT: "0xe267f42eaC525D5217e47ea5a73C71A586d14c1e",
          QuickMarkets: "0xE0909861b7F0965f7f34559a416581aa791B9f32",
          LuckyMarkets: "0xf028A5a700dE7677C96be0c3244d88de3e4613af",
          TesseraRouter: "0xcBE664Be989638ee08fe15051570b9C8b205DA95",
          Vault: "0x8F5F3B3A2d7A5CA1e97317Da31b7d8DCF2e71CBB",
          DelegatePool: "0x66cA738e57008b3dA5d60e22a0ACdeb1094B1f65",
        },
    isEvm: true,
  },
};
