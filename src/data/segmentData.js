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

// ─── Pattern definitions ───

const spcPatterns = [{
  id: "spc-straight-plank",
  name: "Straight Plank SPC",
  description: "Classic straight planks",
  image: shadeSpc
}, {
  id: "spc-herringbone",
  name: "Herringbone SPC",
  description: "Timeless angular pattern",
  image: shadeParquet
}, {
  id: "spc-chevron",
  name: "Chevron SPC",
  description: "Angled V-shape pattern",
  image: shadeParquet
}, {
  id: "spc-tile-format",
  name: "Tile Format SPC",
  description: "Stone & marble tile look",
  image: shadeSlate
}];
const lvtPatterns = [{
  id: "lvt-straight-plank",
  name: "Straight Plank LVT",
  description: "Classic timber plank",
  image: shadeLvt
}, {
  id: "lvt-herringbone",
  name: "Herringbone LVT",
  description: "Elegant angular layout",
  image: shadeParquet
}, {
  id: "lvt-chevron",
  name: "Chevron LVT",
  description: "Designer V-pattern",
  image: shadeParquet
}, {
  id: "lvt-tile",
  name: "Tile LVT",
  description: "Stone & marble effect tiles",
  image: shadePorcelainTiles
}, {
  id: "lvt-abstract",
  name: "Abstract / Designer LVT",
  description: "Textile, geometric & metallic",
  image: shadeLvt
}];
const wpcPatterns = [{
  id: "wpc-straight-plank",
  name: "Straight Plank WPC",
  description: "Standard composite plank",
  image: shadeWpc
}, {
  id: "wpc-herringbone",
  name: "Herringbone WPC",
  description: "Angular composite pattern",
  image: shadeParquet
}, {
  id: "wpc-tile-look",
  name: "Tile Look WPC",
  description: "Stone-look composite",
  image: shadeStonePavers
}];
const pvcPatterns = [{
  id: "pvc-wood-tiles",
  name: "PVC Tiles (Wood Look)",
  description: "Wood-look PVC tiles",
  image: shadePvc
}, {
  id: "pvc-stone-tiles",
  name: "PVC Tiles (Stone Look)",
  description: "Stone-look PVC tiles",
  image: shadeSlate
}, {
  id: "pvc-homogeneous",
  name: "Homogeneous PVC",
  description: "Solid through-body color",
  image: shadePvc
}, {
  id: "pvc-heterogeneous",
  name: "Heterogeneous PVC Sheet",
  description: "Multi-layer printed sheet",
  image: shadeVinylSheets
}];
const vinylRollPatterns = [{
  id: "vr-wood-pattern",
  name: "Wood Pattern Roll",
  description: "Wood-grain sheet vinyl",
  image: shadeVinylSheets
}, {
  id: "vr-stone-pattern",
  name: "Stone Pattern Roll",
  description: "Stone-effect sheet vinyl",
  image: shadePorcelainTiles
}, {
  id: "vr-terrazzo",
  name: "Terrazzo Roll",
  description: "Terrazzo-effect sheet",
  image: shadeTerrazzo
}, {
  id: "vr-abstract",
  name: "Abstract / Modern Roll",
  description: "Geometric & fabric looks",
  image: shadeVinylSheets
}];
const engineeredWoodPatterns = [{
  id: "ew-standard-plank",
  name: "Standard Plank",
  description: "Traditional straight plank",
  image: shadeEngineeredWood
}, {
  id: "ew-herringbone",
  name: "Herringbone",
  description: "Classic herringbone in wood",
  image: shadeParquet
}, {
  id: "ew-chevron",
  name: "Chevron",
  description: "Angled V pattern",
  image: shadeParquet
}, {
  id: "ew-wide-plank",
  name: "Wide Plank",
  description: "Contemporary wide boards",
  image: shadeEngineeredWood
}];
const laminatePatterns = [{
  id: "lam-oak-plank",
  name: "Classic Oak Plank",
  description: "Timeless oak look",
  image: shadeLaminate
}, {
  id: "lam-herringbone",
  name: "Herringbone",
  description: "Designer herringbone",
  image: shadeParquet
}, {
  id: "lam-rustic",
  name: "Rustic Wood",
  description: "Weathered character",
  image: shadeSolidHardwood
}, {
  id: "lam-chevron",
  name: "Chevron Pattern",
  description: "V-shape chevron",
  image: shadeParquet
}];
const solidHardwoodPatterns = [{
  id: "sh-strip-plank",
  name: "Strip Plank",
  description: "Classic narrow strips",
  image: shadeSolidHardwood
}, {
  id: "sh-wide-board",
  name: "Wide Board",
  description: "Premium wide format",
  image: shadeEngineeredWood
}, {
  id: "sh-parquet-block",
  name: "Parquet Block",
  description: "Geometric block pattern",
  image: shadeParquet
}];
const parquetPatterns = [{
  id: "pq-herringbone",
  name: "Herringbone",
  description: "Iconic angular design",
  image: shadeParquet
}, {
  id: "pq-chevron",
  name: "Chevron",
  description: "Angled V-shape",
  image: shadeParquet
}, {
  id: "pq-basket-weave",
  name: "Basket Weave",
  description: "Interlocking weave",
  image: shadeEngineeredWood
}, {
  id: "pq-versailles",
  name: "Versailles",
  description: "Royal geometric panel",
  image: shadeSolidHardwood
}];
const bambooPatterns = [{
  id: "bam-natural",
  name: "Natural Bamboo",
  description: "Light natural finish",
  image: shadeEngineeredWood
}, {
  id: "bam-carbonized",
  name: "Carbonized Bamboo",
  description: "Heat-treated dark tone",
  image: shadeSolidHardwood
}, {
  id: "bam-strand-woven",
  name: "Strand Woven",
  description: "Ultra-dense compressed",
  image: shadeEngineeredWood
}, {
  id: "bam-stained",
  name: "Stained Bamboo",
  description: "Custom color stained",
  image: shadeLaminate
}];
const ceramicPatterns = [{
  id: "cer-marble-look",
  name: "Marble Look",
  description: "Luxurious marble effect",
  image: shadeCeramicTiles
}, {
  id: "cer-wood-look",
  name: "Wood Look",
  description: "Warm wood-effect tiles",
  image: shadePorcelainTiles
}, {
  id: "cer-cement-look",
  name: "Cement Look",
  description: "Industrial charm",
  image: shadeCementTiles
}, {
  id: "cer-mosaic",
  name: "Mosaic Pattern",
  description: "Decorative small format",
  image: shadeMosaicTiles
}];
const porcelainPatterns = [{
  id: "por-high-gloss",
  name: "High Gloss",
  description: "Bright reflective finish",
  image: shadeVitrifiedTiles
}, {
  id: "por-matte-stone",
  name: "Matte Stone",
  description: "Subtle natural tones",
  image: shadePorcelainTiles
}, {
  id: "por-terrazzo",
  name: "Terrazzo Look",
  description: "Speckled aggregate",
  image: shadeTerrazzo
}, {
  id: "por-marble",
  name: "Marble Look",
  description: "Premium marble effect",
  image: shadeMarble
}];
const vitrifiedPatterns = [{
  id: "vit-double-charged",
  name: "Double Charged",
  description: "Two-layer vitrified",
  image: shadeVitrifiedTiles
}, {
  id: "vit-full-body",
  name: "Full Body",
  description: "Same color throughout",
  image: shadeVitrifiedTiles
}, {
  id: "vit-soluble-salt",
  name: "Soluble Salt",
  description: "Printed surface design",
  image: shadePorcelainTiles
}, {
  id: "vit-gvt",
  name: "Glazed Vitrified (GVT)",
  description: "HD printed glaze",
  image: shadeVitrifiedTiles
}];
const marbleTilePatterns = [{
  id: "mt-white",
  name: "White Marble",
  description: "Classic white marble",
  image: shadeMarble
}, {
  id: "mt-beige",
  name: "Beige Marble",
  description: "Warm beige tones",
  image: shadeLimestone
}, {
  id: "mt-grey",
  name: "Grey Marble",
  description: "Cool grey veining",
  image: shadeSlate
}, {
  id: "mt-black",
  name: "Black Marble",
  description: "Dramatic dark marble",
  image: shadeGranite
}];
const graniteTilePatterns = [{
  id: "gt-black-galaxy",
  name: "Black Galaxy",
  description: "Sparkling black granite",
  image: shadeGranite
}, {
  id: "gt-steel-grey",
  name: "Steel Grey",
  description: "Subtle grey granite",
  image: shadeSlate
}, {
  id: "gt-tan-brown",
  name: "Tan Brown",
  description: "Warm brown granite",
  image: shadeSandstone
}, {
  id: "gt-imperial-white",
  name: "Imperial White",
  description: "Light crystal granite",
  image: shadeMarble
}];
const mosaicPatterns = [{
  id: "mos-geometric",
  name: "Geometric",
  description: "Bold geometric shapes",
  image: shadeMosaicTiles
}, {
  id: "mos-hexagon",
  name: "Hexagon",
  description: "Modern hex layout",
  image: shadeMosaicTiles
}, {
  id: "mos-random",
  name: "Random Mix",
  description: "Artistic random pattern",
  image: shadeCementTiles
}, {
  id: "mos-penny-round",
  name: "Penny Round",
  description: "Classic round mosaic",
  image: shadeMosaicTiles
}];
const carpetTilePatterns = [{
  id: "ct-linear",
  name: "Linear Stripe",
  description: "Clean parallel lines",
  image: shadeCarpetTiles
}, {
  id: "ct-loop-pile",
  name: "Loop Pile",
  description: "Textured loop finish",
  image: shadeWallCarpet
}, {
  id: "ct-plush",
  name: "Plush Cut",
  description: "Soft dense pile",
  image: shadeAreaRugs
}, {
  id: "ct-designer",
  name: "Designer Pattern",
  description: "Modern abstract design",
  image: shadeCarpetTiles
}];
const wallToWallPatterns = [{
  id: "ww-cut-pile",
  name: "Cut Pile",
  description: "Smooth cut surface",
  image: shadeWallCarpet
}, {
  id: "ww-loop-pile",
  name: "Loop Pile",
  description: "Durable loop texture",
  image: shadeCarpetTiles
}, {
  id: "ww-cut-loop",
  name: "Cut & Loop",
  description: "Mixed texture pattern",
  image: shadeAreaRugs
}, {
  id: "ww-shaggy",
  name: "Shaggy",
  description: "Deep plush shag pile",
  image: shadeWallCarpet
}];
const areaRugPatterns = [{
  id: "ar-persian",
  name: "Persian",
  description: "Traditional ornate design",
  image: shadeAreaRugs
}, {
  id: "ar-modern",
  name: "Modern Abstract",
  description: "Contemporary art rug",
  image: shadeCarpetTiles
}, {
  id: "ar-natural",
  name: "Natural Fibre",
  description: "Jute, sisal, seagrass",
  image: shadeWallCarpet
}];
const broadloomPatterns = [{
  id: "bl-tufted",
  name: "Tufted Broadloom",
  description: "Machine tufted carpet",
  image: shadeWallCarpet
}, {
  id: "bl-woven",
  name: "Woven Broadloom",
  description: "Woven construction",
  image: shadeCarpetTiles
}, {
  id: "bl-needlefelt",
  name: "Needlefelt",
  description: "Needle-punched flat carpet",
  image: shadeCarpetTiles
}];
const artificialGrassPatterns = [{
  id: "ag-landscape",
  name: "Landscape Grass",
  description: "Garden & lawn turf",
  image: shadeOutdoorTiles
}, {
  id: "ag-sports",
  name: "Sports Grass",
  description: "Sports-grade synthetic",
  image: shadeOutdoorTiles
}, {
  id: "ag-balcony",
  name: "Balcony Grass",
  description: "Compact balcony turf",
  image: shadeOutdoorTiles
}];
const outdoorTilePatterns = [{
  id: "ot-stone-look",
  name: "Stone Look",
  description: "Natural stone effect",
  image: shadeOutdoorTiles
}, {
  id: "ot-wood-look",
  name: "Wood Look",
  description: "Outdoor wood plank",
  image: shadeTimberDecking
}, {
  id: "ot-geometric",
  name: "Geometric",
  description: "Bold outdoor pattern",
  image: shadeStonePavers
}];
const timberDeckingPatterns = [{
  id: "td-straight",
  name: "Straight Plank",
  description: "Classic deck boards",
  image: shadeTimberDecking
}, {
  id: "td-herringbone",
  name: "Herringbone Deck",
  description: "Angular deck layout",
  image: shadeTimberDecking
}, {
  id: "td-diagonal",
  name: "Diagonal",
  description: "Angled board pattern",
  image: shadeWpcDecking
}];
const wpcDeckingPatterns = [{
  id: "wpc-dk-plank",
  name: "Standard Plank",
  description: "Composite deck boards",
  image: shadeWpcDecking
}, {
  id: "wpc-dk-wide",
  name: "Wide Plank",
  description: "Modern wide composite",
  image: shadeWpcDecking
}, {
  id: "wpc-dk-grooved",
  name: "Grooved Surface",
  description: "Anti-slip grooved",
  image: shadeWpcDecking
}];
const stonePaverPatterns = [{
  id: "sp-random",
  name: "Random Ashlar",
  description: "Mixed-size layout",
  image: shadeStonePavers
}, {
  id: "sp-stacked",
  name: "Stacked Bond",
  description: "Aligned grid pattern",
  image: shadeGranite
}, {
  id: "sp-herringbone",
  name: "Herringbone",
  description: "Classic angled pavers",
  image: shadeStonePavers
}];
const deckingPatterns = [{
  id: "wpc-dk-plank",
  name: "WPC Deck Plank",
  description: "Composite deck boards",
  image: shadeWpcDecking
}, {
  id: "td-straight",
  name: "Timber Deck Plank",
  description: "Natural timber boards",
  image: shadeTimberDecking
}, {
  id: "wpc-dk-wide",
  name: "Composite Wide Plank",
  description: "Wide composite boards",
  image: shadeWpcDecking
}];
const interlockingPaverPatterns = [{
  id: "ip-brick",
  name: "Brick Pattern",
  description: "Classic brick layout",
  image: shadeStonePavers
}, {
  id: "ip-cobblestone",
  name: "Cobblestone",
  description: "Natural cobble look",
  image: shadeStonePavers
}, {
  id: "ip-herringbone",
  name: "Herringbone Paver",
  description: "Angular paver layout",
  image: shadeStonePavers
}];
const artificialGrassOutdoorPatterns = [{
  id: "ago-landscape",
  name: "Landscape Turf",
  description: "Garden & lawn turf",
  image: shadeOutdoorTiles
}, {
  id: "ago-putting-green",
  name: "Putting Green",
  description: "Golf-grade turf",
  image: shadeOutdoorTiles
}, {
  id: "ago-sports-turf",
  name: "Sports Turf",
  description: "Multi-sport synthetic",
  image: shadeOutdoorTiles
}];
const rubberFlooringPatterns = [{
  id: "rb-gym-tiles",
  name: "Gym Tiles",
  description: "Heavy-duty gym rubber",
  image: shadeStonePavers
}, {
  id: "rb-playground",
  name: "Playground Rubber",
  description: "Safety playground surface",
  image: shadeOutdoorTiles
}, {
  id: "rb-industrial",
  name: "Industrial Rubber",
  description: "Industrial-grade rubber",
  image: shadeStonePavers
}];
const sportsFlooringPatterns = [{
  id: "sf-vinyl-sport",
  name: "Vinyl Sport Floor",
  description: "PVC sports surface",
  image: shadeOutdoorTiles
}, {
  id: "sf-pu-court",
  name: "PU Court Surface",
  description: "Polyurethane court",
  image: shadeOutdoorTiles
}, {
  id: "sf-multi-purpose",
  name: "Multi-Purpose",
  description: "All-sport flooring",
  image: shadeOutdoorTiles
}];
const epoxyCoatingPatterns = [{
  id: "ep-self-leveling",
  name: "Self-Leveling Epoxy",
  description: "Smooth seamless finish",
  image: shadeStonePavers
}, {
  id: "ep-decorative-flake",
  name: "Decorative Flake",
  description: "Chip-broadcast epoxy",
  image: shadeStonePavers
}, {
  id: "ep-metallic",
  name: "Metallic Epoxy",
  description: "Swirled metallic finish",
  image: shadeStonePavers
}];

