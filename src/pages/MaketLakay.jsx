import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "Marketplace UX · Trust design · Front-end build",
  summary: "A multi-vendor marketplace connecting Haitian businesses, local shoppers and the diaspora, bringing trust, product discovery and diaspora care packages into one place.",
  meta: [
    { label: "Role", value: "Solo designer & developer" },
    { label: "Scope", value: "UX/UI design, multi-vendor architecture, front-end build, deployment" },
    { label: "Stack", value: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Vercel" },
  ],
  cover: {
    src: "/assets/maket-lakay-live.png",
    alt: "Maket Lakay marketplace homepage with category browsing and trending picks",
    caption: "The live homepage: category color blocking, trending picks, and local artisan goods for gifting.",
  },
  glance: [
    { label: "Problem", title: "Trust and scattered commerce", text: "Many Haitian businesses sell through Instagram, Facebook or WhatsApp, with no easy way to verify a vendor, compare products, pay digitally or track delivery." },
    { label: "Key decision", title: "Care packages, built in", text: "A dedicated bundle flow turns “send something home” into a first-class way to shop, not an outside workaround." },
    { label: "Outcome", title: "A live marketplace foundation", text: "Category browsing, verified vendor storefronts and a care-package flow, ready to onboard real vendors." },
  ],
  did: [
    "Defined a trust-first strategy for a marketplace built on top of scattered social-media commerce.",
    "Designed and built the multi-vendor experience: category browsing, vendor storefronts, cart and checkout.",
    "Designed the diaspora care-package flow, a Haiti-specific way to buy with no direct precedent in generic e-commerce templates.",
    "Directed the visual system: warm, trust-forward color blocking across categories and vendor cards.",
    "Structured the front end so the data model is ready for multi-vendor inventory, commissions and payouts.",
  ],
  challenge: {
    lead: "Shopping from Haitian businesses often means scrolling Instagram, messaging on WhatsApp, and hoping the vendor is real. There is no simple way to verify, compare, pay digitally or track an order.",
    body: ["The diaspora adds a second layer: someone in the U.S. or Canada needs to buy for family in Haiti, pay digitally, and have the order delivered locally."],
  },
  keyDecision: "Trust has to be visible before checkout, not discovered after it.",
  approach: [
    { lead: "One place to shop.", text: "Scattered Instagram, Facebook and WhatsApp selling becomes one browsable, trustworthy marketplace." },
    { lead: "Trust up front.", text: "Verified-vendor badges, ratings and vendor location are shown before checkout." },
    { lead: "Built for the diaspora.", text: "Care packages replace forcing cross-border gifting into a cart designed for one shopper in one country." },
    { lead: "Organized around the shopper.", text: "Categories, search, cart and checkout follow the product and the need, not individual vendor storefronts." },
  ],
  structure: {
    intro: "Three jobs, in the order a shopper moves through them.",
    steps: [
      { title: "Discover", text: "Category browsing across electronics, fashion, groceries, appliances and local artisan goods, with featured, trending and new-arrival rails." },
      { title: "Trust", text: "Verified-vendor badges, ratings and location let a shopper evaluate a business before checkout." },
      { title: "Send", text: "Care packages let a buyer abroad assemble a bundle for family in Haiti and have it delivered locally." },
    ],
  },
  decisions: [
    { title: "Vendor verification and trust signals", text: "Verified vendors, ratings, reviews and clear vendor information are core to the experience, because shoppers buy from many independent businesses." },
    { title: "Diaspora care packages", text: "Instead of buying items one by one or arranging an international shipment, a shopper picks a prepared package and it is delivered locally." },
    { title: "One marketplace, many vendors", text: "Search, cart and checkout feel like one store even when the items come from several vendors." },
  ],
  built: [
    "Next.js, React and TypeScript for a type-safe, server-rendered marketplace.",
    "Tailwind CSS and shadcn/ui for a consistent, accessible component system across category, cart and checkout.",
    "Cart and checkout logic organized around products, with a data model ready for multi-vendor orders, inventory, commissions and payouts.",
    "A modular architecture so authentication, payments, inventory and vendor management can be connected as the product grows.",
    "Deployed on Vercel.",
  ],
  visual: {
    lead: "Warm and community-forward, not clinical.",
    body: [
      "A navy header anchors navigation and search, while category sections use bright, distinct color blocks so shoppers can scan back-to-school, pantry picks or artisan goods at a glance.",
      "Phrases like “Bel Lakay” and “Made close to home” sit next to familiar conventions like verified badges and clear pricing, so the marketplace feels distinctly Haitian and immediately usable.",
    ],
  },
  outcome: {
    lead: "Maket Lakay shipped as a working marketplace foundation, designed and built solo, ready to onboard real vendors on a trust-first, diaspora-aware model.",
    items: [
      "Scattered social-media selling brought into one browsable, trustworthy marketplace.",
      "Cross-border gifting turned into a native way to shop through care packages.",
      "An architecture ready for multi-vendor inventory, commissions and payouts.",
    ],
  },
};

export default function MaketLakay() {
  return <CaseStudy study={study} />;
}
