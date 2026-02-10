export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "tile",
    name: "Tile Flooring",
    subcategories: [
      { name: "Cement Tiles", slug: "cement-tiles" },
      { name: "Ceramic Tiles", slug: "ceramic-tiles" },
      { name: "Mosaic Tiles", slug: "mosaic-tiles" },
      { name: "Porcelain Tiles", slug: "porcelain-tiles" },
      { name: "Terrazzo Tiles", slug: "terrazzo-tiles" },
      { name: "Vitrified Tiles", slug: "vitrified-tiles" },
    ],
  },
  {
    id: "vinyl",
    name: "Vinyl & Synthetic Flooring",
    subcategories: [
      { name: "Luxury Vinyl Tiles (LVT)", slug: "lvt" },
      { name: "PVC Flooring", slug: "pvc-flooring" },
      { name: "SPC Flooring", slug: "spc-flooring" },
      { name: "Vinyl Sheets / Rolls", slug: "vinyl-sheets" },
      { name: "WPC Flooring", slug: "wpc-flooring" },
    ],
  },
  {
    id: "wood",
    name: "Wooden Flooring",
    subcategories: [
      { name: "Engineered Wood Flooring", slug: "engineered-wood" },
      { name: "Laminate Flooring", slug: "laminate" },
      { name: "Parquet Flooring", slug: "parquet" },
      { name: "Solid Hardwood Flooring", slug: "solid-hardwood" },
    ],
  },
  {
    id: "carpet",
    name: "Carpet Flooring",
    subcategories: [
      { name: "Area Rugs", slug: "area-rugs" },
      { name: "Carpet Tiles", slug: "carpet-tiles" },
      { name: "Wall-to-Wall Carpet", slug: "wall-to-wall-carpet" },
    ],
  },
  {
    id: "concrete",
    name: "Concrete & Cementitious Flooring",
    subcategories: [
      { name: "Microtopping Cement Finish", slug: "microtopping" },
      { name: "Polished Concrete", slug: "polished-concrete" },
      { name: "Screed / Leveling Base Floor", slug: "screed" },
      { name: "Stamped Concrete", slug: "stamped-concrete" },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor & Deck Flooring",
    subcategories: [
      { name: "Outdoor Tiles", slug: "outdoor-tiles" },
      { name: "Stone Pavers", slug: "stone-pavers" },
      { name: "Timber Decking", slug: "timber-decking" },
      { name: "WPC Decking", slug: "wpc-decking" },
    ],
  },
  {
    id: "resin",
    name: "Resin & Industrial Flooring",
    subcategories: [
      { name: "Epoxy Flooring", slug: "epoxy" },
      { name: "MMA Flooring", slug: "mma" },
      { name: "PU Flooring", slug: "pu-flooring" },
      { name: "Self-Leveling Resin Flooring", slug: "self-leveling-resin" },
    ],
  },
  {
    id: "rubber",
    name: "Rubber & Sports Flooring",
    subcategories: [
      { name: "PU Sports Flooring", slug: "pu-sports" },
      { name: "Rubber Rolls", slug: "rubber-rolls" },
      { name: "Rubber Tiles", slug: "rubber-tiles" },
    ],
  },
  {
    id: "stone",
    name: "Stone Flooring",
    subcategories: [
      { name: "Granite", slug: "granite" },
      { name: "Limestone", slug: "limestone" },
      { name: "Marble", slug: "marble" },
      { name: "Sandstone", slug: "sandstone" },
      { name: "Slate", slug: "slate" },
      { name: "Travertine", slug: "travertine" },
    ],
  },
];
