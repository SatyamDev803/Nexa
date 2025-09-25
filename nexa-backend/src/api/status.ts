// src/api/status.ts
import { Router, Request, Response } from "express";
import { getStatus } from "../services/oneClick";

const router = Router();

router.get("/status", async (req: Request, res: Response) => {
  const depositAddress = String(req.query.depositAddress || "");
  const depositMemo = req.query.depositMemo ? String(req.query.depositMemo) : undefined;

  if (!depositAddress) return res.status(400).json({ error: "depositAddress required" });

  try {
    const st = await getStatus(depositAddress, depositMemo);
    return res.json(st);
  } catch (err: any) {
    console.error("Error in /status:", err?.message || err);
    return res.status(500).json({ error: "Failed to fetch status" });
  }
});

export default router;
