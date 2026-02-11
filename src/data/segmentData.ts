import shadeSpc from "@/assets/shade-spc.jpg";
import shadeLvt from "@/assets/shade-lvt.jpg";
import shadeLaminate from "@/assets/shade-laminate.jpg";
import shadeCeramicTiles from "@/assets/shade-ceramic-tiles.jpg";
import shadePorcelainTiles from "@/assets/shade-porcelain-tiles.jpg";
import shadeVitrifiedTiles from "@/assets/shade-vitrified-tiles.jpg";
import shadeCarpetTiles from "@/assets/shade-carpet-tiles.jpg";
import typeResin from "@/assets/type-resin.jpg";
import typeRubber from "@/assets/type-rubber.jpg";
import typeStone from "@/assets/type-stone.jpg";

import spaceResidential from "@/assets/space-residential.jpg";
import spaceCommercial from "@/assets/space-commercial.jpg";
import spaceIndustrial from "@/assets/space-industrial.jpg";

// ─── Shade images used across flooring types ───
import shadeEngineeredWood from "@/assets/shade-engineered-wood.jpg";
import shadeParquet from "@/assets/shade-parquet.jpg";
import shadeSolidHardwood from "@/assets/shade-solid-hardwood.jpg";
import shadePvc from "@/assets/shade-pvc.jpg";
import shadeVinylSheets from "@/assets/shade-vinyl-sheets.jpg";
import shadeWpc from "@/assets/shade-wpc.jpg";
import shadeCementTiles from "@/assets/shade-cement-tiles.jpg";
import shadeMosaicTiles from "@/assets/shade-mosaic-tiles.jpg";
import shadeTerrazzo from "@/assets/shade-terrazzo-tiles.jpg";
import shadeAreaRugs from "@/assets/shade-area-rugs.jpg";
import shadeWallCarpet from "@/assets/shade-wall-carpet.jpg";
import shadeOutdoorTiles from "@/assets/shade-outdoor-tiles.jpg";
import shadeStonePavers from "@/assets/shade-stone-pavers.jpg";
import shadeTimberDecking from "@/assets/shade-timber-decking.jpg";
import shadeWpcDecking from "@/assets/shade-wpc-decking.jpg";
import shadeGranite from "@/assets/shade-granite.jpg";
import shadeLimestone from "@/assets/shade-limestone.jpg";
import shadeMarble from "@/assets/shade-marble.jpg";
import shadeSandstone from "@/assets/shade-sandstone.jpg";
import shadeSlate from "@/assets/shade-slate.jpg";

