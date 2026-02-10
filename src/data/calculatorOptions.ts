export interface AdditionalOption {
  id: string;
  label: string;
  description: string;
  pricePerSqft: number; // AED per sqft
  icon: string;
}

export interface CategoryCalculatorConfig {
  categoryId: string;
  categoryName: string;
  shadeLabel: string; // e.g. "Shade", "Texture", "Finish"
  additionalOptions: AdditionalOption[];
}

const commonOptions: AdditionalOption[] = [
  { id: "standard-install", label: "Standard Installation", description: "Professional floor installation", pricePerSqft: 15, icon: "🔧" },
  { id: "old-floor-removal", label: "Old Floor Removal", description: "Remove and dispose of existing flooring", pricePerSqft: 8, icon: "🗑️" },
  { id: "furniture-movement", label: "Furniture Movement", description: "Move furniture before and after installation", pricePerSqft: 5, icon: "🪑" },
];

export const categoryCalculatorConfigs: Record<string, CategoryCalculatorConfig> = {
  vinyl: {
    categoryId: "vinyl",
    categoryName: "SPC / LVT",
    shadeLabel: "Shade",
    additionalOptions: [
      ...commonOptions,
      { id: "underlay", label: "Underlay", description: "Sound & moisture underlay for vinyl", pricePerSqft: 6, icon: "🧱" },
      { id: "skirting", label: "Skirting", description: "PVC skirting to match flooring", pricePerSqft: 4, icon: "📐" },
      { id: "door-trimming", label: "Door Trimming", description: "Trim doors to fit new floor height", pricePerSqft: 3, icon: "🚪" },
    ],
  },
  wood: {
    categoryId: "wood",
    categoryName: "Wooden Flooring",
    shadeLabel: "Shade",
    additionalOptions: [
      ...commonOptions,
      { id: "underlay", label: "Premium Underlay", description: "Acoustic & thermal underlay for wood", pricePerSqft: 8, icon: "🧱" },
      { id: "skirting", label: "Wood Skirting", description: "Solid wood skirting boards", pricePerSqft: 6, icon: "📐" },
      { id: "door-trimming", label: "Door Trimming", description: "Trim doors to fit new floor height", pricePerSqft: 3, icon: "🚪" },
      { id: "staining", label: "Custom Staining", description: "Apply custom stain to match your style", pricePerSqft: 10, icon: "🎨" },
    ],
  },
  tile: {
    categoryId: "tile",
    categoryName: "Tile Flooring",
    shadeLabel: "Design / Finish",
    additionalOptions: [
      ...commonOptions,
      { id: "waterproofing", label: "Waterproofing", description: "Waterproof membrane under tiles", pricePerSqft: 7, icon: "💧" },
      { id: "grouting", label: "Premium Grouting", description: "Epoxy grout for lasting finish", pricePerSqft: 4, icon: "🧽" },
      { id: "leveling", label: "Floor Leveling", description: "Self-leveling compound for even surface", pricePerSqft: 6, icon: "📏" },
    ],
  },
  outdoor: {
    categoryId: "outdoor",
    categoryName: "Outdoor & Deck Flooring",
    shadeLabel: "Shade",
    additionalOptions: [
      ...commonOptions,
      { id: "drainage", label: "Drainage System", description: "Proper drainage setup for outdoor areas", pricePerSqft: 10, icon: "🌧️" },
      { id: "anti-slip", label: "Anti-Slip Coating", description: "Safety coating for wet areas", pricePerSqft: 5, icon: "🦶" },
      { id: "edging", label: "Edge Trim & Border", description: "Decorative edging and border profiles", pricePerSqft: 4, icon: "📐" },
    ],
  },
  carpet: {
    categoryId: "carpet",
    categoryName: "Carpet Flooring",
    shadeLabel: "Texture / Color",
    additionalOptions: [
      ...commonOptions,
      { id: "underlay-carpet", label: "Carpet Underlay", description: "Cushioned underlay for comfort", pricePerSqft: 5, icon: "🧱" },
      { id: "stain-guard", label: "Stain Guard", description: "Protective stain-resistant treatment", pricePerSqft: 4, icon: "🛡️" },
      { id: "binding", label: "Edge Binding", description: "Professional edge binding for rugs", pricePerSqft: 3, icon: "✂️" },
    ],
  },
  stone: {
    categoryId: "stone",
    categoryName: "Stone Flooring",
    shadeLabel: "Shade",
    additionalOptions: [
      ...commonOptions,
      { id: "sealing", label: "Stone Sealing", description: "Protective sealant for natural stone", pricePerSqft: 8, icon: "🛡️" },
      { id: "polishing", label: "Polishing & Honing", description: "Professional stone polish finish", pricePerSqft: 12, icon: "✨" },
      { id: "leveling", label: "Floor Leveling", description: "Self-leveling for heavy stone", pricePerSqft: 6, icon: "📏" },
    ],
  },
  concrete: {
    categoryId: "concrete",
    categoryName: "Concrete Flooring",
    shadeLabel: "Finish",
    additionalOptions: [
      ...commonOptions,
      { id: "polishing", label: "Concrete Polishing", description: "Diamond polishing for smooth finish", pricePerSqft: 10, icon: "✨" },
      { id: "sealing", label: "Surface Sealing", description: "Protective seal for concrete floors", pricePerSqft: 6, icon: "🛡️" },
    ],
  },
  resin: {
    categoryId: "resin",
    categoryName: "Resin & Industrial Flooring",
    shadeLabel: "Finish",
    additionalOptions: [
      ...commonOptions,
      { id: "primer", label: "Primer Coat", description: "Base primer for resin adhesion", pricePerSqft: 5, icon: "🎨" },
      { id: "anti-static", label: "Anti-Static Coating", description: "ESD protection for sensitive areas", pricePerSqft: 8, icon: "⚡" },
    ],
  },
  rubber: {
    categoryId: "rubber",
    categoryName: "Rubber & Sports Flooring",
    shadeLabel: "Color",
    additionalOptions: [
      ...commonOptions,
      { id: "line-marking", label: "Line Marking", description: "Court or zone line marking", pricePerSqft: 4, icon: "📏" },
      { id: "impact-pad", label: "Impact Padding", description: "Extra shock-absorption layer", pricePerSqft: 6, icon: "🏋️" },
    ],
  },
};

export const getCalculatorConfig = (categoryId: string): CategoryCalculatorConfig | null => {
  return categoryCalculatorConfigs[categoryId] || null;
};
