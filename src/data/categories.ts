export type Category = {
  slug: string;
  name: string;
  description: string;
  parent?: string;
};

export const categories: Category[] = [
  {
    slug: "desks-workstations",
    name: "Desks & Workstations",
    description: "Writing desks, executive desks, corner workstations and compact work surfaces.",
  },
  {
    slug: "writing-desks",
    name: "Writing Desks",
    description: "Compact writing desks for focused individual work.",
    parent: "desks-workstations",
  },
  {
    slug: "executive-desks",
    name: "Executive Desks",
    description: "Larger desks with return options for private offices.",
    parent: "desks-workstations",
  },
  {
    slug: "corner-workstations",
    name: "Corner Workstations",
    description: "L-shaped workstations for corner placements.",
    parent: "desks-workstations",
  },
  {
    slug: "meeting-tables",
    name: "Meeting Tables",
    description: "Round and rectangular tables for collaboration.",
  },
  {
    slug: "training-tables",
    name: "Training Tables",
    description: "Tables intended for flexible and training rooms.",
  },
  {
    slug: "task-chairs",
    name: "Task & Swivel Chairs",
    description: "Task and low-back swivel seating for work surfaces.",
  },
  {
    slug: "guest-chairs",
    name: "Guest Chairs",
    description: "Visitor and guest seating for offices and reception.",
  },
  {
    slug: "lounge-seating",
    name: "Lounge Seating",
    description: "Lounge and reading chairs for welcome and reset zones.",
  },
  {
    slug: "loveseats",
    name: "Loveseats",
    description: "Compact two-seat upholstered seating.",
  },
  {
    slug: "benches-ottomans",
    name: "Benches & Ottomans",
    description: "Storage benches and round ottomans.",
  },
  {
    slug: "storage",
    name: "Storage",
    description: "Pedestals, credenzas, cabinets, bookcases and dividers.",
  },
  {
    slug: "credenzas",
    name: "Credenzas",
    description: "Low storage for offices, meeting rooms and reception.",
    parent: "storage",
  },
  {
    slug: "bookcases",
    name: "Bookcases",
    description: "Vertical shelving for offices and reading areas.",
    parent: "storage",
  },
  {
    slug: "home-office",
    name: "Home Office",
    description: "Furniture suited to home-office rooms and compact workspaces.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
