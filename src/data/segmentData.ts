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

import typeTile from "@/assets/type-tile.jpg";
import typeWood from "@/assets/type-wood.jpg";
import typeVinyl from "@/assets/type-vinyl.jpg";
import typeCarpet from "@/assets/type-carpet.jpg";
import typeOutdoor from "@/assets/type-outdoor.jpg";

// ─── Types ───

export interface FlooringPattern {
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
  priceRange: string;
  calculatorId?: string;
  patterns: FlooringPattern[];
}

export interface MaterialCategory {
  id: string;
  name: string;
  image: string;
  isPopular?: boolean;
  flooringTypes: FlooringType[];
}

export interface Segment {
  id: string;
  name: string;
  image: string;
  materials: MaterialCategory[];
}

// ─── Pattern definitions ───

const spcPatterns: FlooringPattern[] = [
  { id: "spc-wood-grain", name: "Classic Wood Plank", description: "Natural wood-look planks", image: shadeSpc },
  { id: "spc-herringbone", name: "Herringbone", description: "Timeless angular pattern", image: shadeParquet },
  { id: "spc-wide-plank", name: "Wide Plank", description: "Modern wide-format", image: shadeEngineeredWood },
  { id: "spc-stone-look", name: "Stone Look", description: "Realistic stone effect", image: shadeSlate },
];

const lvtPatterns: FlooringPattern[] = [
  { id: "lvt-marble-effect", name: "Marble Effect", description: "Elegant marble look", image: shadeLvt },
  { id: "lvt-concrete-look", name: "Concrete Look", description: "Industrial modern", image: shadePorcelainTiles },
  { id: "lvt-wood-grain", name: "Wood Grain", description: "Classic timber finish", image: shadeWpc },
  { id: "lvt-chevron", name: "Chevron", description: "Designer V-pattern", image: shadeParquet },
];

const rigidCorePatterns: FlooringPattern[] = [
  { id: "rc-oak-plank", name: "Oak Plank", description: "Sturdy oak-look rigid core", image: shadeSpc },
  { id: "rc-rustic", name: "Rustic Wood", description: "Aged weathered look", image: shadeSolidHardwood },
  { id: "rc-tile-look", name: "Tile Look", description: "Stone-effect rigid", image: shadeCeramicTiles },
];

const glueDownPatterns: FlooringPattern[] = [
  { id: "gd-strip", name: "Strip Pattern", description: "Narrow plank strips", image: shadeLvt },
  { id: "gd-parquet", name: "Parquet Style", description: "Geometric wood blocks", image: shadeParquet },
  { id: "gd-fabric-look", name: "Fabric Look", description: "Woven textile effect", image: shadeCarpetTiles },
];

const clickLockPatterns: FlooringPattern[] = [
  { id: "cl-wide-plank", name: "Wide Plank", description: "Easy-install wide format", image: shadeEngineeredWood },
  { id: "cl-chevron", name: "Chevron", description: "Click-lock chevron", image: shadeParquet },
  { id: "cl-stone", name: "Stone Effect", description: "Natural stone look", image: shadeStonePavers },
];

const engineeredWoodPatterns: FlooringPattern[] = [
  { id: "ew-herringbone", name: "Herringbone", description: "Classic herringbone in wood", image: shadeParquet },
  { id: "ew-wide-plank", name: "Wide Plank", description: "Contemporary wide boards", image: shadeEngineeredWood },
  { id: "ew-chevron", name: "Chevron", description: "Angled V pattern", image: shadeParquet },
  { id: "ew-plank", name: "Standard Plank", description: "Traditional straight plank", image: shadeSolidHardwood },
];

const laminatePatterns: FlooringPattern[] = [
  { id: "lam-oak-plank", name: "Classic Oak Plank", description: "Timeless oak look", image: shadeLaminate },
  { id: "lam-herringbone", name: "Herringbone", description: "Designer herringbone", image: shadeParquet },
  { id: "lam-rustic", name: "Rustic Wood", description: "Weathered character", image: shadeSolidHardwood },
  { id: "lam-chevron", name: "Chevron Pattern", description: "V-shape chevron", image: shadeParquet },
];

const solidHardwoodPatterns: FlooringPattern[] = [
  { id: "sh-plank", name: "Traditional Plank", description: "Classic solid planks", image: shadeSolidHardwood },
  { id: "sh-parquet", name: "Parquet", description: "Geometric block pattern", image: shadeParquet },
  { id: "sh-wide-board", name: "Wide Board", description: "Premium wide format", image: shadeEngineeredWood },
];

