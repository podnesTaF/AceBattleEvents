import { addresses } from "../constants";

export const chainAddress = (chainIdInHex: string | null) => {
  if (!chainIdInHex) return null;
  const chainId = chainIdInHex ? parseInt(chainIdInHex, 16) : 0;
  // @ts-ignore
  return chainId in addresses ? addresses[chainId][0] : null;
};
