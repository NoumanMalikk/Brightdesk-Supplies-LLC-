import type { FunctionalZoneId } from "@/types/product";

export type FunctionalZone = {
  id: FunctionalZoneId;
  name: string;
  slug: string;
  headline: string;
  description: string;
  productSkus: string[];
  accent: "ink" | "blue" | "moss" | "rust" | "yellow";
};

export const functionalZones: FunctionalZone[] = [
  {
    id: "focus",
    name: "Focus",
    slug: "focus",
    headline: "Individual work with fewer visual distractions.",
    description:
      "Writing desks, workstations, task chairs, compact storage and cable-ready surfaces for concentrated work.",
    productSkus: [
      "BDS-DSK-001",
      "BDS-DSK-002",
      "BDS-DSK-003",
      "BDS-DSK-004",
      "BDS-DSK-005",
      "BDS-STO-010",
      "BDS-CHR-015",
      "BDS-CHR-016",
    ],
    accent: "ink",
  },
  {
    id: "meet",
    name: "Meet",
    slug: "meet",
    headline: "Shared surfaces and seating for conversation and decisions.",
    description:
      "Meeting tables, conference tables, training tables, guest seating and shared storage for collaboration.",
    productSkus: [
      "BDS-DSK-003",
      "BDS-MTG-006",
      "BDS-MTG-007",
      "BDS-MTG-008",
      "BDS-MTG-009",
      "BDS-CHR-016",
      "BDS-CHR-017",
      "BDS-CHR-018",
    ],
    accent: "blue",
  },
  {
    id: "store",
    name: "Store",
    slug: "store",
    headline: "Furniture that gives equipment, files and supplies a defined place.",
    description:
      "Credenzas, pedestals, bookcases, printer cabinets and room-divider storage for organized rooms.",
    productSkus: [
      "BDS-DSK-003",
      "BDS-DSK-004",
      "BDS-MTG-008",
      "BDS-STO-010",
      "BDS-STO-011",
      "BDS-STO-012",
      "BDS-STO-013",
      "BDS-STO-014",
      "BDS-LNG-023",
    ],
    accent: "moss",
  },
  {
    id: "welcome",
    name: "Welcome",
    slug: "welcome",
    headline: "Comfortable, organized furniture for entrances and waiting areas.",
    description:
      "Lounge chairs, loveseats, benches, side tables and reception tables for guest-facing spaces.",
    productSkus: [
      "BDS-MTG-009",
      "BDS-STO-011",
      "BDS-CHR-017",
      "BDS-CHR-018",
      "BDS-LNG-019",
      "BDS-LNG-021",
      "BDS-LNG-022",
      "BDS-LNG-023",
      "BDS-LNG-024",
      "BDS-TBL-025",
      "BDS-SET-026",
    ],
    accent: "rust",
  },
  {
    id: "reset",
    name: "Reset",
    slug: "reset",
    headline: "Flexible furniture for reading, pausing and moving between work and home.",
    description:
      "Soft seating, ottomans, reading chairs, console desks and compact lounge furniture for transition moments.",
    productSkus: [
      "BDS-DSK-001",
      "BDS-DSK-002",
      "BDS-DSK-005",
      "BDS-STO-013",
      "BDS-STO-014",
      "BDS-CHR-016",
      "BDS-CHR-018",
      "BDS-LNG-019",
      "BDS-LNG-020",
      "BDS-LNG-021",
      "BDS-LNG-022",
      "BDS-LNG-023",
      "BDS-LNG-024",
      "BDS-TBL-025",
    ],
    accent: "yellow",
  },
];

export function getZoneBySlug(slug: string) {
  return functionalZones.find((z) => z.slug === slug);
}