// ─── Material categories with flooring types ───

const spcLvtMaterial = {
  id: "spc-lvt",
  name: "SPC / LVT",
  image: typeVinyl,
  isPopular: true,
  flooringTypes: [{
    id: "ft-spc",
    name: "SPC Vinyl",
    isPopular: true,
    image: shadeSpc,
    priceRange: "85–190",
    calculatorId: "vinyl",
    patterns: spcPatterns
  }, {
    id: "ft-lvt",
    name: "LVT Vinyl",
    isPopular: false,
    image: shadeLvt,
    priceRange: "75–180",
    calculatorId: "vinyl",
    patterns: lvtPatterns
  }, {
    id: "ft-rigid-core",
    name: "Rigid Core Vinyl",
    isPopular: false,
    image: shadePvc,
    priceRange: "90–200",
    calculatorId: "vinyl",
    patterns: pvcPatterns
  }, {
    id: "ft-glue-down",
    name: "Glue Down Vinyl",
    isPopular: false,
    image: shadeVinylSheets,
    priceRange: "65–150",
    calculatorId: "vinyl",
    patterns: vinylRollPatterns
  }, {
    id: "ft-click-lock",
    name: "Click Lock Vinyl",
    isPopular: false,
    image: shadeWpc,
    priceRange: "80–170",
    calculatorId: "vinyl",
    patterns: wpcPatterns
  }]
};
const woodenMaterial = {
  id: "wooden",
  name: "Wooden",
  image: typeWood,
  flooringTypes: [{
    id: "ft-engineered",
    name: "Engineered Wood",
    isPopular: true,
    image: shadeEngineeredWood,
    priceRange: "95–450",
    calculatorId: "wood",
    patterns: engineeredWoodPatterns
  }, {
    id: "ft-laminate",
    name: "Laminate",
    isPopular: false,
    image: shadeLaminate,
    priceRange: "55–130",
    calculatorId: "wood",
    patterns: laminatePatterns
  }, {
    id: "ft-solid-hardwood",
    name: "Solid Hardwood",
    isPopular: false,
    image: shadeSolidHardwood,
    priceRange: "180–600",
    calculatorId: "wood",
    patterns: solidHardwoodPatterns
  }, {
    id: "ft-parquet",
    name: "Parquet",
    isPopular: false,
    image: shadeParquet,
    priceRange: "120–350",
    calculatorId: "wood",
    patterns: parquetPatterns
  }]
};
const tilesMaterial = {
  id: "tiles",
  name: "Tiles",
  image: typeTile,
  flooringTypes: [{
    id: "ft-ceramic",
    name: "Ceramic Tiles",
    isPopular: false,
    image: shadeCeramicTiles,
    priceRange: "35–90",
    calculatorId: "tile",
    patterns: ceramicPatterns
  }, {
    id: "ft-porcelain",
    name: "Porcelain Tiles",
    isPopular: true,
    image: shadePorcelainTiles,
    priceRange: "55–160",
    calculatorId: "tile",
    patterns: porcelainPatterns
  }, {
    id: "ft-vitrified",
    name: "Vitrified Tiles",
    isPopular: false,
    image: shadeVitrifiedTiles,
    priceRange: "50–140",
    calculatorId: "tile",
    patterns: porcelainPatterns
  }, {
    id: "ft-mosaic",
    name: "Mosaic Tiles",
    isPopular: false,
    image: shadeMosaicTiles,
    priceRange: "80–250",
    calculatorId: "tile",
    patterns: mosaicPatterns
  }, {
    id: "ft-terrazzo",
    name: "Terrazzo Tiles",
    isPopular: false,
    image: shadeTerrazzo,
    priceRange: "90–220",
    calculatorId: "tile",
    patterns: ceramicPatterns
  }]
};
const carpetMaterial = {
  id: "carpet",
  name: "Carpet",
  image: typeCarpet,
  flooringTypes: [{
    id: "ft-carpet-tiles",
    name: "Carpet Tiles",
    isPopular: true,
    image: shadeCarpetTiles,
    priceRange: "60–140",
    calculatorId: "carpet",
    patterns: carpetTilePatterns
  }, {
    id: "ft-wall-to-wall",
    name: "Wall-to-Wall Carpet",
    isPopular: false,
    image: shadeWallCarpet,
    priceRange: "45–120",
    calculatorId: "carpet",
    patterns: wallToWallPatterns
  }, {
    id: "ft-area-rugs",
    name: "Area Rugs",
    isPopular: false,
    image: shadeAreaRugs,
    priceRange: "50–300",
    calculatorId: "carpet",
    patterns: areaRugPatterns
  }]
};
const outdoorMaterial = {
  id: "outdoor",
  name: "Outdoor",
  image: typeOutdoor,
  flooringTypes: [{
    id: "ft-outdoor-tiles",
    name: "Outdoor Tiles",
    isPopular: true,
    image: shadeOutdoorTiles,
    priceRange: "45–120",
    calculatorId: "outdoor",
    patterns: outdoorTilePatterns
  }, {
    id: "ft-timber-decking",
    name: "Timber Decking",
    isPopular: false,
    image: shadeTimberDecking,
    priceRange: "120–350",
    calculatorId: "outdoor",
    patterns: timberDeckingPatterns
  }, {
    id: "ft-wpc-decking",
    name: "WPC Decking",
    isPopular: false,
    image: shadeWpcDecking,
    priceRange: "90–250",
    calculatorId: "outdoor",
    patterns: wpcDeckingPatterns
  }, {
    id: "ft-stone-pavers",
    name: "Stone Pavers",
    isPopular: false,
    image: shadeStonePavers,
    priceRange: "80–300",
    calculatorId: "outdoor",
    patterns: stonePaverPatterns
  }]
};