export interface FlooringShade {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface FlooringType {
  id: string;
  name: string;
  isPopular: boolean;
  image: string;
  priceRange: string; // e.g. "85–190"
  calculatorId?: string; // maps to calculator categoryId
  shades: FlooringShade[];
}

export interface Segment {
  id: string;
  name: string;
  image: string;
  flooringTypes: FlooringType[];
}

// ─── Shade definitions for each flooring type ───

const spcShades: FlooringShade[] = [
  { id: "spc-oak", name: "Oak Finish", description: "Warm natural oak look", image: shadeSpc },
  { id: "spc-walnut", name: "Walnut Finish", description: "Rich dark tones", image: shadeEngineeredWood },
  { id: "spc-grey", name: "Grey Stone", description: "Modern cool tones", image: shadeSlate },
  { id: "spc-light", name: "Light Maple", description: "Bright airy finish", image: shadeLaminate },
];

const lvtShades: FlooringShade[] = [
  { id: "lvt-marble", name: "Marble Effect", description: "Elegant marble look", image: shadeLvt },
  { id: "lvt-concrete", name: "Concrete Look", description: "Industrial modern", image: shadePorcelainTiles },
  { id: "lvt-wood", name: "Wood Grain", description: "Classic timber finish", image: shadeWpc },
  { id: "lvt-rustic", name: "Rustic Oak", description: "Characterful grain", image: shadeParquet },
];

const laminateShades: FlooringShade[] = [
  { id: "lam-oak", name: "Classic Oak", description: "Timeless wood look", image: shadeLaminate },
  { id: "lam-grey", name: "Ash Grey", description: "Contemporary grey", image: shadeSlate },
  { id: "lam-walnut", name: "Dark Walnut", description: "Deep warm tones", image: shadeEngineeredWood },
  { id: "lam-chevron", name: "Chevron Pattern", description: "Designer chevron", image: shadeParquet },
];

const ceramicPorcelainShades: FlooringShade[] = [
  { id: "cp-marble", name: "Marble Veining", description: "Luxurious marble effect", image: shadeCeramicTiles },
  { id: "cp-wood", name: "Wood Look", description: "Warm wood-effect tiles", image: shadePorcelainTiles },
  { id: "cp-cement", name: "Cement Look", description: "Industrial charm", image: shadeCementTiles },
  { id: "cp-mosaic", name: "Mosaic Pattern", description: "Decorative small format", image: shadeMosaicTiles },
];

const porcelainVitrifiedShades: FlooringShade[] = [
  { id: "pv-gloss", name: "High Gloss White", description: "Bright reflective finish", image: shadeVitrifiedTiles },
  { id: "pv-matt", name: "Matte Stone", description: "Subtle natural tones", image: shadePorcelainTiles },
  { id: "pv-dark", name: "Dark Basalt", description: "Bold contemporary", image: shadeSlate },
  { id: "pv-terrazzo", name: "Terrazzo Look", description: "Speckled aggregate", image: shadeTerrazzo },
];

const carpetTileShades: FlooringShade[] = [
  { id: "ct-grey", name: "Charcoal Grey", description: "Professional modern", image: shadeCarpetTiles },
  { id: "ct-blue", name: "Ocean Blue", description: "Calming office tones", image: shadeCarpetTiles },
  { id: "ct-beige", name: "Sand Beige", description: "Warm neutral", image: shadeAreaRugs },
  { id: "ct-stripe", name: "Striped Pattern", description: "Linear design", image: shadeWallCarpet },
];

const epoxyShades: FlooringShade[] = [
  { id: "ep-grey", name: "Industrial Grey", description: "Classic industrial", image: typeResin },
  { id: "ep-flake", name: "Decorative Flake", description: "Multi-color chips", image: typeRubber },
  { id: "ep-metallic", name: "Metallic Swirl", description: "Unique metallic effect", image: typeStone },
  { id: "ep-clear", name: "Clear Coat", description: "Transparent finish", image: shadePorcelainTiles },
];

const puFlooringShades: FlooringShade[] = [
  { id: "pu-beige", name: "Beige Satin", description: "Food-grade finish", image: shadeSandstone },
  { id: "pu-grey", name: "Steel Grey", description: "Heavy-duty grey", image: shadeSlate },
  { id: "pu-tan", name: "Tan Brown", description: "Warm industrial", image: shadeLimestone },
  { id: "pu-cream", name: "Cream White", description: "Clean bright finish", image: shadeMarble },
];

const selfLevelingShades: FlooringShade[] = [
  { id: "sl-white", name: "Pure White", description: "Ultra-clean surface", image: shadeMarble },
  { id: "sl-grey", name: "Concrete Grey", description: "Seamless grey", image: typeResin },
  { id: "sl-sand", name: "Sand Tone", description: "Warm neutral", image: shadeSandstone },
  { id: "sl-dark", name: "Dark Charcoal", description: "Statement dark floor", image: shadeSlate },
];

const polishedConcreteShades: FlooringShade[] = [
  { id: "pc-natural", name: "Natural Concrete", description: "Raw industrial look", image: typeResin },
  { id: "pc-salt", name: "Salt & Pepper", description: "Exposed aggregate", image: shadeGranite },
  { id: "pc-cream", name: "Cream Polish", description: "Warm polished tone", image: shadeLimestone },
  { id: "pc-dark", name: "Charcoal Polish", description: "Dark modern finish", image: shadeSlate },
];

const spcLvtCombinedShades: FlooringShade[] = [
  ...spcShades.slice(0, 2),
  ...lvtShades.slice(0, 2),
];

const epoxyPuShades: FlooringShade[] = [
  ...epoxyShades.slice(0, 2),
  ...puFlooringShades.slice(0, 2),
];

// ─── Space-specific flooring types ───

export interface SpaceConfig {
  id: string;
  name: string;
  flooringTypes: FlooringType[];
}

export const spaceFlooringTypes: SpaceConfig[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    flooringTypes: [
      { id: "kitchen-ceramic", name: "Ceramic / Porcelain Tiles", isPopular: true, image: shadeCeramicTiles, priceRange: "35–160", calculatorId: "tile", shades: ceramicPorcelainShades },
      { id: "kitchen-spc", name: "SPC Flooring", isPopular: false, image: shadeSpc, priceRange: "85–190", calculatorId: "vinyl", shades: spcShades },
      { id: "kitchen-lvt", name: "Luxury Vinyl Tiles", isPopular: false, image: shadeLvt, priceRange: "75–180", calculatorId: "vinyl", shades: lvtShades },
      { id: "kitchen-stone", name: "Natural Stone", isPopular: false, image: shadeGranite, priceRange: "140–500", calculatorId: "stone", shades: [
        { id: "ks-granite", name: "Granite", description: "Ultra durable", image: shadeGranite },
        { id: "ks-marble", name: "Marble", description: "Luxury veined", image: shadeMarble },
        { id: "ks-limestone", name: "Limestone", description: "Warm elegance", image: shadeLimestone },
        { id: "ks-slate", name: "Slate", description: "Rustic texture", image: shadeSlate },
      ]},
    ],
  },
  {
    id: "stairs",
    name: "Stairs",
    flooringTypes: [
      { id: "stairs-wood", name: "Engineered Wood", isPopular: true, image: shadeEngineeredWood, priceRange: "95–450", calculatorId: "wood", shades: [
        { id: "sw-oak", name: "Oak Plank", description: "Classic warmth", image: shadeEngineeredWood },
        { id: "sw-walnut", name: "Walnut", description: "Rich dark tones", image: shadeSolidHardwood },
        { id: "sw-ash", name: "Ash Grey", description: "Modern neutral", image: shadeLaminate },
        { id: "sw-teak", name: "Teak", description: "Golden warmth", image: shadeParquet },
      ]},
      { id: "stairs-spc", name: "SPC Flooring", isPopular: false, image: shadeSpc, priceRange: "85–190", calculatorId: "vinyl", shades: spcShades },
      { id: "stairs-stone", name: "Natural Stone", isPopular: false, image: shadeMarble, priceRange: "140–500", calculatorId: "stone", shades: [
        { id: "ss-marble", name: "Marble", description: "Luxury treads", image: shadeMarble },
        { id: "ss-granite", name: "Granite", description: "Hard wearing", image: shadeGranite },
        { id: "ss-limestone", name: "Limestone", description: "Soft elegance", image: shadeLimestone },
        { id: "ss-sandstone", name: "Sandstone", description: "Earthy tones", image: shadeSandstone },
      ]},
      { id: "stairs-carpet", name: "Carpet Runner", isPopular: false, image: shadeWallCarpet, priceRange: "60–140", calculatorId: "carpet", shades: [
        { id: "sc-wool", name: "Wool Runner", description: "Premium natural fibre", image: shadeWallCarpet },
        { id: "sc-nylon", name: "Nylon Pattern", description: "Durable patterned", image: shadeCarpetTiles },
        { id: "sc-sisal", name: "Sisal Natural", description: "Eco-friendly weave", image: shadeAreaRugs },
        { id: "sc-stripe", name: "Stripe Design", description: "Classic stripes", image: shadeCarpetTiles },
      ]},
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    flooringTypes: [
      { id: "bath-porcelain", name: "Porcelain Tiles", isPopular: true, image: shadePorcelainTiles, priceRange: "55–160", calculatorId: "tile", shades: [
        { id: "bp-marble", name: "Marble Look", description: "Elegant veining", image: shadePorcelainTiles },
        { id: "bp-mosaic", name: "Mosaic", description: "Small-format beauty", image: shadeMosaicTiles },
        { id: "bp-wood", name: "Wood Look", description: "Warm waterproof", image: shadeCeramicTiles },
        { id: "bp-stone", name: "Stone Look", description: "Natural texture", image: shadeStonePavers },
      ]},
      { id: "bath-spc", name: "SPC Flooring", isPopular: false, image: shadeSpc, priceRange: "85–190", calculatorId: "vinyl", shades: spcShades },
      { id: "bath-stone", name: "Natural Stone", isPopular: false, image: shadeMarble, priceRange: "140–500", calculatorId: "stone", shades: [
        { id: "bs-marble", name: "Marble", description: "Spa luxury", image: shadeMarble },
        { id: "bs-limestone", name: "Limestone", description: "Soft texture", image: shadeLimestone },
        { id: "bs-slate", name: "Slate", description: "Anti-slip natural", image: shadeSlate },
        { id: "bs-travertine", name: "Travertine", description: "Mediterranean feel", image: shadeSandstone },
      ]},
      { id: "bath-lvt", name: "LVT Waterproof", isPopular: false, image: shadeLvt, priceRange: "75–180", calculatorId: "vinyl", shades: lvtShades },
    ],
  },
];

// ─── Main segments ───

export const segments: Segment[] = [
  {
    id: "residential",
    name: "Residential",
    image: spaceResidential,
    flooringTypes: [
      {
        id: "res-spc",
        name: "SPC Flooring",
        isPopular: true,
        image: shadeSpc,
        priceRange: "85–190",
        calculatorId: "vinyl",
        shades: spcShades,
      },
      {
        id: "res-lvt",
        name: "Luxury Vinyl Tiles (LVT)",
        isPopular: false,
        image: shadeLvt,
        priceRange: "75–180",
        calculatorId: "vinyl",
        shades: lvtShades,
      },
      {
        id: "res-laminate",
        name: "Laminate Flooring",
        isPopular: false,
        image: shadeLaminate,
        priceRange: "55–130",
        calculatorId: "wood",
        shades: laminateShades,
      },
      {
        id: "res-ceramic",
        name: "Ceramic / Porcelain Tiles",
        isPopular: false,
        image: shadeCeramicTiles,
        priceRange: "35–160",
        calculatorId: "tile",
        shades: ceramicPorcelainShades,
      },
    ],
  },
  {
    id: "commercial",
    name: "Commercial",
    image: spaceCommercial,
    flooringTypes: [
      {
        id: "com-spc-lvt",
        name: "SPC / LVT",
        isPopular: true,
        image: shadeSpc,
        priceRange: "75–190",
        calculatorId: "vinyl",
        shades: spcLvtCombinedShades,
      },
      {
        id: "com-porcelain",
        name: "Porcelain / Vitrified Tiles",
        isPopular: false,
        image: shadeVitrifiedTiles,
        priceRange: "55–180",
        calculatorId: "tile",
        shades: porcelainVitrifiedShades,
      },
      {
        id: "com-carpet",
        name: "Carpet Tiles",
        isPopular: false,
        image: shadeCarpetTiles,
        priceRange: "60–140",
        calculatorId: "carpet",
        shades: carpetTileShades,
      },
      {
        id: "com-epoxy",
        name: "Epoxy / PU Flooring",
        isPopular: false,
        image: typeResin,
        priceRange: "65–190",
        calculatorId: "resin",
        shades: epoxyPuShades,
      },
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    image: spaceIndustrial,
    flooringTypes: [
      {
        id: "ind-epoxy",
        name: "Epoxy Flooring",
        isPopular: true,
        image: typeResin,
        priceRange: "65–140",
        calculatorId: "resin",
        shades: epoxyShades,
      },
      {
        id: "ind-pu",
        name: "PU Flooring",
        isPopular: false,
        image: typeRubber,
        priceRange: "90–190",
        calculatorId: "resin",
        shades: puFlooringShades,
      },
      {
        id: "ind-self-leveling",
        name: "Self-Leveling Resin",
        isPopular: false,
        image: typeStone,
        priceRange: "110–240",
        calculatorId: "resin",
        shades: selfLevelingShades,
      },
      {
        id: "ind-concrete",
        name: "Polished Concrete",
        isPopular: false,
        image: shadeGranite,
        priceRange: "70–160",
        calculatorId: "concrete",
        shades: polishedConcreteShades,
      },
    ],
  },
];

export const getSegmentById = (id: string) => segments.find((s) => s.id === id);
