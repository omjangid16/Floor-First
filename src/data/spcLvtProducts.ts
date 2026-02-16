// ═══════════════════════════════════════════════════
// SPC / LVT / PVC / WPC / Vinyl Sheet Product Catalog
// Flat hierarchy: FlooringType → Pattern → Shade → Samples
// ═══════════════════════════════════════════════════

export interface DesignSample {
  name: string;
  code: string;
  pricePerSqm: number;
  boxCoverage?: number;
}

export interface ShadeCategory {
  id: string;
  name: string;
  samples: DesignSample[];
}

export interface PatternOption {
  id: string;
  name: string;
  shades: ShadeCategory[];
}

export interface FlooringTypeOption {
  id: string;
  name: string;
  description: string;
  patterns: PatternOption[];
}

// ─── Grade options ───
export interface GradeOption {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
}

export const gradeOptions: GradeOption[] = [
  { id: "standard", name: "Standard", description: "Entry-level quality, suitable for light traffic areas", priceMultiplier: 1.0 },
  { id: "premium", name: "Premium", description: "High durability, enhanced wear layer for moderate traffic", priceMultiplier: 1.25 },
  { id: "luxury", name: "Luxury", description: "Top-tier finish, maximum thickness & wear resistance", priceMultiplier: 1.5 },
];

// ─── Accessory options ───
export interface AccessoryOption {
  id: string;
  name: string;
  description: string;
  unit: string;
  pricePerUnit: number;
}

export const accessoryOptions: AccessoryOption[] = [
  { id: "installation", name: "Professional Installation", description: "Certified installer for your flooring", unit: "per sqm", pricePerUnit: 45 },
  { id: "underlay", name: "Underlay / Foam Sheet", description: "Moisture barrier & sound insulation", unit: "per sqm", pricePerUnit: 12 },
  { id: "skirting", name: "Skirting (MDF/PVC)", description: "Wall-to-floor finishing trim", unit: "per lm", pricePerUnit: 39 },
  { id: "door-trim", name: "Door Trimming", description: "Trim doors for flooring clearance", unit: "per door", pricePerUnit: 49 },
  { id: "furniture-moving", name: "Furniture Moving", description: "Move & replace furniture during install", unit: "per sqm", pricePerUnit: 5 },
  { id: "old-floor-removal", name: "Old Floor Removal", description: "Remove existing flooring before install", unit: "per sqm", pricePerUnit: 14 },
];

