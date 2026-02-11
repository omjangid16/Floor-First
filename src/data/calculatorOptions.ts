export interface AdditionalOption {
  id: string;
  label: string;
  description: string;
  pricePerSqft: number;
  priceUnit?: string; // "sqm" | "linear_meter" | "per_door"
}

export interface CategoryCalculatorConfig {
  categoryId: string;
  categoryName: string;
  shadeLabel: string;
  additionalOptions: AdditionalOption[];
}

const commonOptions: AdditionalOption[] = [
  { id: "standard-install", label: "Standard Installation", description: "Professional floor installation by certified experts", pricePerSqft: 45, priceUnit: "sqm" },
  { id: "furniture-movement", label: "Furniture Movement", description: "Move furniture before and after installation", pricePerSqft: 5, priceUnit: "sqm" },
  { id: "old-floor-removal", label: "Old Floor Removal", description: "Remove and dispose of existing flooring", pricePerSqft: 14, priceUnit: "sqm" },
];

export const categoryCalculatorConfigs: Record<string, CategoryCalculatorConfig> = {
  vinyl: {
    categoryId: "vinyl",
    categoryName: "SPC / LVT",
    shadeLabel: "Design",
    additionalOptions: [
      ...commonOptions,
      { id: "skirting", label: "Skirting", description: "PVC skirting to match flooring", pricePerSqft: 39, priceUnit: "linear_meter" },
      { id: "door-trimming", label: "Door Trimming", description: "Trim doors to fit new floor height", pricePerSqft: 49, priceUnit: "per_door" },
    ],
  },
  wood: {
    categoryId: "wood",
    categoryName: "Wooden Flooring",
    shadeLabel: "Design",
    additionalOptions: [
      ...commonOptions,
      { id: "skirting", label: "Wood Skirting", description: "Solid wood skirting boards", pricePerSqft: 39, priceUnit: "linear_meter" },
      { id: "door-trimming", label: "Door Trimming", description: "Trim doors to fit new floor height", pricePerSqft: 49, priceUnit: "per_door" },
    ],
  },
  tile: {
    categoryId: "tile",
    categoryName: "Tile Flooring",
    shadeLabel: "Design",
    additionalOptions: [
      ...commonOptions,
      { id: "waterproofing", label: "Waterproofing", description: "Waterproof membrane under tiles", pricePerSqft: 7, priceUnit: "sqm" },
      { id: "grouting", label: "Premium Grouting", description: "Epoxy grout for lasting finish", pricePerSqft: 4, priceUnit: "sqm" },
    ],
  },
  outdoor: {
    categoryId: "outdoor",
    categoryName: "Outdoor & Deck",
    shadeLabel: "Design",
    additionalOptions: [
      ...commonOptions,
      { id: "drainage", label: "Drainage System", description: "Proper drainage setup for outdoor areas", pricePerSqft: 10, priceUnit: "sqm" },
      { id: "anti-slip", label: "Anti-Slip Coating", description: "Safety coating for wet areas", pricePerSqft: 5, priceUnit: "sqm" },
    ],
  },
  carpet: {
    categoryId: "carpet",
    categoryName: "Carpet Flooring",
    shadeLabel: "Design",
    additionalOptions: [
      ...commonOptions,
      { id: "underlay-carpet", label: "Carpet Underlay", description: "Cushioned underlay for comfort", pricePerSqft: 5, priceUnit: "sqm" },
      { id: "stain-guard", label: "Stain Guard", description: "Protective stain-resistant treatment", pricePerSqft: 4, priceUnit: "sqm" },
    ],
  },
  stone: {
    categoryId: "stone",
    categoryName: "Stone Flooring",
    shadeLabel: "Design",
    additionalOptions: [
      ...commonOptions,
      { id: "sealing", label: "Stone Sealing", description: "Protective sealant for natural stone", pricePerSqft: 8, priceUnit: "sqm" },
      { id: "polishing", label: "Polishing & Honing", description: "Professional stone polish finish", pricePerSqft: 12, priceUnit: "sqm" },
    ],
  },
};

export const getCalculatorConfig = (categoryId: string): CategoryCalculatorConfig | null => {
  return categoryCalculatorConfigs[categoryId] || null;
};
