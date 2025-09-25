export const config = {
  port: Number(process.env.PORT || 4000),

  // DefiLlama public Yields API
  defillamaUrl: process.env.DEFILLAMA_YIELDS_URL || "https://yields.llama.fi/pools",
  defillamaTimeoutMs: Number(process.env.DEFILLAMA_TIMEOUT_MS || 10000),
  minTvlUsd: Number(process.env.DEFILLAMA_MIN_TVL || 100000),
  includeRewards: (process.env.DEFILLAMA_INCLUDE_REWARDS || "true") === "true",
  topN: Number(process.env.AGGREGATOR_TOP_N || 20),

  // 1Click API
  oneClickBase: process.env.ONECLICK_API_BASE || "https://1click-api.intents.near.org",
  refundAddress: process.env.REFUND_ADDRESS || "",

  // NEAR (optional; not used for MVP submit path)
  near: {
    networkId: process.env.NEAR_NETWORK || "mainnet",
    nodeUrl: process.env.NEAR_RPC || "https://rpc.mainnet.near.org",
    verifierContract: process.env.VERIFIER_CONTRACT || "",
    accountId: process.env.NEAR_ACCOUNT_ID || "",
    privateKey: process.env.NEAR_PRIVATE_KEY || ""
  }
};
