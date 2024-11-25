export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  url: string;
  [key: string]: any;
}