const parquetPatterns: FlooringPattern[] = [
  { id: "pq-herringbone", name: "Herringbone", description: "Iconic angular design", image: shadeParquet },
  { id: "pq-chevron", name: "Chevron", description: "Angled V-shape", image: shadeParquet },
  { id: "pq-basket-weave", name: "Basket Weave", description: "Interlocking weave", image: shadeEngineeredWood },
  { id: "pq-versailles", name: "Versailles", description: "Royal geometric panel", image: shadeSolidHardwood },
];

const ceramicPatterns: FlooringPattern[] = [
  { id: "cer-marble-vein", name: "Marble Veining", description: "Luxurious marble effect", image: shadeCeramicTiles },
  { id: "cer-wood-look", name: "Wood Look", description: "Warm wood-effect tiles", image: shadePorcelainTiles },
  { id: "cer-cement", name: "Cement Look", description: "Industrial charm", image: shadeCementTiles },
  { id: "cer-mosaic", name: "Mosaic Pattern", description: "Decorative small format", image: shadeMosaicTiles },
];

const porcelainPatterns: FlooringPattern[] = [
  { id: "por-high-gloss", name: "High Gloss", description: "Bright reflective finish", image: shadeVitrifiedTiles },
  { id: "por-matte-stone", name: "Matte Stone", description: "Subtle natural tones", image: shadePorcelainTiles },
  { id: "por-terrazzo", name: "Terrazzo Look", description: "Speckled aggregate", image: shadeTerrazzo },
  { id: "por-marble", name: "Marble Look", description: "Premium marble effect", image: shadeMarble },
];

const mosaicPatterns: FlooringPattern[] = [
  { id: "mos-geometric", name: "Geometric", description: "Bold geometric shapes", image: shadeMosaicTiles },
  { id: "mos-hexagon", name: "Hexagon", description: "Modern hex layout", image: shadeMosaicTiles },
  { id: "mos-random", name: "Random Mix", description: "Artistic random pattern", image: shadeCementTiles },
];

const carpetTilePatterns: FlooringPattern[] = [
  { id: "ct-linear", name: "Linear Stripe", description: "Clean parallel lines", image: shadeCarpetTiles },
  { id: "ct-loop-pile", name: "Loop Pile", description: "Textured loop finish", image: shadeWallCarpet },
  { id: "ct-plush", name: "Plush Cut", description: "Soft dense pile", image: shadeAreaRugs },
];

const wallToWallPatterns: FlooringPattern[] = [
  { id: "ww-plain", name: "Plain Weave", description: "Uniform solid finish", image: shadeWallCarpet },
  { id: "ww-textured", name: "Textured Loop", description: "Multi-level loop", image: shadeCarpetTiles },
  { id: "ww-patterned", name: "Patterned", description: "Decorative repeat pattern", image: shadeAreaRugs },
];

const areaRugPatterns: FlooringPattern[] = [
  { id: "ar-persian", name: "Persian", description: "Traditional ornate design", image: shadeAreaRugs },
  { id: "ar-modern", name: "Modern Abstract", description: "Contemporary art rug", image: shadeCarpetTiles },
  { id: "ar-natural", name: "Natural Fibre", description: "Jute, sisal, seagrass", image: shadeWallCarpet },
];

const outdoorTilePatterns: FlooringPattern[] = [
  { id: "ot-stone-look", name: "Stone Look", description: "Natural stone effect", image: shadeOutdoorTiles },
  { id: "ot-wood-look", name: "Wood Look", description: "Outdoor wood plank", image: shadeTimberDecking },
  { id: "ot-geometric", name: "Geometric", description: "Bold outdoor pattern", image: shadeStonePavers },
];

const timberDeckingPatterns: FlooringPattern[] = [
  { id: "td-straight", name: "Straight Plank", description: "Classic deck boards", image: shadeTimberDecking },
  { id: "td-herringbone", name: "Herringbone Deck", description: "Angular deck layout", image: shadeTimberDecking },
  { id: "td-diagonal", name: "Diagonal", description: "Angled board pattern", image: shadeWpcDecking },
];

