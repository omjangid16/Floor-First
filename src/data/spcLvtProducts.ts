// ═══════════════════════════════════════════════════
// SPC / LVT / PVC / WPC / Vinyl Sheet Product Catalog
// Hierarchical & SKU-driven
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

export interface PropertyTypeOption {
  id: string;
  name: string;
  patterns: PatternOption[];
}

export interface FlooringTypeOption {
  id: string;
  name: string;
  propertyTypes: PropertyTypeOption[];
}

// ─── SPC ───

const spcResidential: PropertyTypeOption = {
  id: "residential",
  name: "Residential",
  patterns: [
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
  ],
};

const spcCommercial: PropertyTypeOption = {
  id: "commercial",
  name: "Commercial",
  patterns: [
    {
      id: "straight-plank", name: "Straight Plank (Heavy Duty)",
      shades: [
        {
          id: "corporate-oak", name: "Corporate Oak", samples: [
            { name: "Corporate Oak Natural", code: "C-SPC-SP-CO-01", pricePerSqm: 78, boxCoverage: 2.23 },
            { name: "Corporate Oak Matte", code: "C-SPC-SP-CO-02", pricePerSqm: 80, boxCoverage: 2.23 },
          ],
        },
        {
          id: "industrial-grey", name: "Industrial Grey", samples: [
            { name: "Industrial Grey Light", code: "C-SPC-SP-IG-01", pricePerSqm: 75, boxCoverage: 2.23 },
            { name: "Industrial Grey Concrete", code: "C-SPC-SP-IG-02", pricePerSqm: 77, boxCoverage: 2.23 },
          ],
        },
        {
          id: "dark-walnut", name: "Dark Walnut", samples: [
            { name: "Dark Walnut Office", code: "C-SPC-SP-DW-01", pricePerSqm: 82, boxCoverage: 2.23 },
            { name: "Dark Walnut Premium", code: "C-SPC-SP-DW-02", pricePerSqm: 85, boxCoverage: 2.23 },
          ],
        },
        {
          id: "smoked-wood", name: "Smoked Wood", samples: [
            { name: "Smoked Wood Grey", code: "C-SPC-SP-SW-01", pricePerSqm: 85, boxCoverage: 2.23 },
            { name: "Smoked Wood Brown", code: "C-SPC-SP-SW-02", pricePerSqm: 88, boxCoverage: 2.23 },
          ],
        },
      ],
    },
    {
      id: "tile-pattern", name: "Tile Pattern (Commercial)",
      shades: [
        {
          id: "industrial-grey", name: "Industrial Grey", samples: [
            { name: "Grey Tile Look", code: "C-SPC-TL-IG-01", pricePerSqm: 85, boxCoverage: 2.0 },
          ],
        },
        {
          id: "concrete", name: "Concrete", samples: [
            { name: "Concrete Light", code: "C-SPC-TL-CON-01", pricePerSqm: 82, boxCoverage: 2.0 },
          ],
        },
      ],
    },
    {
      id: "herringbone", name: "Herringbone (Limited Use)",
      shades: [
        {
          id: "corporate-oak", name: "Corporate Oak", samples: [
            { name: "Corporate Oak HB", code: "C-SPC-HB-CO-01", pricePerSqm: 95, boxCoverage: 1.86 },
          ],
        },
        {
          id: "dark-walnut", name: "Dark Walnut", samples: [
            { name: "Dark Walnut HB", code: "C-SPC-HB-DW-01", pricePerSqm: 98, boxCoverage: 1.86 },
          ],
        },
      ],
    },
  ],
};

// ─── LVT ───

const lvtResidential: PropertyTypeOption = {
  id: "residential",
  name: "Residential",
  patterns: [
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
  ],
};

