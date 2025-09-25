export type ChainName = string;      // "Arbitrum" | "Base" | "Solana" | "NEAR" | ...
export type TokenSymbol = string;    // "NEAR" | "USDC" | "ETH" | "SOL" | ...

export interface YieldPool {
  id: string;                        // source:chain:project:symbol
  platform: string;                  // e.g., "aave-v3"
  chain: ChainName;                  // e.g., "Arbitrum"
  token: TokenSymbol;                // e.g., "USDC" (LPs may appear like "USDC-ETH")
  tvlUsd: number;
  apyBasePct: number;                // percent (2.5 = 2.5%)
  apyRewardPct: number;              // percent
  apyNetPct: number;                 // apyBasePct + apyRewardPct (if enabled)
  updatedAt: number;                 // ms timestamp when we fetched
}

export interface RankedPool extends YieldPool {
  net7d: number;                     // amount * (apyNetPct/100) * (7/365)
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
  user: string;                      // NEAR accountId (e.g., "you.testnet")
  amount: string;                    // string to preserve precision
  fromToken: TokenSymbol;            // e.g., "NEAR"
  fromChain: ChainName;              // e.g., "near"
  toPool: {
    chain: ChainName;                // destination chain of the yield pool
    platform: string;                // protocol/platform name
    token: TokenSymbol;              // target token (e.g., "USDC")
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
  fromToken: string;                 // canonical id (e.g., "nep141:wrap.near")
  toToken: string;                   // canonical id (e.g., "nep141:eth.bridge.near")
  inputAmount: string;
  outputAmount: string;
  depositAddress: string;            // where user sends tokens
  refundTo: string;                  // refund NEAR account
}
