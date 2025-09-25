// src/api/submit.ts
import { Router, Request, Response } from "express";
import { submitDepositTx } from "../services/oneClick";

const router = Router();

router.post("/submit", async (req: Request, res: Response) => {
  const { intent, txHash, depositAddress, depositMemo } = req.body;

  // log it
  console.log("Intent submit:", JSON.stringify({ intent, txHash, depositAddress }, null, 2));

  // optionally call 1Click deposit/submit to speed solver
  if (txHash && depositAddress) {
    try {
      const r = await submitDepositTx({ txHash, depositAddress, depositMemo });
      return res.json({ ok: true, submitResult: r });
    } catch (err: any) {
      console.error("Error calling 1Click /v0/deposit/submit", err?.message || err);
      // still return ok, but include error info
      return res.status(200).json({ ok: true, warning: "Failed to call 1Click deposit/submit", detail: err?.message });
    }
  }

  return res.json({ ok: true });
});

export default router;
