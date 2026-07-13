import type { CartLine } from "@/types/product";

export type StoredOrder = {
  reference: string;
  paymentProviderReference?: string;
  customer: Record<string, unknown>;
  lines: CartLine[];
  shipping: unknown;
  status: string;
  paymentStatus: string;
  fulfilmentStatus: string;
  createdAt: string;
  updatedAt: string;
  webhookConfirmed?: boolean;
};

const globalStore = globalThis as unknown as { __brightdeskOrders?: Map<string, StoredOrder> };
if (!globalStore.__brightdeskOrders) globalStore.__brightdeskOrders = new Map();

export function createOrder(input: Omit<StoredOrder, "createdAt" | "updatedAt">): StoredOrder {
  const now = new Date().toISOString();
  const order: StoredOrder = { ...input, createdAt: now, updatedAt: now };
  globalStore.__brightdeskOrders!.set(order.reference, order);
  return order;
}

export function getOrder(reference: string) {
  return globalStore.__brightdeskOrders!.get(reference);
}

export function getOrderByPaymentRef(paymentRef: string) {
  for (const order of globalStore.__brightdeskOrders!.values()) {
    if (order.paymentProviderReference === paymentRef) return order;
  }
  return undefined;
}

export function updateOrder(reference: string, patch: Partial<StoredOrder>) {
  const existing = getOrder(reference);
  if (!existing) return undefined;
  const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  globalStore.__brightdeskOrders!.set(reference, updated);
  return updated;
}

export function findOrderByEmail(reference: string, email: string) {
  const order = getOrder(reference);
  if (!order) return undefined;
  const customerEmail = String((order.customer as { email?: string })?.email ?? "").toLowerCase();
  if (customerEmail !== email.toLowerCase()) return undefined;
  return order;
}
