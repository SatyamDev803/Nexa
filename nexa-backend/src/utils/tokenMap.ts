export const TOKEN_MAP: Record<
  string,
  { id: string; decimals: number }
> = {
  NEAR: {
    id: "nep141:wrap.near",
    decimals: 24,
  },
  USDC: {
    id: "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
    decimals: 6,
  },
  USDT: {
    id: "nep141:usdt.tether-token.near",
    decimals: 6,
  },
  ETH: {
    id: "nep141:eth.bridge.near",
    decimals: 18,
  },
  WBTC: {
    id: "nep141:2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    decimals: 8,
  },
};

export function toCanonical(symbol: string): { id: string; decimals: number } {
  const key = symbol.toUpperCase();
  const entry = TOKEN_MAP[key];
  if (!entry) throw new Error(`Token mapping not found for ${symbol}`);
  return entry;
}


