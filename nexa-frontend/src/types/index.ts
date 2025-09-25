// src/types/index.ts
export type ChainName = string;
export type TokenSymbol = string;

export interface YieldPool {
  id: string;
  platform: string;
  chain: ChainName;
  token: TokenSymbol;
  tvlUsd: number;
  apyBasePct: number;
  apyRewardPct: number;
  apyNetPct: number;
  updatedAt: number;
}

export interface RankedPool extends YieldPool {
  net7d: number;
}

export interface RankResponse {
  amount: number;
  token?: TokenSymbol;
  chains?: ChainName[];
  top: RankedPool[];
  winnerOverall: RankedPool | null;
  winnersByChain: Array<{ chain: ChainName; pool: RankedPool }>;
}

export interface Intent {
  user: string;
  amount: string;
  fromToken: TokenSymbol;
  fromChain: ChainName;
  toPool: {
    chain: ChainName;
    platform: string;
    token: TokenSymbol;
  };
  steps: Array<{
    type: "swap" | "bridge" | "deposit";
    fromChain?: ChainName;
    toChain?: ChainName;
    tokenIn?: TokenSymbol;
    tokenOut?: TokenSymbol;
    protocol?: string;
  }>;
}

export interface OneClickQuote {
  depositType: "ORIGIN_CHAIN" | "INTENTS";
  recipientType: "ORIGIN_CHAIN" | "INTENTS";
  fromToken: string;
  toToken: string;
  inputAmount: string;
  outputAmount: string;
  depositAddress: string;
  refundTo: string;
}

export interface IntentWithQuote extends Intent {
    quote: OneClickQuote;
}