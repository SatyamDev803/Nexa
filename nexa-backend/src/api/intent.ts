// src/api/intent.ts
import { Router, Request, Response } from "express";
import { buildIntent } from "../services/intentBuilder";
import { toCanonical } from "../utils/tokenMap";
import { toBaseUnits } from "../utils/amounts"; // ✅ new
import { getOneClickQuote } from "../services/oneClick";
import type { RankedPool } from "../types";

const router = Router();

router.post("/intent", async (req: Request, res: Response) => {
  const { user, amount, fromToken, fromChain, winner } = req.body as {
    user: string;
    amount: string;
    fromToken: string;
    fromChain: string;
    winner: RankedPool;
  };

  if (!user || !amount || !fromToken || !fromChain || !winner) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const intent = buildIntent({ user, amount, fromToken, fromChain, winner });

    // canonicalize both origin + destination
    const origin = toCanonical(fromToken);
    const dest = toCanonical(winner.token);

    // ✅ Convert human-readable amount → base units
    const baseAmount = toBaseUnits(amount, origin.decimals);

    const quote = await getOneClickQuote({
      originAsset: origin.id,
      destinationAsset: dest.id,
      amount: baseAmount,
      refundTo: user,
      recipient: user,
    });

    return res.json({ ...intent, quote });
  } catch (err: any) {
    console.error("Error in /intent:", err?.response?.data || err?.message || err);
    return res.status(500).json({
      error: "Failed to build intent",
      detail: err?.response?.data || err?.message || "unknown",
    });
  }
});

export default router;


