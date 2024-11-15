export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  imgSrc: string;
  [key: string]: any;
}