const wpcDeckingPatterns: FlooringPattern[] = [
  { id: "wpc-plank", name: "Standard Plank", description: "Composite deck boards", image: shadeWpcDecking },
  { id: "wpc-wide", name: "Wide Plank", description: "Modern wide composite", image: shadeWpcDecking },
  { id: "wpc-grooved", name: "Grooved Surface", description: "Anti-slip grooved", image: shadeWpcDecking },
];

const stonePaverPatterns: FlooringPattern[] = [
  { id: "sp-random", name: "Random Ashlar", description: "Mixed-size layout", image: shadeStonePavers },
  { id: "sp-stacked", name: "Stacked Bond", description: "Aligned grid pattern", image: shadeGranite },
  { id: "sp-herringbone", name: "Herringbone", description: "Classic angled pavers", image: shadeStonePavers },
];

// ─── Material categories with flooring types ───

const spcLvtMaterial: MaterialCategory = {
  id: "spc-lvt",
  name: "SPC / LVT",
  image: typeVinyl,
  isPopular: true,
  flooringTypes: [
    { id: "ft-spc", name: "SPC Vinyl", isPopular: true, image: shadeSpc, priceRange: "85–190", calculatorId: "vinyl", patterns: spcPatterns },
    { id: "ft-lvt", name: "LVT Vinyl", isPopular: false, image: shadeLvt, priceRange: "75–180", calculatorId: "vinyl", patterns: lvtPatterns },
    { id: "ft-rigid-core", name: "Rigid Core Vinyl", isPopular: false, image: shadePvc, priceRange: "90–200", calculatorId: "vinyl", patterns: rigidCorePatterns },
    { id: "ft-glue-down", name: "Glue Down Vinyl", isPopular: false, image: shadeVinylSheets, priceRange: "65–150", calculatorId: "vinyl", patterns: glueDownPatterns },
    { id: "ft-click-lock", name: "Click Lock Vinyl", isPopular: false, image: shadeWpc, priceRange: "80–170", calculatorId: "vinyl", patterns: clickLockPatterns },
  ],
};

const woodenMaterial: MaterialCategory = {
  id: "wooden",
  name: "Wooden",
  image: typeWood,
  flooringTypes: [
    { id: "ft-engineered", name: "Engineered Wood", isPopular: true, image: shadeEngineeredWood, priceRange: "95–450", calculatorId: "wood", patterns: engineeredWoodPatterns },
    { id: "ft-laminate", name: "Laminate", isPopular: false, image: shadeLaminate, priceRange: "55–130", calculatorId: "wood", patterns: laminatePatterns },
    { id: "ft-solid-hardwood", name: "Solid Hardwood", isPopular: false, image: shadeSolidHardwood, priceRange: "180–600", calculatorId: "wood", patterns: solidHardwoodPatterns },
    { id: "ft-parquet", name: "Parquet", isPopular: false, image: shadeParquet, priceRange: "120–350", calculatorId: "wood", patterns: parquetPatterns },
  ],
};

const tilesMaterial: MaterialCategory = {
  id: "tiles",
  name: "Tiles",
  image: typeTile,
  flooringTypes: [
    { id: "ft-ceramic", name: "Ceramic Tiles", isPopular: false, image: shadeCeramicTiles, priceRange: "35–90", calculatorId: "tile", patterns: ceramicPatterns },
    { id: "ft-porcelain", name: "Porcelain Tiles", isPopular: true, image: shadePorcelainTiles, priceRange: "55–160", calculatorId: "tile", patterns: porcelainPatterns },
    { id: "ft-vitrified", name: "Vitrified Tiles", isPopular: false, image: shadeVitrifiedTiles, priceRange: "50–140", calculatorId: "tile", patterns: porcelainPatterns },
    { id: "ft-mosaic", name: "Mosaic Tiles", isPopular: false, image: shadeMosaicTiles, priceRange: "80–250", calculatorId: "tile", patterns: mosaicPatterns },
    { id: "ft-terrazzo", name: "Terrazzo Tiles", isPopular: false, image: shadeTerrazzo, priceRange: "90–220", calculatorId: "tile", patterns: ceramicPatterns },
  ],
};

const carpetMaterial: MaterialCategory = {
  id: "carpet",
  name: "Carpet",
  image: typeCarpet,
  flooringTypes: [
    { id: "ft-carpet-tiles", name: "Carpet Tiles", isPopular: true, image: shadeCarpetTiles, priceRange: "60–140", calculatorId: "carpet", patterns: carpetTilePatterns },
    { id: "ft-wall-to-wall", name: "Wall-to-Wall Carpet", isPopular: false, image: shadeWallCarpet, priceRange: "45–120", calculatorId: "carpet", patterns: wallToWallPatterns },
    { id: "ft-area-rugs", name: "Area Rugs", isPopular: false, image: shadeAreaRugs, priceRange: "50–300", calculatorId: "carpet", patterns: areaRugPatterns },
  ],
};

