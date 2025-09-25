export function parseChainsParam(value?: string): string[] | undefined {
  if (!value) return undefined;
  const list = value.split(",").map((c) => c.trim()).filter(Boolean);
  return list.length ? list : undefined;
}

export function nowMs(): number {
  return Date.now();
}

// Narrowing helpers (no 'any')
export function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

export function toNumberSafe(x: unknown, fallback = 0): number {
  const n = typeof x === "number" ? x : Number(x);
  return Number.isFinite(n) ? n : fallback;
}

export function toStringSafe(x: unknown, fallback = ""): string {
  return typeof x === "string" ? x : fallback;
}