// ─── SPC ───
const spcPatterns: PatternOption[] = [
  {
    id: "straight-plank", name: "Straight Plank",
    shades: [
      {
        id: "light-oak", name: "Light Oak", samples: [
          { name: "Light Oak Natural", code: "R-SPC-SP-LO-01", pricePerSqm: 85, boxCoverage: 2.23 },
          { name: "Light Oak Modern", code: "R-SPC-SP-LO-02", pricePerSqm: 90, boxCoverage: 2.23 },
        ],
      },
      {
        id: "dark-oak", name: "Dark Oak", samples: [
          { name: "Dark Oak Classic", code: "R-SPC-SP-DO-01", pricePerSqm: 95, boxCoverage: 2.23 },
          { name: "Dark Oak Espresso", code: "R-SPC-SP-DO-02", pricePerSqm: 92, boxCoverage: 2.23 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Silver", code: "R-SPC-SP-GW-01", pricePerSqm: 88, boxCoverage: 2.23 },
          { name: "Grey Wood Drift", code: "R-SPC-SP-GW-02", pricePerSqm: 90, boxCoverage: 2.23 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut Brown", code: "R-SPC-SP-WN-01", pricePerSqm: 98, boxCoverage: 2.23 },
          { name: "Walnut Dark", code: "R-SPC-SP-WN-02", pricePerSqm: 102, boxCoverage: 2.23 },
        ],
      },
      {
        id: "ash-white", name: "Ash White", samples: [
          { name: "Ash White Nordic", code: "R-SPC-SP-AW-01", pricePerSqm: 82, boxCoverage: 2.23 },
          { name: "Ash White Soft", code: "R-SPC-SP-AW-02", pricePerSqm: 85, boxCoverage: 2.23 },
        ],
      },
    ],
  },
  {
    id: "herringbone", name: "Herringbone",
    shades: [
      {
        id: "light-oak", name: "Light Oak", samples: [
          { name: "Light Oak Premium", code: "R-SPC-HB-LO-01", pricePerSqm: 110, boxCoverage: 1.86 },
          { name: "Light Oak Beige", code: "R-SPC-HB-LO-02", pricePerSqm: 112, boxCoverage: 1.86 },
        ],
      },
      {
        id: "dark-oak", name: "Dark Oak", samples: [
          { name: "Dark Oak Smoked", code: "R-SPC-HB-DO-01", pricePerSqm: 115, boxCoverage: 1.86 },
          { name: "Dark Oak Heritage", code: "R-SPC-HB-DO-02", pricePerSqm: 118, boxCoverage: 1.86 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Ash", code: "R-SPC-HB-GW-01", pricePerSqm: 110, boxCoverage: 1.86 },
          { name: "Grey Wood Modern", code: "R-SPC-HB-GW-02", pricePerSqm: 112, boxCoverage: 1.86 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut Premium", code: "R-SPC-HB-WN-01", pricePerSqm: 118, boxCoverage: 1.86 },
          { name: "Walnut Classic", code: "R-SPC-HB-WN-02", pricePerSqm: 115, boxCoverage: 1.86 },
        ],
      },
      {
        id: "ash-white", name: "Ash White", samples: [
          { name: "Ash White Frost", code: "R-SPC-HB-AW-01", pricePerSqm: 108, boxCoverage: 1.86 },
          { name: "Ash White Ivory", code: "R-SPC-HB-AW-02", pricePerSqm: 110, boxCoverage: 1.86 },
        ],
      },
    ],
  },
  {
    id: "chevron", name: "Chevron",
    shades: [
      {
        id: "light-oak", name: "Light Oak", samples: [
          { name: "Light Oak Chevron Natural", code: "R-SPC-CH-LO-01", pricePerSqm: 120, boxCoverage: 1.86 },
        ],
      },
      {
        id: "dark-oak", name: "Dark Oak", samples: [
          { name: "Dark Oak Chevron Deep", code: "R-SPC-CH-DO-01", pricePerSqm: 122, boxCoverage: 1.86 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Chevron Grey", code: "R-SPC-CH-GW-01", pricePerSqm: 120, boxCoverage: 1.86 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut Chevron Dark", code: "R-SPC-CH-WN-01", pricePerSqm: 125, boxCoverage: 1.86 },
        ],
      },
      {
        id: "ash-white", name: "Ash White", samples: [
          { name: "Ash White Chevron Light", code: "R-SPC-CH-AW-01", pricePerSqm: 118, boxCoverage: 1.86 },
        ],
      },
    ],
  },
];

// ─── LVT ───
const lvtPatterns: PatternOption[] = [
  {
    id: "straight-plank", name: "Straight Plank",
    shades: [
      {
        id: "natural-oak", name: "Natural Oak", samples: [
          { name: "Natural Oak Classic", code: "R-LVT-SP-NO-01", pricePerSqm: 72, boxCoverage: 2.51 },
          { name: "Natural Oak Soft", code: "R-LVT-SP-NO-02", pricePerSqm: 75, boxCoverage: 2.51 },
        ],
      },
      {
        id: "rustic-oak", name: "Rustic Oak", samples: [
          { name: "Rustic Oak Brown", code: "R-LVT-SP-RO-01", pricePerSqm: 78, boxCoverage: 2.51 },
          { name: "Rustic Oak Vintage", code: "R-LVT-SP-RO-02", pricePerSqm: 80, boxCoverage: 2.51 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Light", code: "R-LVT-SP-GW-01", pricePerSqm: 70, boxCoverage: 2.51 },
          { name: "Grey Wood Modern", code: "R-LVT-SP-GW-02", pricePerSqm: 73, boxCoverage: 2.51 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut Natural", code: "R-LVT-SP-WN-01", pricePerSqm: 80, boxCoverage: 2.51 },
          { name: "Walnut Deep", code: "R-LVT-SP-WN-02", pricePerSqm: 83, boxCoverage: 2.51 },
        ],
      },
    ],
  },
  {
    id: "herringbone", name: "Herringbone",
    shades: [
      {
        id: "natural-oak", name: "Natural Oak", samples: [
          { name: "Natural Oak HB Premium", code: "R-LVT-HB-NO-01", pricePerSqm: 95, boxCoverage: 2.05 },
          { name: "Natural Oak HB Beige", code: "R-LVT-HB-NO-02", pricePerSqm: 98, boxCoverage: 2.05 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood HB Ash", code: "R-LVT-HB-GW-01", pricePerSqm: 95, boxCoverage: 2.05 },
          { name: "Grey Wood HB Silver", code: "R-LVT-HB-GW-02", pricePerSqm: 98, boxCoverage: 2.05 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut HB Classic", code: "R-LVT-HB-WN-01", pricePerSqm: 100, boxCoverage: 2.05 },
          { name: "Walnut HB Dark", code: "R-LVT-HB-WN-02", pricePerSqm: 102, boxCoverage: 2.05 },
        ],
      },
    ],
  },
  {
    id: "tile-format", name: "Tile Format (Stone / Marble Look)",
    shades: [
      {
        id: "marble-look", name: "Marble Look", samples: [
          { name: "White Marble Tile", code: "R-LVT-TL-MAR-01", pricePerSqm: 68, boxCoverage: 2.78 },
          { name: "Grey Marble Tile", code: "R-LVT-TL-MAR-02", pricePerSqm: 72, boxCoverage: 2.78 },
        ],
      },
      {
        id: "concrete-look", name: "Concrete Look", samples: [
          { name: "Light Concrete", code: "R-LVT-TL-CON-01", pricePerSqm: 65, boxCoverage: 2.78 },
          { name: "Dark Concrete", code: "R-LVT-TL-CON-02", pricePerSqm: 68, boxCoverage: 2.78 },
        ],
      },
    ],
  },
];

// ─── PVC Flooring ───
const pvcPatterns: PatternOption[] = [
  {
    id: "roll-format", name: "Roll Format",
    shades: [
      {
        id: "light-oak", name: "Light Oak", samples: [
          { name: "Light Oak Print", code: "R-PVC-RL-LO-01", pricePerSqm: 35 },
          { name: "Light Oak Classic", code: "R-PVC-RL-LO-02", pricePerSqm: 38 },
        ],
      },
      {
        id: "dark-oak", name: "Dark Oak", samples: [
          { name: "Dark Oak Brown", code: "R-PVC-RL-DO-01", pricePerSqm: 38 },
          { name: "Dark Oak Rustic", code: "R-PVC-RL-DO-02", pricePerSqm: 40 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Light", code: "R-PVC-RL-GW-01", pricePerSqm: 36 },
          { name: "Grey Wood Drift", code: "R-PVC-RL-GW-02", pricePerSqm: 38 },
        ],
      },
      {
        id: "white-marble", name: "White Marble", samples: [
          { name: "White Marble Print", code: "R-PVC-RL-MAR-01", pricePerSqm: 40 },
        ],
      },
      {
        id: "grey-stone", name: "Grey Stone", samples: [
          { name: "Grey Stone Print", code: "R-PVC-RL-ST-01", pricePerSqm: 40 },
        ],
      },
    ],
  },
  {
    id: "tile-format", name: "Tile Format (PVC Tile)",
    shades: [
      {
        id: "beige", name: "Beige", samples: [
          { name: "Beige Tile", code: "R-PVC-TL-BE-01", pricePerSqm: 32 },
        ],
      },
      {
        id: "grey", name: "Grey", samples: [
          { name: "Grey Tile", code: "R-PVC-TL-GR-01", pricePerSqm: 32 },
        ],
      },
      {
        id: "black", name: "Black", samples: [
          { name: "Black Tile", code: "R-PVC-TL-BL-01", pricePerSqm: 35 },
        ],
      },
    ],
  },
];

// ─── WPC Flooring ───
const wpcPatterns: PatternOption[] = [
  {
    id: "straight-plank", name: "Straight Plank",
    shades: [
      {
        id: "warm-oak", name: "Warm Oak", samples: [
          { name: "Warm Oak Natural", code: "R-WPC-SP-WO-01", pricePerSqm: 95, boxCoverage: 2.16 },
          { name: "Warm Oak Honey", code: "R-WPC-SP-WO-02", pricePerSqm: 98, boxCoverage: 2.16 },
          { name: "Warm Oak Soft Beige", code: "R-WPC-SP-WO-03", pricePerSqm: 97, boxCoverage: 2.16 },
        ],
      },
      {
        id: "natural-beige", name: "Natural Beige", samples: [
          { name: "Natural Beige Classic", code: "R-WPC-SP-NB-01", pricePerSqm: 92, boxCoverage: 2.16 },
          { name: "Natural Beige Sand", code: "R-WPC-SP-NB-02", pricePerSqm: 94, boxCoverage: 2.16 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Light", code: "R-WPC-SP-GW-01", pricePerSqm: 95, boxCoverage: 2.16 },
          { name: "Grey Wood Modern", code: "R-WPC-SP-GW-02", pricePerSqm: 98, boxCoverage: 2.16 },
          { name: "Grey Wood Drift", code: "R-WPC-SP-GW-03", pricePerSqm: 96, boxCoverage: 2.16 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut Brown", code: "R-WPC-SP-WN-01", pricePerSqm: 105, boxCoverage: 2.16 },
          { name: "Walnut Dark", code: "R-WPC-SP-WN-02", pricePerSqm: 108, boxCoverage: 2.16 },
        ],
      },
    ],
  },
  {
    id: "herringbone", name: "Herringbone",
    shades: [
      {
        id: "warm-oak", name: "Warm Oak", samples: [
          { name: "Warm Oak HB Premium", code: "R-WPC-HB-WO-01", pricePerSqm: 120, boxCoverage: 1.86 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood HB Ash", code: "R-WPC-HB-GW-01", pricePerSqm: 118, boxCoverage: 1.86 },
        ],
      },
      {
        id: "walnut", name: "Walnut", samples: [
          { name: "Walnut HB Classic", code: "R-WPC-HB-WN-01", pricePerSqm: 122, boxCoverage: 1.86 },
        ],
      },
    ],
  },
  {
    id: "chevron", name: "Chevron (Limited)",
    shades: [
      {
        id: "warm-oak", name: "Warm Oak", samples: [
          { name: "Warm Oak Chevron", code: "R-WPC-CH-WO-01", pricePerSqm: 128, boxCoverage: 1.86 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Chevron", code: "R-WPC-CH-GW-01", pricePerSqm: 125, boxCoverage: 1.86 },
        ],
      },
    ],
  },
];

// ─── Vinyl Sheet ───
const vinylPatterns: PatternOption[] = [
  {
    id: "wood-print", name: "Wood Print Series",
    shades: [
      {
        id: "light-oak", name: "Light Oak", samples: [
          { name: "Light Oak Natural", code: "R-VS-WP-LO-01", pricePerSqm: 28 },
          { name: "Light Oak Classic", code: "R-VS-WP-LO-02", pricePerSqm: 30 },
        ],
      },
      {
        id: "dark-oak", name: "Dark Oak", samples: [
          { name: "Dark Oak Brown", code: "R-VS-WP-DO-01", pricePerSqm: 30 },
          { name: "Dark Oak Rustic", code: "R-VS-WP-DO-02", pricePerSqm: 32 },
        ],
      },
      {
        id: "grey-wood", name: "Grey Wood", samples: [
          { name: "Grey Wood Light", code: "R-VS-WP-GW-01", pricePerSqm: 28 },
          { name: "Grey Wood Drift", code: "R-VS-WP-GW-02", pricePerSqm: 30 },
        ],
      },
    ],
  },
  {
    id: "marble-print", name: "Marble Print Series",
    shades: [
      {
        id: "white-marble", name: "White Marble", samples: [
          { name: "White Marble Soft", code: "R-VS-MP-WM-01", pricePerSqm: 32 },
        ],
      },
      {
        id: "grey-marble", name: "Grey Marble", samples: [
          { name: "Grey Marble Modern", code: "R-VS-MP-GM-01", pricePerSqm: 32 },
        ],
      },
    ],
  },
  {
    id: "plain-colour", name: "Plain Colour Series",
    shades: [
      {
        id: "beige", name: "Beige", samples: [
          { name: "Beige Smooth", code: "R-VS-PL-BE-01", pricePerSqm: 25 },
        ],
      },
      {
        id: "light-grey", name: "Light Grey", samples: [
          { name: "Light Grey Plain", code: "R-VS-PL-LG-01", pricePerSqm: 25 },
        ],
      },
      {
        id: "brown", name: "Brown", samples: [
          { name: "Brown Neutral", code: "R-VS-PL-BR-01", pricePerSqm: 25 },
        ],
      },
    ],
  },
];

// ─── Full Catalog ───
export const flooringCatalog: FlooringTypeOption[] = [
  { id: "spc", name: "SPC", description: "Rigid core, waterproof, click-lock", patterns: spcPatterns },
  { id: "lvt", name: "LVT", description: "Flexible, glue-down, realistic look", patterns: lvtPatterns },
  { id: "pvc", name: "PVC Flooring", description: "Budget & rental, moisture-resistant", patterns: pvcPatterns },
  { id: "wpc", name: "WPC Flooring", description: "Wood-plastic composite, comfort feel", patterns: wpcPatterns },
  { id: "vinyl-sheet", name: "Vinyl Sheet", description: "Affordable roll-based vinyl", patterns: vinylPatterns },
];
