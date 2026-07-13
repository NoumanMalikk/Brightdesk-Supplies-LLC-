import { randomBytes } from "crypto";

export function generateOrderReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = randomBytes(6).toString("hex").toUpperCase();
  return `BDS-${stamp}-${rand}`;
}
