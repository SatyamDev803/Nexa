// src/services/oneClick.ts
import axios from "axios";

const BASE = process.env.ONECLICK_BASE;
const TOKEN = process.env.ONECLICK_TOKEN;

// Handle environment validation
if (!BASE) {
  console.error("❌ ONECLICK_BASE is missing — set it in .env");
} else if (!TOKEN) {
  console.warn("⚠️ ONECLICK_TOKEN not set — running in public mode (0.1% fee).");
} else {
  console.log("✅ 1Click configured with JWT — fee-free mode.");
}

export async function getOneClickQuote(params: {
  originAsset: string;
  destinationAsset: string;
  amount: string;
  refundTo: string;
  recipient: string;
}) {
  const deadline = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min expiry

  const body = {
    originAsset: params.originAsset,
    destinationAsset: params.destinationAsset,
    amount: params.amount,
    swapType: "EXACT_INPUT",
    depositType: "INTENTS",
    refundTo: params.refundTo,
    refundType: "INTENTS",
    recipient: params.recipient,
    recipientType: "INTENTS",
    slippageTolerance: 100, // 1% as integer (100 = 1%, 50 = 0.5%)
    dry: false,
    deadline
  };

  console.log("➡️ Sending this body to 1Click API:", body);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  try {
    const res = await axios.post(`${BASE}/v0/quote`, body, { headers, timeout: 20000 });
    return res.data;
  } catch (err: any) {
    console.error("❌ 1Click API Error Response:", err.response?.data || err.message);
    throw err;
  }
}

export async function getStatus(depositAddress: string, depositMemo?: string) {
  const headers: Record<string, string> = {};
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await axios.get(`${BASE}/v0/status`, {
    params: { depositAddress, depositMemo },
    headers,
    timeout: 10000
  });
  return res.data;
}

export async function submitDepositTx(payload: { txHash: string; depositAddress: string; depositMemo?: string }) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await axios.post(`${BASE}/v0/deposit/submit`, payload, {
    headers,
    timeout: 10000
  });
  return res.data;
}
