export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How is the catalog organized?",
    answer:
      "Brightdesk organizes furniture around functional zones—Focus, Meet, Store, Welcome and Reset—as well as by furniture type and room. The goal is to help you browse by what needs to happen in the room.",
  },
  {
    id: "faq-2",
    question: "Are product dimensions verified?",
    answer:
      "Only dimensions marked as verified should be treated as confirmed. Fields labeled Verification required, Pending supplier documentation, Pending manufacturing specification or Pending physical product inspection are not confirmed.",
  },
  {
    id: "faq-3",
    question: "Can I visit a showroom or pick up locally?",
    answer:
      "The listed address is treated as a registered or mailing address. Brightdesk does not currently present a public showroom, warehouse pickup location or local delivery service unless later configured.",
  },
  {
    id: "faq-4",
    question: "How is shipping calculated?",
    answer:
      "Shipping is based on product size, package details, shipping class, quantity and destination when carriers are configured. Demonstration shipping estimates are clearly labeled and are not live carrier rates.",
  },
  {
    id: "faq-5",
    question: "What does demo mode mean?",
    answer:
      "In demonstration mode, products and prices are labeled for interface testing. Live payment and production email are not used. Incomplete products cannot enter live checkout.",
  },
  {
    id: "faq-6",
    question: "Do you offer white-glove delivery or assembly?",
    answer:
      "White-glove delivery, furniture assembly, room installation and custom furniture services are not enabled unless explicitly configured later.",
  },
  {
    id: "faq-7",
    question: "How should I measure before ordering?",
    answer:
      "Measure the room, doorway, hallway, stair and elevator route—not only the destination space. Review package dimensions and assembly clearance. Fitting guidance is informational and does not guarantee fit.",
  },
  {
    id: "faq-8",
    question: "Can I request a quote for multiple rooms?",
    answer:
      "Yes. Use the quote request form to submit products, quantities and destination details for a structured review. Quotes do not promise trade pricing, discounts, installation or delivery timing.",
  },
  {
    id: "faq-9",
    question: "Are finishes and upholstery exact?",
    answer:
      "Screen colors vary. Finish and upholstery names shown must match verified product records. Material claims such as solid wood or genuine leather are not published without verification.",
  },
  {
    id: "faq-10",
    question: "How do I track an order?",
    answer:
      "Use the Track Order page with your order reference and the email used at checkout. Only stored statuses are shown. Carrier tracking numbers are not fabricated.",
  },
];
