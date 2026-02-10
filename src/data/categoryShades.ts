import shadeLvt from "@/assets/shade-lvt.jpg";
import shadeSpc from "@/assets/shade-spc.jpg";
import shadePvc from "@/assets/shade-pvc.jpg";
import shadeVinylSheets from "@/assets/shade-vinyl-sheets.jpg";
import shadeWpc from "@/assets/shade-wpc.jpg";
import shadeEngineeredWood from "@/assets/shade-engineered-wood.jpg";
import shadeLaminate from "@/assets/shade-laminate.jpg";
import shadeParquet from "@/assets/shade-parquet.jpg";
import shadeSolidHardwood from "@/assets/shade-solid-hardwood.jpg";
import shadeCementTiles from "@/assets/shade-cement-tiles.jpg";
import shadeCeramicTiles from "@/assets/shade-ceramic-tiles.jpg";
import shadeMosaicTiles from "@/assets/shade-mosaic-tiles.jpg";
import shadePorcelainTiles from "@/assets/shade-porcelain-tiles.jpg";
import shadeTerrazzo from "@/assets/shade-terrazzo-tiles.jpg";
import shadeVitrifiedTiles from "@/assets/shade-vitrified-tiles.jpg";
import shadeAreaRugs from "@/assets/shade-area-rugs.jpg";
import shadeCarpetTiles from "@/assets/shade-carpet-tiles.jpg";
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

export interface CategoryShade {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categoryShades: Record<string, CategoryShade[]> = {
  vinyl: [
    { id: "lvt", name: "Luxury Vinyl Tiles (LVT)", description: "Realistic wood & stone look", image: shadeLvt },
    { id: "spc", name: "SPC Flooring", description: "Rigid core, waterproof planks", image: shadeSpc },
    { id: "pvc", name: "PVC Flooring", description: "Durable, easy to maintain", image: shadePvc },
    { id: "vinyl-sheets", name: "Vinyl Sheets / Rolls", description: "Seamless coverage", image: shadeVinylSheets },
    { id: "wpc", name: "WPC Flooring", description: "Wood-plastic composite", image: shadeWpc },
  ],
  wood: [
    { id: "engineered-wood", name: "Engineered Wood", description: "Multi-layer stability", image: shadeEngineeredWood },
    { id: "laminate", name: "Laminate Flooring", description: "Affordable wood look", image: shadeLaminate },
    { id: "parquet", name: "Parquet Flooring", description: "Herringbone elegance", image: shadeParquet },
    { id: "solid-hardwood", name: "Solid Hardwood", description: "Pure natural timber", image: shadeSolidHardwood },
  ],
  tile: [
    { id: "cement-tiles", name: "Cement Tiles", description: "Handcrafted artisan style", image: shadeCementTiles },
    { id: "ceramic-tiles", name: "Ceramic Tiles", description: "Classic versatile finish", image: shadeCeramicTiles },
    { id: "mosaic-tiles", name: "Mosaic Tiles", description: "Decorative small-format", image: shadeMosaicTiles },
    { id: "porcelain-tiles", name: "Porcelain Tiles", description: "Dense, durable luxury", image: shadePorcelainTiles },
    { id: "terrazzo-tiles", name: "Terrazzo Tiles", description: "Speckled modern look", image: shadeTerrazzo },
    { id: "vitrified-tiles", name: "Vitrified Tiles", description: "Low-absorption, glossy", image: shadeVitrifiedTiles },
  ],
  carpet: [
    { id: "area-rugs", name: "Area Rugs", description: "Accent & decor pieces", image: shadeAreaRugs },
    { id: "carpet-tiles", name: "Carpet Tiles", description: "Modular, replaceable", image: shadeCarpetTiles },
    { id: "wall-to-wall", name: "Wall-to-Wall Carpet", description: "Full room luxury", image: shadeWallCarpet },
  ],
  outdoor: [
    { id: "outdoor-tiles", name: "Outdoor Tiles", description: "Weather-resistant tiles", image: shadeOutdoorTiles },
    { id: "stone-pavers", name: "Stone Pavers", description: "Natural stone pathways", image: shadeStonePavers },
    { id: "timber-decking", name: "Timber Decking", description: "Classic warm decking", image: shadeTimberDecking },
    { id: "wpc-decking", name: "WPC Decking", description: "Low-maintenance composite", image: shadeWpcDecking },
  ],
  stone: [
    { id: "granite", name: "Granite", description: "Speckled natural beauty", image: shadeGranite },
    { id: "limestone", name: "Limestone", description: "Subtle warm elegance", image: shadeLimestone },
    { id: "marble", name: "Marble", description: "Luxury veined finish", image: shadeMarble },
    { id: "sandstone", name: "Sandstone", description: "Earthy desert palette", image: shadeSandstone },
    { id: "slate", name: "Slate", description: "Cool blue-grey tones", image: shadeSlate },
    { id: "travertine", name: "Travertine", description: "Warm textured stone", image: shadePorcelainTiles },
  ],
};

export const getCategoryShades = (categoryId: string): CategoryShade[] => {
  return categoryShades[categoryId] || [];
};