const lvtCommercial: PropertyTypeOption = {
  id: "commercial",
  name: "Commercial",
  patterns: [
    {
      id: "straight-plank", name: "Straight Plank (Heavy Duty)",
      shades: [
        {
          id: "corporate-oak", name: "Corporate Oak", samples: [
            { name: "Corporate Oak Natural", code: "C-LVT-SP-CO-01", pricePerSqm: 65, boxCoverage: 2.51 },
            { name: "Corporate Oak Matte", code: "C-LVT-SP-CO-02", pricePerSqm: 68, boxCoverage: 2.51 },
          ],
        },
        {
          id: "industrial-grey", name: "Industrial Grey", samples: [
            { name: "Industrial Grey Light", code: "C-LVT-SP-IG-01", pricePerSqm: 62, boxCoverage: 2.51 },
            { name: "Industrial Grey Concrete", code: "C-LVT-SP-IG-02", pricePerSqm: 65, boxCoverage: 2.51 },
          ],
        },
        {
          id: "dark-walnut", name: "Dark Walnut", samples: [
            { name: "Dark Walnut Office", code: "C-LVT-SP-DW-01", pricePerSqm: 70, boxCoverage: 2.51 },
            { name: "Dark Walnut Premium", code: "C-LVT-SP-DW-02", pricePerSqm: 73, boxCoverage: 2.51 },
          ],
        },
      ],
    },
    {
      id: "tile-format", name: "Tile Format (Commercial)",
      shades: [
        {
          id: "concrete-series", name: "Concrete Series", samples: [
            { name: "Concrete Light Tile", code: "C-LVT-TL-CON-01", pricePerSqm: 60, boxCoverage: 2.78 },
            { name: "Concrete Dark Tile", code: "C-LVT-TL-CON-02", pricePerSqm: 62, boxCoverage: 2.78 },
          ],
        },
        {
          id: "stone-series", name: "Stone Series", samples: [
            { name: "Stone Grey Tile", code: "C-LVT-TL-ST-01", pricePerSqm: 58, boxCoverage: 2.78 },
            { name: "Stone Beige Tile", code: "C-LVT-TL-ST-02", pricePerSqm: 60, boxCoverage: 2.78 },
          ],
        },
      ],
    },
    {
      id: "herringbone", name: "Herringbone (Limited Commercial Use)",
      shades: [
        {
          id: "corporate-oak", name: "Corporate Oak", samples: [
            { name: "Corporate Oak HB", code: "C-LVT-HB-CO-01", pricePerSqm: 78, boxCoverage: 2.05 },
          ],
        },
        {
          id: "dark-walnut", name: "Dark Walnut", samples: [
            { name: "Dark Walnut HB", code: "C-LVT-HB-DW-01", pricePerSqm: 80, boxCoverage: 2.05 },
          ],
        },
      ],
    },
  ],
};

// ─── PVC Flooring ───

const pvcResidential: PropertyTypeOption = {
  id: "residential",
  name: "Residential",
  patterns: [
    {
      id: "roll-format", name: "Roll Format",
      shades: [
        {
          id: "wood-print-light-oak", name: "Wood Print – Light Oak", samples: [
            { name: "PVC Roll Light Oak Natural", code: "R-PVC-RL-LO-01", pricePerSqm: 35 },
            { name: "PVC Roll Light Oak Warm", code: "R-PVC-RL-LO-02", pricePerSqm: 38 },
          ],
        },
        {
          id: "wood-print-dark-oak", name: "Wood Print – Dark Oak", samples: [
            { name: "PVC Roll Dark Oak Classic", code: "R-PVC-RL-DO-01", pricePerSqm: 38 },
            { name: "PVC Roll Dark Oak Deep", code: "R-PVC-RL-DO-02", pricePerSqm: 40 },
          ],
        },
        {
          id: "wood-print-grey-wood", name: "Wood Print – Grey Wood", samples: [
            { name: "PVC Roll Grey Wood Ash", code: "R-PVC-RL-GW-01", pricePerSqm: 36 },
            { name: "PVC Roll Grey Wood Silver", code: "R-PVC-RL-GW-02", pricePerSqm: 38 },
          ],
        },
        {
          id: "stone-print", name: "Stone Print", samples: [
            { name: "PVC Roll Stone Grey", code: "R-PVC-RL-ST-01", pricePerSqm: 40 },
            { name: "PVC Roll Stone Beige", code: "R-PVC-RL-ST-02", pricePerSqm: 42 },
          ],
        },
      ],
    },
    {
      id: "tile-format", name: "Tile Format",
      shades: [
        {
          id: "pvc-tile-beige", name: "PVC Tile – Beige", samples: [
            { name: "PVC Tile Beige Classic", code: "R-PVC-TL-BG-01", pricePerSqm: 32 },
          ],
        },
        {
          id: "pvc-tile-grey", name: "PVC Tile – Grey", samples: [
            { name: "PVC Tile Grey Matte", code: "R-PVC-TL-GR-01", pricePerSqm: 32 },
          ],
        },
        {
          id: "pvc-tile-black", name: "PVC Tile – Black", samples: [
            { name: "PVC Tile Black Premium", code: "R-PVC-TL-BK-01", pricePerSqm: 35 },
          ],
        },
      ],
    },
  ],
};

