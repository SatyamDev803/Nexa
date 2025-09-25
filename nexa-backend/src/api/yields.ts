import { Router, Request, Response } from "express";
import type { RankResponse } from "../types";
import { fetchAllPools, rankPools } from "../services/yieldAggregator";
import { parseChainsParam } from "../utils/helpers";

const router = Router();

router.get(
  "/rank",
  async (req: Request, res: Response<RankResponse | { error: string }>) => {
    const amount = Number(req.query.amount ?? 0);
    if (!amount || amount <= 0) return res.status(400).json({ error: "amount must be > 0" });

    const token = req.query.token ? String(req.query.token).toUpperCase() : undefined;
    const chains = parseChainsParam(req.query.chains as string | undefined);
    const singleAssetOnly = String(req.query.singleAssetOnly || "true") === "true";

    try {
      const pools = await fetchAllPools();
      const r = rankPools({ pools, amount, token, chains, singleAssetOnly });
      return res.json({
        amount,
        token,
        chains,
        top: r.top,
        winnerOverall: r.winnerOverall,
        winnersByChain: r.winnersByChain
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return res.status(500).json({ error: "Failed to rank pools" });
    }
  }
);

export default router;
