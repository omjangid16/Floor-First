// Maps pattern IDs to their available shade/color options

const patternShadesMap = {
  // ─── SPC Patterns ───
  "spc-straight-plank": ["Light Oak", "Natural Oak", "Golden Oak", "Smoked Oak", "Dark Oak", "Walnut", "Grey Oak", "Driftwood Grey", "Charcoal"],
  "spc-herringbone": ["Light Oak", "Natural Oak", "Smoked Oak", "Dark Walnut", "Grey Wash", "Rustic Oak"],
  "spc-chevron": ["Scandinavian Oak", "Natural Oak", "Dark Walnut", "Light Grey Wood", "Classic Brown"],
  "spc-tile-format": ["Marble White", "Statuario", "Grey Marble", "Slate Grey", "Concrete", "Cement Finish"],
  // ─── LVT Patterns ───
  "lvt-straight-plank": ["White Oak", "Natural Oak", "Honey Oak", "Walnut", "Teak", "Grey Oak", "Espresso"],
  "lvt-herringbone": ["Light Oak", "Classic Oak", "Rustic Brown", "Smoked Grey", "Dark Walnut"],
  "lvt-chevron": ["Scandinavian Oak", "Natural Wood", "Walnut", "Grey Wash"],
  "lvt-tile": ["Carrara Marble", "Statuario", "Travertine", "Limestone", "Concrete", "Industrial Grey"],
  "lvt-abstract": ["Textile Pattern", "Geometric", "Terrazzo", "Metallic Finish"],
  // ─── WPC Patterns ───
  "wpc-straight-plank": ["Light Oak", "Natural Oak", "Golden Oak", "Walnut", "Dark Brown", "Grey Oak"],
  "wpc-herringbone": ["Natural Oak", "Smoked Oak", "Dark Walnut", "Grey Driftwood"],
  "wpc-tile-look": ["Marble White", "Grey Stone", "Cement Finish"],
  // ─── PVC Patterns ───
  "pvc-wood-tiles": ["Light Oak", "Medium Oak", "Dark Oak", "Walnut", "Grey Wood"],
  "pvc-stone-tiles": ["White Marble", "Grey Marble", "Black Marble", "Slate"],
  "pvc-homogeneous": ["Solid Beige", "Solid Grey", "Blue", "Green", "Speckled Grey", "Speckled Beige"],
  "pvc-heterogeneous": ["Wood Pattern", "Marble Pattern", "Terrazzo", "Abstract"],
  // ─── Vinyl Roll / Sheet Patterns ───
  "vr-wood-pattern": ["Light Oak", "Natural Oak", "Rustic Brown", "Grey Wood", "Walnut"],
  "vr-stone-pattern": ["White Marble", "Grey Marble", "Slate Grey", "Travertine"],
  "vr-terrazzo": ["White Base + Grey Chips", "Beige Base + Brown Chips", "Grey Base + White Chips"],
  "vr-abstract": ["Geometric", "Linen Texture", "Fabric Look", "Industrial Concrete"],
  // ─── Engineered Wood Patterns ───
  "ew-standard-plank": ["Natural Oak", "White Oak", "Walnut", "Teak", "Ash", "Hickory", "Grey Oak"],
  "ew-herringbone": ["Light Oak", "Natural Oak", "Smoked Oak", "Dark Walnut", "Grey Wash"],
  "ew-chevron": ["Scandinavian Oak", "Natural Oak", "Dark Walnut", "Classic Brown"],
  "ew-wide-plank": ["White Oak", "Natural Oak", "Honey Oak", "Walnut", "Rustic Oak"],
  // ─── Laminate Patterns ───
  "lam-oak-plank": ["Light Oak", "Natural Oak", "Honey Oak", "Golden Oak", "Grey Oak", "Dark Oak"],
  "lam-herringbone": ["Classic Oak", "Smoked Oak", "Dark Walnut", "Grey Wash"],
  "lam-rustic": ["Aged Oak", "Barnwood", "Driftwood", "Reclaimed Wood"],
  "lam-chevron": ["Natural Oak", "Walnut", "Light Grey", "Scandinavian Oak"],
  // ─── Solid Hardwood Patterns ───
  "sh-strip-plank": ["Red Oak", "White Oak", "Maple", "Walnut", "Cherry", "Hickory"],
  "sh-wide-board": ["Natural Oak", "Walnut", "Teak", "Ash", "Hickory"],
  "sh-parquet-block": ["Oak", "Walnut", "Maple", "Cherry", "Teak"],
  // ─── Parquet Patterns ───
  "pq-herringbone": ["Light Oak", "Natural Oak", "Smoked Oak", "Dark Walnut", "Grey Wash", "Rustic Oak"],
  "pq-chevron": ["Scandinavian Oak", "Natural Oak", "Dark Walnut", "Classic Brown"],
  "pq-basket-weave": ["Oak", "Walnut", "Maple", "Teak"],
  "pq-versailles": ["Natural Oak", "Aged Oak", "Walnut", "Light Grey"],
  // ─── Bamboo Patterns ───
  "bam-natural": ["Natural Blonde", "Honey", "Light Amber", "Golden"],
  "bam-carbonized": ["Caramel", "Coffee", "Dark Amber", "Espresso"],
  "bam-strand-woven": ["Natural", "Tiger", "Carbonized", "Antique", "Rustic"],
  "bam-stained": ["Grey", "White Wash", "Ebony", "Walnut", "Cherry"],
  // ─── Ceramic Tile Patterns ───
  "cer-marble-look": ["Carrara White", "Calacatta Gold", "Statuario", "Grey Marble", "Beige Marble"],
  "cer-wood-look": ["Light Oak", "Natural Oak", "Walnut", "Teak", "Grey Wood"],
  "cer-cement-look": ["Light Grey", "Dark Grey", "Beige", "White", "Charcoal"],
  "cer-mosaic": ["White & Grey", "Blue & White", "Multi-Color", "Neutral Tones"],
  // ─── Porcelain Tile Patterns ───
  "por-high-gloss": ["Super White", "Ivory", "Beige", "Light Grey", "Cream"],
  "por-matte-stone": ["Sandstone", "Slate Grey", "Limestone", "Basalt", "Travertine"],
  "por-terrazzo": ["White + Grey Chips", "Beige + Brown Chips", "Grey + White Chips", "Multi-Color"],
  "por-marble": ["Carrara", "Statuario", "Calacatta", "Emperador", "Nero Marquina"],
  // ─── Vitrified Tile Patterns ───
  "vit-double-charged": ["Ivory", "Beige", "Light Grey", "Cream", "White"],
  "vit-full-body": ["Salt & Pepper", "Sandstone", "Grey", "Beige", "Charcoal"],
  "vit-soluble-salt": ["Marble Effect", "Wood Effect", "Stone Effect", "Abstract"],
  "vit-gvt": ["High Gloss White", "Marble Look", "Stone Look", "Wood Look", "Metallic"],
  // ─── Marble Tile Patterns ───
  "mt-white": ["Carrara", "Calacatta", "Statuario", "Thassos", "Volakas"],
  "mt-beige": ["Crema Marfil", "Botticino", "Diana Royal", "Cappuccino"],
  "mt-grey": ["Grigio Carnico", "Bardiglio", "Fior di Bosco", "Silver Grey"],
  "mt-black": ["Nero Marquina", "Black Galaxy", "Sahara Noir", "Belgian Black"],
  // ─── Granite Tile Patterns ───
  "gt-black-galaxy": ["Standard", "Star Galaxy", "Premium Flake"],
  "gt-steel-grey": ["Light", "Medium", "Dark", "Leather Finish"],
  "gt-tan-brown": ["Standard", "Premium", "Leather Finish"],
  "gt-imperial-white": ["Standard", "Premium Vein", "Light Crystal"],
  // ─── Mosaic Tile Patterns ───
  "mos-geometric": ["White & Grey", "Black & White", "Multi-Color", "Gold & White"],
  "mos-hexagon": ["Carrara White", "Black", "Mixed Marble", "Concrete Grey"],
  "mos-random": ["Natural Stone Mix", "Glass Mix", "Ceramic Mix", "Metal Mix"],
  "mos-penny-round": ["White", "Black", "Grey", "Mixed Metallic", "Blue"],
  // ─── Carpet Tile Patterns ───
  "ct-linear": ["Light Grey", "Charcoal", "Navy Blue", "Burgundy", "Beige", "Forest Green"],
  "ct-loop-pile": ["Silver Grey", "Anthracite", "Sand", "Ocean Blue", "Slate"],
  "ct-plush": ["Cream", "Light Grey", "Mocha", "Navy", "Burgundy"],
  "ct-designer": ["Abstract Grey", "Geometric Blue", "Modern Earth", "Contemporary Mix"],
  // ─── Wall-to-Wall Carpet Patterns ───
  "ww-cut-pile": ["Ivory", "Beige", "Light Grey", "Charcoal", "Navy", "Burgundy"],
  "ww-loop-pile": ["Natural Beige", "Silver Grey", "Olive", "Ocean Blue", "Slate"],
  "ww-cut-loop": ["Sand", "Pewter", "Sage", "Denim", "Chocolate"],
  "ww-shaggy": ["White", "Cream", "Light Grey", "Blush Pink", "Sky Blue"],
  // ─── Broadloom Patterns ───
  "bl-tufted": ["Light Grey", "Charcoal", "Beige", "Navy Blue", "Burgundy", "Forest Green"],
  "bl-woven": ["Natural", "Earth Tones", "Grey Blend", "Blue Blend"],
  "bl-needlefelt": ["Anthracite", "Light Grey", "Blue", "Red", "Green", "Brown"],
  // ─── Artificial Grass (Carpet) ───
  "ag-landscape": ["Spring Green", "Forest Green", "Olive Green", "Natural Green"],
  "ag-sports": ["Field Green", "Tennis Green", "Blue", "Red"],
  "ag-balcony": ["Natural Green", "Light Green", "Dark Green"],
  // ─── Outdoor Tile Patterns ───
  "ot-stone-look": ["Sandstone", "Slate Grey", "Limestone", "Travertine", "Basalt"],
  "ot-wood-look": ["Teak", "Ipe", "Oak", "Pine", "Grey Wash"],
  "ot-geometric": ["Hexagon Grey", "Chevron Stone", "Herringbone", "Diamond Pattern"],
  // ─── Timber Decking Patterns ───
  "td-straight": ["Teak", "Ipe", "Cedar", "Pine", "Merbau"],
  "td-herringbone": ["Teak", "Ipe", "Merbau", "Cedar"],
  "td-diagonal": ["Natural Teak", "Dark Ipe", "Golden Cedar"],
  // ─── WPC Decking Patterns ───
  "wpc-dk-plank": ["Teak", "Walnut", "Grey", "Charcoal", "Natural Oak"],
  "wpc-dk-wide": ["Teak", "Dark Brown", "Light Grey", "Anthracite"],
  "wpc-dk-grooved": ["Teak", "Walnut", "Grey", "Charcoal"],
  // ─── Stone Paver Patterns ───
  "sp-random": ["Sandstone Mix", "Limestone Mix", "Granite Mix", "Slate Mix"],
  "sp-stacked": ["Grey Granite", "Beige Limestone", "Black Basalt", "White Marble"],
  "sp-herringbone": ["Brick Red", "Grey", "Sandstone", "Charcoal"],
  // ─── Interlocking Pavers ───
  "ip-brick": ["Red", "Charcoal", "Buff", "Grey", "Brown"],
  "ip-cobblestone": ["Natural Grey", "Aged Brown", "Sandstone", "Mixed"],
  "ip-herringbone": ["Red", "Grey", "Charcoal", "Sandstone", "Brown"],
  // ─── Artificial Grass (Outdoor) ───
  "ago-landscape": ["Spring Green", "Forest Green", "Olive Green", "Natural Green"],
  "ago-putting-green": ["Pro Green", "Tournament Green"],
  "ago-sports-turf": ["Field Green", "Multi-Sport Green", "Tennis Green"],
  // ─── Rubber Flooring ───
  "rb-gym-tiles": ["Black", "Grey", "Blue", "Red", "Green", "Black + Blue Fleck", "Black + Red Fleck"],
  "rb-playground": ["Green", "Blue", "Red", "Orange", "Brown", "Multi-Color"],
  "rb-industrial": ["Black", "Dark Grey", "Safety Yellow", "Anti-Fatigue Grey"],
  // ─── Sports Flooring ───
  "sf-vinyl-sport": ["Maple", "Oak", "Teak", "Grey", "Blue", "Green"],
  "sf-pu-court": ["Blue", "Green", "Red", "Orange", "Multi-Color"],
  "sf-multi-purpose": ["Wood Look", "Grey", "Blue", "Green", "Red"],
  // ─── Epoxy Outdoor Coating ───
  "ep-self-leveling": ["Light Grey", "Medium Grey", "Beige", "White", "Charcoal"],
  "ep-decorative-flake": ["Granite Blend", "Earth Tones", "Ocean Blue", "Desert Sand", "Multi-Color"],
  "ep-metallic": ["Silver", "Copper", "Gold", "Pearl White", "Ocean Blue", "Emerald"],
  // ─── Stone category patterns (existing) ───
  "st-granite-slab": ["Black Galaxy", "Steel Grey", "Tan Brown", "Imperial White", "Absolute Black"],
  "st-limestone-slab": ["Jerusalem Gold", "Shell Beige", "French Vanilla", "Blue Grey"],
  "st-marble-slab": ["Carrara", "Calacatta", "Statuario", "Emperador", "Nero Marquina"],
  "st-sandstone-slab": ["Teak", "Autumn Brown", "Rainbow", "Mint White", "Yellow"],
  "st-slate-slab": ["Black", "Grey", "Multi-Color", "Rustic", "Green"]
};
export const getPatternShades = patternId => {
  return patternShadesMap[patternId] || [];
};