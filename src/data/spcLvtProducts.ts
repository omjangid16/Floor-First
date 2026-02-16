// ═══════════════════════════════════════════════════
// SPC / LVT Product Catalog — Hierarchical & SKU-driven
// ═══════════════════════════════════════════════════

export interface SpcLvtProduct {
  name: string;
  sku: string;
  pricePerSqm: number;       // AED per sqm
  boxCoverage?: number;       // sqm per box (if applicable)
}

export interface ShadeCategory {
  id: string;
  name: string;
  products: SpcLvtProduct[];
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

export interface ProductTypeOption {
  id: string;
  name: string;
  propertyTypes: PropertyTypeOption[];
}

// ─── Full catalog ───

export const spcLvtCatalog: ProductTypeOption[] = [
  {
    id: "spc",
    name: "SPC",
    propertyTypes: [
      {
        id: "residential",
        name: "Residential",
        patterns: [
          {
            id: "straight-plank",
            name: "Straight Plank",
            shades: [
              {
                id: "light-oak", name: "Light Oak",
                products: [
                  { name: "Light Oak Natural", sku: "R-SPC-SP-LO-01", pricePerSqm: 85, boxCoverage: 2.23 },
                  { name: "Light Oak Classic", sku: "R-SPC-SP-LO-02", pricePerSqm: 90, boxCoverage: 2.23 },
                  { name: "Light Oak Matte", sku: "R-SPC-SP-LO-03", pricePerSqm: 88, boxCoverage: 2.23 },
                ],
              },
              {
                id: "dark-oak", name: "Dark Oak",
                products: [
                  { name: "Dark Oak Premium", sku: "R-SPC-SP-DO-01", pricePerSqm: 95, boxCoverage: 2.23 },
                  { name: "Dark Oak Rustic", sku: "R-SPC-SP-DO-02", pricePerSqm: 92, boxCoverage: 2.23 },
                ],
              },
              {
                id: "grey-wood", name: "Grey Wood",
                products: [
                  { name: "Grey Wood Ash", sku: "R-SPC-SP-GW-01", pricePerSqm: 88, boxCoverage: 2.23 },
                  { name: "Grey Wood Storm", sku: "R-SPC-SP-GW-02", pricePerSqm: 90, boxCoverage: 2.23 },
                ],
              },
              {
                id: "walnut", name: "Walnut",
                products: [
                  { name: "Walnut Classic", sku: "R-SPC-SP-WN-01", pricePerSqm: 98, boxCoverage: 2.23 },
                  { name: "Walnut Deep", sku: "R-SPC-SP-WN-02", pricePerSqm: 102, boxCoverage: 2.23 },
                ],
              },
              {
                id: "ash-white", name: "Ash White",
                products: [
                  { name: "Ash White Pearl", sku: "R-SPC-SP-AW-01", pricePerSqm: 82, boxCoverage: 2.23 },
                  { name: "Ash White Frost", sku: "R-SPC-SP-AW-02", pricePerSqm: 85, boxCoverage: 2.23 },
                ],
              },
            ],
          },
          {
            id: "herringbone",
            name: "Herringbone",
            shades: [
              {
                id: "light-oak", name: "Light Oak",
                products: [
                  { name: "Herringbone Light Oak", sku: "R-SPC-HB-LO-01", pricePerSqm: 110, boxCoverage: 1.86 },
                ],
              },
              {
                id: "dark-oak", name: "Dark Oak",
                products: [
                  { name: "Herringbone Dark Oak", sku: "R-SPC-HB-DO-01", pricePerSqm: 115, boxCoverage: 1.86 },
                ],
              },
              {
                id: "walnut", name: "Walnut",
                products: [
                  { name: "Herringbone Walnut", sku: "R-SPC-HB-WN-01", pricePerSqm: 118, boxCoverage: 1.86 },
                ],
              },
            ],
          },
          {
            id: "chevron",
            name: "Chevron",
            shades: [
              {
                id: "light-oak", name: "Light Oak",
                products: [
                  { name: "Chevron Light Oak", sku: "R-SPC-CV-LO-01", pricePerSqm: 120, boxCoverage: 1.86 },
                ],
              },
              {
                id: "grey-wood", name: "Grey Wood",
                products: [
                  { name: "Chevron Grey Wood", sku: "R-SPC-CV-GW-01", pricePerSqm: 122, boxCoverage: 1.86 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "commercial",
        name: "Commercial",
        patterns: [
          {
            id: "straight-plank",
            name: "Straight Plank",
            shades: [
              {
                id: "corporate-oak", name: "Corporate Oak",
                products: [
                  { name: "Corporate Oak Natural", sku: "C-SPC-SP-CO-01", pricePerSqm: 78, boxCoverage: 2.23 },
                  { name: "Corporate Oak Classic", sku: "C-SPC-SP-CO-02", pricePerSqm: 80, boxCoverage: 2.23 },
                ],
              },
              {
                id: "industrial-grey", name: "Industrial Grey",
                products: [
                  { name: "Industrial Grey Matte", sku: "C-SPC-SP-IG-01", pricePerSqm: 75, boxCoverage: 2.23 },
                  { name: "Industrial Grey Dark", sku: "C-SPC-SP-IG-02", pricePerSqm: 77, boxCoverage: 2.23 },
                ],
              },
              {
                id: "dark-walnut", name: "Dark Walnut",
                products: [
                  { name: "Dark Walnut Office", sku: "C-SPC-SP-DW-01", pricePerSqm: 82, boxCoverage: 2.23 },
                ],
              },
              {
                id: "smoked-wood", name: "Smoked Wood",
                products: [
                  { name: "Smoked Wood Premium", sku: "C-SPC-SP-SW-01", pricePerSqm: 85, boxCoverage: 2.23 },
                ],
              },
            ],
          },
          {
            id: "tile-pattern",
            name: "Tile Pattern",
            shades: [
              {
                id: "corporate-oak", name: "Corporate Oak",
                products: [
                  { name: "Tile Corporate Oak", sku: "C-SPC-TP-CO-01", pricePerSqm: 88, boxCoverage: 2.0 },
                ],
              },
              {
                id: "industrial-grey", name: "Industrial Grey",
                products: [
                  { name: "Tile Industrial Grey", sku: "C-SPC-TP-IG-01", pricePerSqm: 85, boxCoverage: 2.0 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lvt",
    name: "LVT",
    propertyTypes: [
      {
        id: "residential",
        name: "Residential",
        patterns: [
          {
            id: "straight-plank",
            name: "Straight Plank",
            shades: [
              {
                id: "natural-oak", name: "Natural Oak",
                products: [
                  { name: "Natural Oak Classic", sku: "R-LVT-SP-NO-01", pricePerSqm: 72, boxCoverage: 2.51 },
                  { name: "Natural Oak Warm", sku: "R-LVT-SP-NO-02", pricePerSqm: 75, boxCoverage: 2.51 },
                ],
              },
              {
                id: "rustic-oak", name: "Rustic Oak",
                products: [
                  { name: "Rustic Oak Textured", sku: "R-LVT-SP-RO-01", pricePerSqm: 78, boxCoverage: 2.51 },
                ],
              },
              {
                id: "grey-wood", name: "Grey Wood",
                products: [
                  { name: "Grey Wood Soft", sku: "R-LVT-SP-GW-01", pricePerSqm: 70, boxCoverage: 2.51 },
                  { name: "Grey Wood Mist", sku: "R-LVT-SP-GW-02", pricePerSqm: 73, boxCoverage: 2.51 },
                ],
              },
              {
                id: "walnut", name: "Walnut",
                products: [
                  { name: "Walnut Smooth", sku: "R-LVT-SP-WN-01", pricePerSqm: 80, boxCoverage: 2.51 },
                ],
              },
            ],
          },
          {
            id: "herringbone",
            name: "Herringbone",
            shades: [
              {
                id: "natural-oak", name: "Natural Oak",
                products: [
                  { name: "Herringbone Natural Oak", sku: "R-LVT-HB-NO-01", pricePerSqm: 95, boxCoverage: 2.05 },
                ],
              },
              {
                id: "grey-wood", name: "Grey Wood",
                products: [
                  { name: "Herringbone Grey Wood", sku: "R-LVT-HB-GW-01", pricePerSqm: 98, boxCoverage: 2.05 },
                ],
              },
            ],
          },
          {
            id: "tile-format",
            name: "Tile Format",
            shades: [
              {
                id: "natural-oak", name: "Natural Oak",
                products: [
                  { name: "Tile Natural Oak", sku: "R-LVT-TF-NO-01", pricePerSqm: 68, boxCoverage: 2.78 },
                ],
              },
              {
                id: "walnut", name: "Walnut",
                products: [
                  { name: "Tile Walnut", sku: "R-LVT-TF-WN-01", pricePerSqm: 72, boxCoverage: 2.78 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "commercial",
        name: "Commercial",
        patterns: [
          {
            id: "straight-plank",
            name: "Straight Plank",
            shades: [
              {
                id: "corporate-oak", name: "Corporate Oak",
                products: [
                  { name: "Corporate Oak Natural", sku: "C-LVT-SP-CO-01", pricePerSqm: 65, boxCoverage: 2.51 },
                  { name: "Corporate Oak Classic", sku: "C-LVT-SP-CO-02", pricePerSqm: 68, boxCoverage: 2.51 },
                ],
              },
              {
                id: "industrial-grey", name: "Industrial Grey",
                products: [
                  { name: "Industrial Grey Office", sku: "C-LVT-SP-IG-01", pricePerSqm: 62, boxCoverage: 2.51 },
                ],
              },
              {
                id: "dark-walnut", name: "Dark Walnut",
                products: [
                  { name: "Dark Walnut Executive", sku: "C-LVT-SP-DW-01", pricePerSqm: 70, boxCoverage: 2.51 },
                ],
              },
            ],
          },
          {
            id: "tile-format",
            name: "Tile Format",
            shades: [
              {
                id: "corporate-oak", name: "Corporate Oak",
                products: [
                  { name: "Tile Corporate Oak", sku: "C-LVT-TF-CO-01", pricePerSqm: 60, boxCoverage: 2.78 },
                ],
              },
              {
                id: "industrial-grey", name: "Industrial Grey",
                products: [
                  { name: "Tile Industrial Grey", sku: "C-LVT-TF-IG-01", pricePerSqm: 58, boxCoverage: 2.78 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
