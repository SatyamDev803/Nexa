// src/utils/amounts.ts

/**
 * Convert a decimal string amount into base units for NEP-141 tokens.
 * Example: toBaseUnits("1", 24) -> "1000000000000000000000000"
 */
export function toBaseUnits(amountDecimal: string, decimals: number): string {
  if (!amountDecimal || isNaN(Number(amountDecimal))) {
    throw new Error(`Invalid amount: ${amountDecimal}`);
  }

  const [ints, frac = ""] = amountDecimal.split(".");
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals);

  return (
    BigInt(ints || "0") * BigInt(10) ** BigInt(decimals) +
    BigInt(fracPadded || "0")
  ).toString();
}

/**
 * Convert raw base units into a human-readable decimal string.
 */
export function fromBaseUnits(amountRaw: string, decimals: number): string {
  const s = amountRaw.toString().padStart(decimals + 1, "0");
  const intPart = s.slice(0, -decimals) || "0";
  const fracPart = s.slice(-decimals).replace(/0+$/, "");
  return fracPart.length ? `${intPart}.${fracPart}` : intPart;
}


