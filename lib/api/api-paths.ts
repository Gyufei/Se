import { isProduction } from "@/lib/const/env";

export function WithApiHost(path: string) {
  const prodHost = `https://api.tadle.com`;
  // const devHost = `https://preview-api.tadle.com`;
  const devHost = `https://tessera.aggregation.top`;
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export function WithCDN(path: string) {
  const prodCDN = `https://cdn.tadle.com`;
  const devCDN = `https://preview-cdn.tadle.com`;
  const cdn = isProduction ? prodCDN : devCDN;
  return `${cdn}${path}`;
}

export const ApiPaths = {
  markets: "/markets",
  market: "/market",
  activity: "/market/activities",
  auction: "/market/auction",
  raePrice: "/rae/price",
  pools: "/pools",
  poolRecords: "/pool/records",
  poolUserInfo: "/pool/delegate",
};
