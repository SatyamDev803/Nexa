import type { Intent, RankedPool } from "../types";

export function buildIntent(params: {
  user: string;
  amount: string;
  fromToken: string;
  fromChain: string; // "near"
  winner: RankedPool;
}): Intent {
  const { user, amount, fromToken, fromChain, winner } = params;

  const steps: Intent["steps"] = [
    { type: "swap",   fromChain, tokenIn: fromToken, tokenOut: winner.token, protocol: "router:auto" },
    { type: "bridge", fromChain, toChain: winner.chain, tokenIn: winner.token, tokenOut: winner.token, protocol: "bridge:auto" },
    { type: "deposit", toChain: winner.chain, tokenIn: winner.token, tokenOut: winner.token, protocol: winner.platform }
  ];

  return {
    user,
    amount,
    fromToken,
    fromChain,
    toPool: {
      chain: winner.chain,
      platform: winner.platform,
      token: winner.token
    },
    steps
  };
}
