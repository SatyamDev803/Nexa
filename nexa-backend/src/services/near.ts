import { connect, keyStores, utils } from "near-api-js";
import type { Intent, SubmitIntentResult } from "../types/index.d.ts";
import { config } from "../config/config";

/**
 * Submits intents to a NEAR verifier contract IF env is configured.
 * Otherwise returns a mock tx hash so your demo never blocks.
 */
export async function submitIntentsToNear(intents: Intent[]): Promise<SubmitIntentResult> {
  const { verifierContract, accountId, privateKey, networkId, nodeUrl } = config.near;

  const canCall =
    verifierContract && accountId && privateKey && networkId && nodeUrl;

  if (!canCall) {
    // Mock path for demo
    return {
      txHash: `mock-${Date.now().toString(16)}`,
      network: "mock",
    };
  }

  // Real call (backend signer). Make sure you understand the security implications.
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(networkId, accountId, utils.KeyPair.fromString(privateKey));
  const near = await connect({ networkId, nodeUrl, deps: { keyStore } });
  const account = await near.account(accountId);

  const res: any = await account.functionCall({
    contractId: verifierContract,
    methodName: "execute_intents",
    args: { intents },                // <-- align with your contract ABI
    gas: 300000000000000n,           // 300 Tgas
    attachedDeposit: 1000000000000000000000000n // 1 NEAR (adjust)


  const txHash = res?.transaction_outcome?.id || res?.transaction?.hash || "unknown";
  return { txHash, network: networkId };
}
