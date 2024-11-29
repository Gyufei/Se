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
        }
      : {
          // test
          UniswapV2Router: "0x920b806E40A00E02E7D2b94fFc89860fDaEd3640",
          RAE: "0x8dfd683a64F088a2a9636346Fe8E92F86A1995c2",
          RAEMarkets: "0x71fC59A3CAF16bA0A908205bC7EE2724DBaAd5b4",
          QuickMarkets: "0xbF4Da07Ac0CA712e568cb25c9Baa9BEBE82E5440",
          LuckyMarkets: "0x9E05349d3CE3d74d8A10532165B8D7151B537849",
          TesseraRouter: "0x95C6B3FEa750D226b8bC4C530f871902A7257141",
          DelegatePool: "0x08222c2512c3670E8460Fea0394E498d2f646d80",
        },
    isEvm: true,
  },
};
