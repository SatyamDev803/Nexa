import axios from "axios";
import { config } from "../config/config";
import type { YieldPool, RankedPool } from "../types";
import { isObject, toNumberSafe, toStringSafe } from "../utils/helpers";

const TTL_MS = 30_000; // 30s simple in-memory cache
let cache: { ts: number; data: YieldPool[] } | null = null;

function mapToYieldPool(p: Record<string, unknown>, fetchedAt: number): YieldPool {
  // According to DefiLlama's yield schema, APYs are in percent (e.g., 2.5 = 2.5%)
  const apyBasePct = toNumberSafe(p.apyBase, 0);
  const apyRewardPct = toNumberSafe(p.apyReward, 0);
  const apyNetPct = config.includeRewards ? apyBasePct + apyRewardPct : apyBasePct;

  return {
    id: `llama:${toStringSafe(p.chain)}:${toStringSafe(p.project)}:${toStringSafe(p.symbol)}`,
    platform: toStringSafe(p.project, "unknown"),
    chain: toStringSafe(p.chain, "unknown"),
    token: toStringSafe(p.symbol, "").toUpperCase(),
    tvlUsd: toNumberSafe(p.tvlUsd, 0),
    apyBasePct,
    apyRewardPct,
    apyNetPct,
    updatedAt: fetchedAt
  };
}

export async function fetchAllPools(): Promise<YieldPool[]> {
  const now = Date.now();
  if (cache && now - cache.ts < TTL_MS) return cache.data;

  const resp = await axios.get(config.defillamaUrl, { timeout: config.defillamaTimeoutMs });
  const body = resp.data;

  const rows: unknown[] = Array.isArray(body?.data) ? body.data : Array.isArray(body) ? body : [];
  const pools: YieldPool[] = rows
    .filter(isObject)
    .map((p) => mapToYieldPool(p, now));

  cache = { ts: now, data: pools };
  return pools;
}

function matchChains(pool: YieldPool, chains?: string[]): boolean {
  if (!chains || chains.length === 0) return true;
  const set = new Set(chains.map((c) => c.toLowerCase()));
  return set.has(pool.chain.toLowerCase());
}

function isSingleAsset(pool: YieldPool, singleAssetOnly: boolean): boolean {
  if (!singleAssetOnly) return true;
  return !pool.token.includes("-");
}

export function rankPools(opts: {
  pools: YieldPool[];
  amount: number;
  token?: string;
  chains?: string[];
  singleAssetOnly?: boolean;
  minTvlUsd?: number;
}): {
  top: RankedPool[];
  winnerOverall: RankedPool | null;
  winnersByChain: Array<{ chain: string; pool: RankedPool }>;
} {
  const {
    pools,
    amount,
    token,
    chains,
    singleAssetOnly = true,
    minTvlUsd = config.minTvlUsd
  } = opts;

  const filtered = pools.filter((p) =>
    p.tvlUsd >= minTvlUsd &&
    matchChains(p, chains) &&
    isSingleAsset(p, singleAssetOnly) &&
    (token ? p.token === token.toUpperCase() : true)
  );

  const withNet7d: RankedPool[] = filtered.map((p) => ({
    ...p,
    net7d: Number((amount * (p.apyNetPct / 100) * (7 / 365)).toFixed(2))
  }));

  const ranked = withNet7d.sort((a, b) => (b.apyNetPct - a.apyNetPct) || (b.tvlUsd - a.tvlUsd));

  const byChain = new Map<string, RankedPool>();
  for (const p of ranked) {
    if (!byChain.has(p.chain)) byChain.set(p.chain, p);
  }

  return {
    top: ranked.slice(0, config.topN),
    winnerOverall: ranked[0] ?? null,
    winnersByChain: Array.from(byChain.entries()).map(([chain, pool]) => ({ chain, pool }))
  };
}
