export interface PackageTier {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  icon: string;
  features: string[];
}

export const packageTiers: PackageTier[] = [
  {
    id: "economy",
    name: "Economy",
    description: "Budget-friendly options with quality essentials",
    priceMultiplier: 0.7,
    icon: "💰",
    features: ["Basic materials", "Standard finish", "1-year warranty", "Self-installation guide"],
  },
  {
    id: "standard",
    name: "Standard",
    description: "Balanced quality and value for everyday spaces",
    priceMultiplier: 1.0,
    icon: "⭐",
    features: ["Quality materials", "Professional finish", "5-year warranty", "Basic installation included"],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Superior materials and craftsmanship",
    priceMultiplier: 1.4,
    icon: "💎",
    features: ["Premium materials", "Designer finish", "15-year warranty", "Full installation included", "Underlay included"],
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "The finest materials with white-glove service",
    priceMultiplier: 2.0,
    icon: "👑",
    features: ["Imported luxury materials", "Bespoke finishing", "Lifetime warranty", "White-glove installation", "Premium underlay & skirting", "Post-install maintenance"],
  },
];
