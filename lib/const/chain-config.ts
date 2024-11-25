import { isProduction } from "./env";
import { ChainType } from "../types/chain";

export interface IChainConfig {
  name: string;
  network: string | number;
  logo: string;
  rpcs: Record<string, string>;
  zeroAddr: string;
  nativeTokenAddr: string;
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
    nativeTokenAddr: isProduction
      ? "0x4200000000000000000000000000000000000006"
      : "0x4200000000000000000000000000000000000006",
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
          UniswapV2Router: "0x920b806E40A00E02E7D2b94fFc89860fDaEd3640",
        }
      : {
          // test
          UniswapV2Router: "0x920b806E40A00E02E7D2b94fFc89860fDaEd3640",
          RAE: "0x8218d10fAA9912FB8dA68c0C4D0e4a060D40f9ea",
          RAEMarkets: "0xdbf3EA288CB85a8857E191c56c34789b2E342e8D",
          TesseraNFT: "0x17De60675083e4C7440A0EF454462664d075E7E3",
          QuickMarkets: "0xeF664828Ef996133f4c5c81D6d56f02E1152AFB2",
          LuckyMarkets: "0xD39bA637AFb278e65dF28891098d0350C814Ffe1",
          TesseraRouter: "0x9E8d2F817fb773C3c9e9EAf70344D9c4288c9385",
          Vault: "0x046ecBB61330b3402a8A6f6D7e52F13f0AA451eB",
          DelegatePool: "0xfAE6D19dd9812a3270C91064EB1691789F6494e2",
        },
    isEvm: true,
  },
};
