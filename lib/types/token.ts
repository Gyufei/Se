export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  [key: string]: any;
}
