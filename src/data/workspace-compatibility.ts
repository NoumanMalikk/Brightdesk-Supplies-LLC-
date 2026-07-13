export type WorkspaceSlot = "desk" | "primaryChair" | "storage" | "guestSeat" | "softSeating";

export type CompatibilityEntry = {
  id: string;
  slot: WorkspaceSlot;
  label: string;
  productIds: string[];
};

export const workspaceCompatibility: CompatibilityEntry[] = [
  { id: "ws-desk-compact", slot: "desk", label: "Compact writing desks", productIds: ["prod-001", "prod-005"] },
  { id: "ws-desk-console", slot: "desk", label: "Console workstations", productIds: ["prod-002"] },
  { id: "ws-desk-executive", slot: "desk", label: "Executive desks", productIds: ["prod-003"] },
  { id: "ws-desk-corner", slot: "desk", label: "Corner workstations", productIds: ["prod-004"] },
  { id: "ws-desk-leaning", slot: "desk", label: "Leaning desks", productIds: ["prod-005"] },
  { id: "ws-chair-task", slot: "primaryChair", label: "Task chairs", productIds: ["prod-015"] },
  { id: "ws-chair-swivel", slot: "primaryChair", label: "Swivel chairs", productIds: ["prod-016"] },
  { id: "ws-storage-pedestal", slot: "storage", label: "Mobile pedestals", productIds: ["prod-010"] },
  { id: "ws-storage-credenza", slot: "storage", label: "Credenzas", productIds: ["prod-011"] },
  { id: "ws-storage-printer", slot: "storage", label: "Equipment cabinets", productIds: ["prod-012"] },
  { id: "ws-storage-bookcase", slot: "storage", label: "Bookcases", productIds: ["prod-013"] },
  { id: "ws-storage-divider", slot: "storage", label: "Divider shelves", productIds: ["prod-014"] },
  { id: "ws-bench-storage", slot: "storage", label: "Storage benches", productIds: ["prod-023"] },
  { id: "ws-chair-guest", slot: "guestSeat", label: "Guest chair sets", productIds: ["prod-017"] },
  { id: "ws-chair-visitor", slot: "guestSeat", label: "Visitor chairs", productIds: ["prod-018"] },
  { id: "ws-lounge-channel", slot: "softSeating", label: "Channel lounge", productIds: ["prod-019"] },
  { id: "ws-lounge-reading", slot: "softSeating", label: "Reading chairs", productIds: ["prod-020"] },
  { id: "ws-lounge-loveseat", slot: "softSeating", label: "Loveseats", productIds: ["prod-021"] },
  { id: "ws-lounge-perch", slot: "softSeating", label: "Armless lounge", productIds: ["prod-022"] },
  { id: "ws-ottoman-round", slot: "softSeating", label: "Ottomans", productIds: ["prod-024"] },
  { id: "ws-table-meeting", slot: "desk", label: "Meeting tables", productIds: ["prod-006"] },
  { id: "ws-table-conference", slot: "desk", label: "Conference tables", productIds: ["prod-007"] },
  { id: "ws-table-training", slot: "desk", label: "Training tables", productIds: ["prod-008"] },
  { id: "ws-table-cafe", slot: "desk", label: "Café tables", productIds: ["prod-009"] },
  { id: "ws-table-side", slot: "softSeating", label: "Side tables", productIds: ["prod-025"] },
  { id: "ws-set-reception", slot: "softSeating", label: "Reception sets", productIds: ["prod-026"] },
];

export function productsForSlot(slot: WorkspaceSlot): string[] {
  return [...new Set(workspaceCompatibility.filter((e) => e.slot === slot).flatMap((e) => e.productIds))];
}