const pvcCommercial: PropertyTypeOption = {
  id: "commercial",
  name: "Commercial",
  patterns: [
    {
      id: "sheet-roll", name: "Sheet / Roll (Hospital Grade)",
      shades: [
        {
          id: "hospital-blue", name: "Hospital Blue", samples: [
            { name: "PVC Hospital Blue Standard", code: "C-PVC-SH-HB-01", pricePerSqm: 45 },
          ],
        },
        {
          id: "hospital-green", name: "Hospital Green", samples: [
            { name: "PVC Hospital Green Standard", code: "C-PVC-SH-HG-01", pricePerSqm: 45 },
          ],
        },
        {
          id: "hospital-grey", name: "Hospital Grey", samples: [
            { name: "PVC Hospital Grey Standard", code: "C-PVC-SH-HGR-01", pricePerSqm: 45 },
          ],
        },
      ],
    },
    {
      id: "homogeneous", name: "Homogeneous PVC (Heavy Duty)",
      shades: [
        {
          id: "hom-grey", name: "Grey", samples: [
            { name: "Homogeneous PVC Grey", code: "C-PVC-HM-GR-01", pricePerSqm: 55 },
          ],
        },
        {
          id: "hom-beige", name: "Beige", samples: [
            { name: "Homogeneous PVC Beige", code: "C-PVC-HM-BG-01", pricePerSqm: 55 },
          ],
        },
      ],
    },
    {
      id: "pvc-tile-commercial", name: "PVC Tile (Commercial Use)",
      shades: [
        {
          id: "com-tile-grey", name: "Grey", samples: [
            { name: "PVC Commercial Tile Grey", code: "C-PVC-TL-GR-01", pricePerSqm: 40 },
          ],
        },
        {
          id: "com-tile-black", name: "Black", samples: [
            { name: "PVC Commercial Tile Black", code: "C-PVC-TL-BK-01", pricePerSqm: 42 },
          ],
        },
      ],
    },
  ],
};

// ─── WPC Flooring ───

const wpcResidential: PropertyTypeOption = {
  id: "residential",
  name: "Residential",
  patterns: [
    {
      id: "straight-plank", name: "Straight Plank",
      shades: [
        {
          id: "light-oak", name: "Light Oak", samples: [
            { name: "WPC Light Oak Natural", code: "R-WPC-SP-LO-01", pricePerSqm: 95, boxCoverage: 2.16 },
            { name: "WPC Light Oak Warm", code: "R-WPC-SP-LO-02", pricePerSqm: 98, boxCoverage: 2.16 },
          ],
        },
        {
          id: "dark-oak", name: "Dark Oak", samples: [
            { name: "WPC Dark Oak Classic", code: "R-WPC-SP-DO-01", pricePerSqm: 100, boxCoverage: 2.16 },
          ],
        },
        {
          id: "walnut", name: "Walnut", samples: [
            { name: "WPC Walnut Brown", code: "R-WPC-SP-WN-01", pricePerSqm: 105, boxCoverage: 2.16 },
          ],
        },
      ],
    },
    {
      id: "herringbone", name: "Herringbone",
      shades: [
        {
          id: "light-oak", name: "Light Oak", samples: [
            { name: "WPC HB Light Oak", code: "R-WPC-HB-LO-01", pricePerSqm: 120, boxCoverage: 1.86 },
          ],
        },
        {
          id: "dark-oak", name: "Dark Oak", samples: [
            { name: "WPC HB Dark Oak", code: "R-WPC-HB-DO-01", pricePerSqm: 125, boxCoverage: 1.86 },
          ],
        },
      ],
    },
    {
      id: "chevron", name: "Chevron (Limited)",
      shades: [
        {
          id: "light-oak", name: "Light Oak", samples: [
            { name: "WPC Chevron Light Oak", code: "R-WPC-CH-LO-01", pricePerSqm: 128, boxCoverage: 1.86 },
          ],
        },
      ],
    },
  ],
};

const wpcCommercial: PropertyTypeOption = {
  id: "commercial",
  name: "Commercial",
  patterns: [
    {
      id: "straight-plank", name: "Straight Plank (Heavy Core)",
      shades: [
        {
          id: "corporate-oak", name: "Corporate Oak", samples: [
            { name: "WPC Corporate Oak HD", code: "C-WPC-SP-CO-01", pricePerSqm: 88, boxCoverage: 2.16 },
          ],
        },
        {
          id: "industrial-grey", name: "Industrial Grey", samples: [
            { name: "WPC Industrial Grey HD", code: "C-WPC-SP-IG-01", pricePerSqm: 85, boxCoverage: 2.16 },
          ],
        },
      ],
    },
    {
      id: "herringbone", name: "Herringbone (Limited)",
      shades: [
        {
          id: "corporate-oak", name: "Corporate Oak", samples: [
            { name: "WPC Corporate Oak HB", code: "C-WPC-HB-CO-01", pricePerSqm: 110, boxCoverage: 1.86 },
          ],
        },
      ],
    },
  ],
};

// ─── Vinyl Sheet ───