// ─── Segments ───

export const segments = [{
  id: "residential",
  name: "Residential",
  image: spaceResidential,
  materials: [spcLvtMaterial, woodenMaterial, tilesMaterial, carpetMaterial, outdoorMaterial]
}, {
  id: "commercial",
  name: "Commercial",
  image: spaceCommercial,
  materials: [spcLvtMaterial, tilesMaterial, carpetMaterial, woodenMaterial, outdoorMaterial]
}, {
  id: "industrial",
  name: "Industrial",
  image: spaceIndustrial,
  materials: [spcLvtMaterial, tilesMaterial, outdoorMaterial, woodenMaterial, carpetMaterial]
}];
export const getSegmentById = id => segments.find(s => s.id === id);

// ─── Shade-to-Pattern mapping for calculator ───

const shadePatternMap = {
  // Vinyl / SPC / LVT
  "spc": spcPatterns,
  "lvt": lvtPatterns,
  "pvc": pvcPatterns,
  "vinyl-sheets": vinylRollPatterns,
  "wpc": wpcPatterns,
  // Wooden
  "engineered-wood": engineeredWoodPatterns,
  "laminate": laminatePatterns,
  "parquet": parquetPatterns,
  "solid-hardwood": solidHardwoodPatterns,
  "bamboo": bambooPatterns,
  // Tiles
  "ceramic-tiles": ceramicPatterns,
  "porcelain-tiles": porcelainPatterns,
  "vitrified-tiles": vitrifiedPatterns,
  "mosaic-tiles": mosaicPatterns,
  "terrazzo-tiles": ceramicPatterns,
  "cement-tiles": ceramicPatterns,
  "marble-tiles": marbleTilePatterns,
  "granite-tiles": graniteTilePatterns,
  // Carpet
  "carpet-tiles": carpetTilePatterns,
  "wall-to-wall": wallToWallPatterns,
  "area-rugs": areaRugPatterns,
  "broadloom": broadloomPatterns,
  "artificial-grass": artificialGrassPatterns,
  // Outdoor
  "outdoor-tiles": outdoorTilePatterns,
  "timber-decking": timberDeckingPatterns,
  "wpc-decking": wpcDeckingPatterns,
  "stone-pavers": stonePaverPatterns,
  "decking": deckingPatterns,
  "interlocking-pavers": interlockingPaverPatterns,
  "artificial-grass-outdoor": artificialGrassOutdoorPatterns,
  "rubber-flooring": rubberFlooringPatterns,
  "sports-flooring": sportsFlooringPatterns,
  "epoxy-coating": epoxyCoatingPatterns,
  // Stone
  "granite": stonePaverPatterns,
  "limestone": stonePaverPatterns,
  "marble": porcelainPatterns,
  "sandstone": stonePaverPatterns,
  "slate": stonePaverPatterns,
  "travertine": porcelainPatterns
};
export const getPatternsByShadeId = shadeId => {
  return shadePatternMap[shadeId] || [];
};

// ─── Space-specific configs (Kitchen/Stairs/Bathroom) ───

export const spaceFlooringTypes = [{
  id: "kitchen",
  name: "Kitchen",
  materials: [tilesMaterial, spcLvtMaterial, woodenMaterial]
}, {
  id: "stairs",
  name: "Stairs",
  materials: [woodenMaterial, spcLvtMaterial, carpetMaterial]
}, {
  id: "bathroom",
  name: "Bathroom",
  materials: [tilesMaterial, spcLvtMaterial, outdoorMaterial]
}];