const outdoorMaterial: MaterialCategory = {
  id: "outdoor",
  name: "Outdoor",
  image: typeOutdoor,
  flooringTypes: [
    { id: "ft-outdoor-tiles", name: "Outdoor Tiles", isPopular: true, image: shadeOutdoorTiles, priceRange: "45–120", calculatorId: "outdoor", patterns: outdoorTilePatterns },
    { id: "ft-timber-decking", name: "Timber Decking", isPopular: false, image: shadeTimberDecking, priceRange: "120–350", calculatorId: "outdoor", patterns: timberDeckingPatterns },
    { id: "ft-wpc-decking", name: "WPC Decking", isPopular: false, image: shadeWpcDecking, priceRange: "90–250", calculatorId: "outdoor", patterns: wpcDeckingPatterns },
    { id: "ft-stone-pavers", name: "Stone Pavers", isPopular: false, image: shadeStonePavers, priceRange: "80–300", calculatorId: "outdoor", patterns: stonePaverPatterns },
  ],
};

// ─── Segments ───

export const segments: Segment[] = [
  {
    id: "residential",
    name: "Residential",
    image: spaceResidential,
    materials: [spcLvtMaterial, woodenMaterial, tilesMaterial, carpetMaterial, outdoorMaterial],
  },
  {
    id: "commercial",
    name: "Commercial",
    image: spaceCommercial,
    materials: [spcLvtMaterial, tilesMaterial, carpetMaterial, woodenMaterial, outdoorMaterial],
  },
  {
    id: "industrial",
    name: "Industrial",
    image: spaceIndustrial,
    materials: [spcLvtMaterial, tilesMaterial, outdoorMaterial, woodenMaterial, carpetMaterial],
  },
];

export const getSegmentById = (id: string) => segments.find((s) => s.id === id);

// ─── Shade-to-Pattern mapping for calculator ───

const shadePatternMap: Record<string, FlooringPattern[]> = {
  // Vinyl / SPC / LVT
  "spc": spcPatterns,
  "lvt": lvtPatterns,
  "pvc": rigidCorePatterns,
  "vinyl-sheets": glueDownPatterns,
  "wpc": clickLockPatterns,
  // Wooden
  "engineered-wood": engineeredWoodPatterns,
  "laminate": laminatePatterns,
  "parquet": parquetPatterns,
  "solid-hardwood": solidHardwoodPatterns,
  // Tiles
  "ceramic-tiles": ceramicPatterns,
  "porcelain-tiles": porcelainPatterns,
  "vitrified-tiles": porcelainPatterns,
  "mosaic-tiles": mosaicPatterns,
  "terrazzo-tiles": ceramicPatterns,
  "cement-tiles": ceramicPatterns,
  // Carpet
  "carpet-tiles": carpetTilePatterns,
  "wall-to-wall": wallToWallPatterns,
  "area-rugs": areaRugPatterns,
  // Outdoor
  "outdoor-tiles": outdoorTilePatterns,
  "timber-decking": timberDeckingPatterns,
  "wpc-decking": wpcDeckingPatterns,
  "stone-pavers": stonePaverPatterns,
  // Stone
  "granite": stonePaverPatterns,
  "limestone": stonePaverPatterns,
  "marble": porcelainPatterns,
  "sandstone": stonePaverPatterns,
  "slate": stonePaverPatterns,
  "travertine": porcelainPatterns,
};

export const getPatternsByShadeId = (shadeId: string): FlooringPattern[] => {
  return shadePatternMap[shadeId] || [];
};

// ─── Space-specific configs (Kitchen/Stairs/Bathroom) ───

export interface SpaceConfig {
  id: string;
  name: string;
  materials: MaterialCategory[];
}

export const spaceFlooringTypes: SpaceConfig[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    materials: [tilesMaterial, spcLvtMaterial, woodenMaterial],
  },
  {
    id: "stairs",
    name: "Stairs",
    materials: [woodenMaterial, spcLvtMaterial, carpetMaterial],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    materials: [tilesMaterial, spcLvtMaterial, outdoorMaterial],
  },
];
