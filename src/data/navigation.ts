export type NavLink = { label: string; href: string; description?: string };

export type NavGroup = {
  id: string;
  label: string;
  href?: string;
  columns: { title: string; links: NavLink[] }[];
};

export const primaryNav: NavGroup[] = [
  {
    id: "desks",
    label: "Desks",
    href: "/collections/desks-workstations",
    columns: [
      {
        title: "Desks & Workstations",
        links: [
          { label: "Writing Desks", href: "/collections/writing-desks" },
          { label: "Executive Desks", href: "/collections/executive-desks" },
          { label: "Corner Workstations", href: "/collections/corner-workstations" },
          { label: "Compact Desks", href: "/collections/desks-workstations" },
          { label: "All Desks", href: "/collections/desks-workstations" },
        ],
      },
      {
        title: "Tables",
        links: [
          { label: "Meeting Tables", href: "/collections/meeting-tables" },
          { label: "Training Tables", href: "/collections/training-tables" },
        ],
      },
    ],
  },
  {
    id: "seating",
    label: "Seating",
    href: "/collections/task-chairs",
    columns: [
      {
        title: "Work Seating",
        links: [
          { label: "Task Chairs", href: "/collections/task-chairs" },
          { label: "Swivel Chairs", href: "/collections/task-chairs" },
          { label: "Guest Chairs", href: "/collections/guest-chairs" },
        ],
      },
      {
        title: "Lounge",
        links: [
          { label: "Lounge Chairs", href: "/collections/lounge-seating" },
          { label: "Loveseats", href: "/collections/loveseats" },
          { label: "Benches & Ottomans", href: "/collections/benches-ottomans" },
        ],
      },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    href: "/collections/storage",
    columns: [
      {
        title: "Storage",
        links: [
          { label: "Mobile Pedestals", href: "/collections/storage" },
          { label: "Credenzas", href: "/collections/credenzas" },
          { label: "Printer Cabinets", href: "/collections/storage" },
          { label: "Bookcases", href: "/collections/bookcases" },
          { label: "Room-Divider Shelving", href: "/collections/storage" },
        ],
      },
    ],
  },
  {
    id: "meeting",
    label: "Meeting",
    href: "/collections/meeting-tables",
    columns: [
      {
        title: "Collaboration",
        links: [
          { label: "Meeting Tables", href: "/collections/meeting-tables" },
          { label: "Training Tables", href: "/collections/training-tables" },
          { label: "Guest Chairs", href: "/collections/guest-chairs" },
          { label: "Meet Zone", href: "/zones/meet" },
        ],
      },
    ],
  },
  {
    id: "lounge",
    label: "Lounge",
    href: "/collections/lounge-seating",
    columns: [
      {
        title: "Soft Seating",
        links: [
          { label: "Lounge Seating", href: "/collections/lounge-seating" },
          { label: "Loveseats", href: "/collections/loveseats" },
          { label: "Benches & Ottomans", href: "/collections/benches-ottomans" },
          { label: "Reset Zone", href: "/zones/reset" },
        ],
      },
    ],
  },
  {
    id: "home-office",
    label: "Home Office",
    href: "/collections/home-office",
    columns: [
      {
        title: "Home Office",
        links: [
          { label: "Home Office Collection", href: "/collections/home-office" },
          { label: "Home Office Room", href: "/rooms/home-office" },
          { label: "Focus Zone", href: "/zones/focus" },
          { label: "Reset Zone", href: "/zones/reset" },
        ],
      },
    ],
  },
  {
    id: "zones",
    label: "Shop by Zone",
    href: "/zones/focus",
    columns: [
      {
        title: "Functional Zones",
        links: [
          { label: "Focus", href: "/zones/focus", description: "Individual work" },
          { label: "Meet", href: "/zones/meet", description: "Collaboration" },
          { label: "Store", href: "/zones/store", description: "Organization" },
          { label: "Welcome", href: "/zones/welcome", description: "Reception" },
          { label: "Reset", href: "/zones/reset", description: "Transition" },
        ],
      },
      {
        title: "Shop by Room",
        links: [
          { label: "Home Office", href: "/rooms/home-office" },
          { label: "Private Office", href: "/rooms/private-office" },
          { label: "Open Workspace", href: "/rooms/open-workspace" },
          { label: "Meeting Room", href: "/rooms/meeting-room" },
          { label: "Reception", href: "/rooms/reception" },
          { label: "Reading and Lounge", href: "/rooms/lounge" },
        ],
      },
    ],
  },
  {
    id: "materials",
    label: "Materials",
    href: "/materials-finishes",
    columns: [
      {
        title: "Materials & Care",
        links: [
          { label: "Materials and Finishes", href: "/materials-finishes" },
          { label: "Upholstery and Care", href: "/upholstery-care" },
          { label: "Measuring Guide", href: "/measuring-guide" },
          { label: "Furniture Safety", href: "/furniture-safety" },
        ],
      },
    ],
  },
];

export const customerInfoLinks: NavLink[] = [
  { label: "Materials and Finishes", href: "/materials-finishes" },
  { label: "Upholstery and Care", href: "/upholstery-care" },
  { label: "Measuring Guide", href: "/measuring-guide" },
  { label: "Furniture Safety", href: "/furniture-safety" },
  { label: "Assembly Information", href: "/assembly-information" },
  { label: "Shipping", href: "/shipping-policy" },
  { label: "Returns", href: "/return-refund-policy" },
  { label: "Track Order", href: "/track-order" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return & Refund Policy", href: "/return-refund-policy" },
  { label: "Accessibility", href: "/accessibility" },
];
