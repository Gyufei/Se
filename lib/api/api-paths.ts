import { isProduction } from "@/lib/const/env";

export function WithApiHost(path: string) {
  const prodHost = `https://api.tadle.com`;
  // const devHost = `https://preview-api.tadle.com`;
  const devHost = `https://private-anon-9a060573f5-tesseradev.apiary-mock.com`;
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
  activity: "/activities",
  auction: "/auction",
};