const vinylResidential: PropertyTypeOption = {
  id: "residential",
  name: "Residential",
  patterns: [
    {
      id: "wood-print", name: "Wood Print Series",
      shades: [
        {
          id: "light-oak", name: "Light Oak", samples: [
            { name: "Vinyl Sheet Light Oak", code: "R-VS-WP-LO-01", pricePerSqm: 28 },
            { name: "Vinyl Sheet Light Oak Warm", code: "R-VS-WP-LO-02", pricePerSqm: 30 },
          ],
        },
        {
          id: "dark-oak", name: "Dark Oak", samples: [
            { name: "Vinyl Sheet Dark Oak", code: "R-VS-WP-DO-01", pricePerSqm: 30 },
          ],
        },
        {
          id: "grey-wood", name: "Grey Wood", samples: [
            { name: "Vinyl Sheet Grey Wood", code: "R-VS-WP-GW-01", pricePerSqm: 28 },
          ],
        },
      ],
    },
    {
      id: "marble-print", name: "Marble Print Series",
      shades: [
        {
          id: "white-marble", name: "White Marble", samples: [
            { name: "Vinyl Sheet White Marble", code: "R-VS-MP-WM-01", pricePerSqm: 32 },
          ],
        },
        {
          id: "grey-marble", name: "Grey Marble", samples: [
            { name: "Vinyl Sheet Grey Marble", code: "R-VS-MP-GM-01", pricePerSqm: 32 },
          ],
        },
      ],
    },
    {
      id: "plain-colour", name: "Plain Colour Series",
      shades: [
        {
          id: "beige", name: "Beige", samples: [
            { name: "Vinyl Sheet Plain Beige", code: "R-VS-PC-BG-01", pricePerSqm: 25 },
          ],
        },
        {
          id: "grey", name: "Grey", samples: [
            { name: "Vinyl Sheet Plain Grey", code: "R-VS-PC-GR-01", pricePerSqm: 25 },
          ],
        },
        {
          id: "white", name: "White", samples: [
            { name: "Vinyl Sheet Plain White", code: "R-VS-PC-WH-01", pricePerSqm: 25 },
          ],
        },
      ],
    },
  ],
};

const vinylCommercial: PropertyTypeOption = {
  id: "commercial",
  name: "Commercial",
  patterns: [
    {
      id: "homogeneous-sheet", name: "Homogeneous Sheet (Heavy Duty)",
      shades: [
        {
          id: "hom-grey", name: "Grey", samples: [
            { name: "Vinyl Homogeneous Grey", code: "C-VS-HM-GR-01", pricePerSqm: 48 },
          ],
        },
        {
          id: "hom-beige", name: "Beige", samples: [
            { name: "Vinyl Homogeneous Beige", code: "C-VS-HM-BG-01", pricePerSqm: 48 },
          ],
        },
        {
          id: "hom-blue", name: "Blue", samples: [
            { name: "Vinyl Homogeneous Blue", code: "C-VS-HM-BL-01", pricePerSqm: 50 },
          ],
        },
      ],
    },
    {
      id: "heterogeneous-sheet", name: "Heterogeneous Sheet",
      shades: [
        {
          id: "het-wood-look", name: "Wood Look", samples: [
            { name: "Vinyl Heterogeneous Wood", code: "C-VS-HT-WD-01", pricePerSqm: 42 },
          ],
        },
        {
          id: "het-stone-look", name: "Stone Look", samples: [
            { name: "Vinyl Heterogeneous Stone", code: "C-VS-HT-ST-01", pricePerSqm: 44 },
          ],
        },
      ],
    },
    {
      id: "safety-anti-slip", name: "Safety / Anti-Slip Series",
      shades: [
        {
          id: "safety-grey", name: "Grey", samples: [
            { name: "Vinyl Safety Grey", code: "C-VS-SF-GR-01", pricePerSqm: 55 },
          ],
        },
        {
          id: "safety-beige", name: "Beige", samples: [
            { name: "Vinyl Safety Beige", code: "C-VS-SF-BG-01", pricePerSqm: 55 },
          ],
        },
        {
          id: "safety-blue", name: "Blue", samples: [
            { name: "Vinyl Safety Blue", code: "C-VS-SF-BL-01", pricePerSqm: 58 },
          ],
        },
      ],
    },
  ],
};

// ─── Full Catalog ───

export const flooringCatalog: FlooringTypeOption[] = [
  {
    id: "spc",
    name: "SPC",
    propertyTypes: [spcResidential, spcCommercial],
  },
  {
    id: "lvt",
    name: "LVT",
    propertyTypes: [lvtResidential, lvtCommercial],
  },
  {
    id: "pvc",
    name: "PVC Flooring",
    propertyTypes: [pvcResidential, pvcCommercial],
  },
  {
    id: "wpc",
    name: "WPC Flooring",
    propertyTypes: [wpcResidential, wpcCommercial],
  },
  {
    id: "vinyl-sheet",
    name: "Vinyl Sheet",
    propertyTypes: [vinylResidential, vinylCommercial],
  },
];

// Industrial placeholder for all types
export const industrialPlaceholder: PropertyTypeOption = {
  id: "industrial",
  name: "Industrial",
  patterns: [],
};
