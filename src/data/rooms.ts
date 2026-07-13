import type { FunctionalZoneId } from "@/types/product";

export type Room = {
  slug: string;
  name: string;
  description: string;
  relatedZones: FunctionalZoneId[];
  matchLabels: string[];
};

export const rooms: Room[] = [
  {
    slug: "home-office",
    name: "Home Office",
    description: "Desks, seating and storage for dedicated or shared home workspaces.",
    relatedZones: ["focus", "store", "reset"],
    matchLabels: ["Home Office", "Small Home Office", "Bedroom Workspace"],
  },
  {
    slug: "private-office",
    name: "Private Office",
    description: "Executive desks, guest seating and storage for enclosed offices.",
    relatedZones: ["focus", "meet", "store"],
    matchLabels: ["Private Office", "Compact Office"],
  },
  {
    slug: "open-workspace",
    name: "Open Workspace",
    description: "Furniture for shared open work areas and flexible layouts.",
    relatedZones: ["focus", "store", "meet"],
    matchLabels: ["Open Workspace", "Shared Office", "Flexible Workspace"],
  },
  {
    slug: "meeting-room",
    name: "Meeting Room",
    description: "Tables, guest seating and shared storage for collaboration rooms.",
    relatedZones: ["meet", "store"],
    matchLabels: ["Meeting Room", "Training Room", "Informal Meeting Area"],
  },
  {
    slug: "reception",
    name: "Reception",
    description: "Lounge seating, benches and side tables for entrances and waiting areas.",
    relatedZones: ["welcome", "store"],
    matchLabels: ["Reception", "Waiting Area", "Entry Area", "Break Area"],
  },
  {
    slug: "lounge",
    name: "Reading and Lounge Area",
    description: "Soft seating and flexible pieces for reading and pause moments.",
    relatedZones: ["reset", "welcome"],
    matchLabels: ["Reading Area", "Living Area", "Lounge"],
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((r) => r.slug === slug);
}
