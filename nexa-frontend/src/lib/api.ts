// src/lib/api.ts
import axios from 'axios';
import type { RankResponse, RankedPool, IntentWithQuote } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getRankedPools = async (params: {
  amount: number;
  token?: string;
  chains?: string[];
}): Promise<RankResponse> => {
  const queryParams = new URLSearchParams({ amount: params.amount.toString() });
  if (params.token) queryParams.append('token', params.token);
  if (params.chains && params.chains.length > 0) queryParams.append('chains', params.chains.join(','));

  const response = await api.get<RankResponse>(`/rank?${queryParams.toString()}`);
  return response.data;
};

export const createIntent = async (body: {
  user: string;
  amount: string;
  fromToken: string;
  fromChain: string;
  winner: RankedPool;
}): Promise<IntentWithQuote> => {
  const response = await api.post<IntentWithQuote>('/intent', body);
  return response.data;
};

export const submitTransaction = async (data: {
  intent: IntentWithQuote;
  txHash: string;
}): Promise<{ ok: true }> => {
  const response = await api.post('/submit', {
    intent: data.intent,
    txHash: data.txHash,
  });
  return response.data;
};

export const getTransactionStatus = async (
  depositAddress: string
): Promise<{ status: string; details: unknown }> => { // FIX: Replaced 'any' with 'unknown'
  const response = await api.get(`/status?depositAddress=${depositAddress}`);
  return response.data;
};