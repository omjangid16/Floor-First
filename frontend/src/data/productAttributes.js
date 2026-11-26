// Product attributes configuration by flooring type
// Each type has its own relevant attributes with selectable options

// Type-specific attribute configurations
const tileAttributes = [{
  key: "size",
  label: "Size",
  options: [{
    id: "30x30",
    label: "30×30 cm"
  }, {
    id: "45x45",
    label: "45×45 cm"
  }, {
    id: "60x60",
    label: "60×60 cm"
  }, {
    id: "60x120",
    label: "60×120 cm"
  }, {
    id: "80x80",
    label: "80×80 cm"
  }, {
    id: "120x120",
    label: "120×120 cm"
  }]
}, {
  key: "finish",
  label: "Finish",
  options: [{
    id: "polished",
    label: "Polished"
  }, {
    id: "matte",
    label: "Matte"
  }, {
    id: "honed",
    label: "Honed"
  }, {
    id: "textured",
    label: "Textured"
  }, {
    id: "glossy",
    label: "Glossy"
  }, {
    id: "anti-slip",
    label: "Anti-Slip"
  }]
}, {
  key: "thickness",
  label: "Thickness",
  options: [{
    id: "8mm",
    label: "8 mm"
  }, {
    id: "10mm",
    label: "10 mm"
  }, {
    id: "12mm",
    label: "12 mm"
  }, {
    id: "20mm",
    label: "20 mm"
  }]
}, {
  key: "tone",
  label: "Shade / Tone",
  options: [{
    id: "light",
    label: "Light"
  }, {
    id: "medium",
    label: "Medium"
  }, {
    id: "dark",
    label: "Dark"
  }, {
    id: "grey",
    label: "Grey"
  }]
}];
const stoneAttributes = [{
  key: "size",
  label: "Slab Size",
  options: [{
    id: "60x60",
    label: "60×60 cm"
  }, {
    id: "60x120",
    label: "60×120 cm"
  }, {
    id: "80x80",
    label: "80×80 cm"
  }, {
    id: "custom",
    label: "Custom Cut"
  }]
}, {
  key: "finish",
  label: "Finish",
  options: [{
    id: "polished",
    label: "Polished"
  }, {
    id: "honed",
    label: "Honed"
  }, {
    id: "brushed",
    label: "Brushed"
  }, {
    id: "leathered",
    label: "Leathered"
  }, {
    id: "tumbled",
    label: "Tumbled"
  }, {
    id: "natural-cleft",
    label: "Natural Cleft"
  }]
}, {
  key: "thickness",
  label: "Thickness",
  options: [{
    id: "15mm",
    label: "15 mm"
  }, {
    id: "20mm",
    label: "20 mm"
  }, {
    id: "30mm",
    label: "30 mm"
  }]
}, {
  key: "tone",
  label: "Shade / Tone",
  options: [{
    id: "light",
    label: "Light"
  }, {
    id: "medium",
    label: "Medium"
  }, {
    id: "dark",
    label: "Dark"
  }]
}];
const woodAttributes = [{
  key: "plank-width",
  label: "Plank Width",
  options: [{
    id: "90mm",
    label: "90 mm"
  }, {
    id: "120mm",
    label: "120 mm"
  }, {
    id: "150mm",
    label: "150 mm"
  }, {
    id: "190mm",
    label: "190 mm"
  }, {
    id: "220mm",
    label: "220 mm (Wide)"
  }]
}, {
  key: "finish",
  label: "Finish",
  options: [{
    id: "matte-lacquer",
    label: "Matte Lacquer"
  }, {
    id: "oiled",
    label: "Oiled"
  }, {
    id: "brushed-oiled",
    label: "Brushed & Oiled"
  }, {
    id: "uv-lacquer",
    label: "UV Lacquered"
  }, {
    id: "hand-scraped",
    label: "Hand-Scraped"
  }, {
    id: "smoked",
    label: "Smoked"
  }]
}, {
  key: "thickness",
  label: "Thickness",
  options: [{
    id: "8mm",
    label: "8 mm (Laminate)"
  }, {
    id: "12mm",
    label: "12 mm"
  }, {
    id: "14mm",
    label: "14 mm"
  }, {
    id: "15mm",
    label: "15 mm"
  }, {
    id: "20mm",
    label: "20 mm (Solid)"
  }]
}, {
  key: "tone",
  label: "Shade / Tone",
  options: [{
    id: "light",
    label: "Light"
  }, {
    id: "medium",
    label: "Medium"
  }, {
    id: "dark",
    label: "Dark"
  }, {
    id: "grey",
    label: "Grey"
  }]
}];
const vinylAttributes = [{
  key: "plank-size",
  label: "Plank Size",
  options: [{
    id: "150x900",
    label: "150×900 mm"
  }, {
    id: "180x1220",
    label: "180×1220 mm"
  }, {
    id: "228x1220",
    label: "228×1220 mm"
  }, {
    id: "300x600",
    label: "300×600 mm (Tile)"
  }, {
    id: "610x610",
    label: "610×610 mm (Tile)"
  }]
}, {
  key: "finish",
  label: "Finish",
  options: [{
    id: "embossed",
    label: "Embossed"
  }, {
    id: "deep-embossed",
    label: "Deep Embossed"
  }, {
    id: "matte",
    label: "Matte"
  }, {
    id: "polished",
    label: "Polished"
  }, {
    id: "textured",
    label: "Textured"
  }]
}, {
  key: "thickness",
  label: "Total Thickness",
  options: [{
    id: "3.5mm",
    label: "3.5 mm"
  }, {
    id: "4mm",
    label: "4 mm"
  }, {
    id: "5mm",
    label: "5 mm"
  }, {
    id: "5.5mm",
    label: "5.5 mm"
  }, {
    id: "6mm",
    label: "6 mm"
  }]
}, {
  key: "wear-layer",
  label: "Wear Layer",
  options: [{
    id: "0.3mm",
    label: "0.3 mm (Residential)"
  }, {
    id: "0.5mm",
    label: "0.5 mm (Commercial)"
  }, {
    id: "0.7mm",
    label: "0.7 mm (Heavy Duty)"
  }]
}];
const resinAttributes = [{
  key: "system",
  label: "System Type",
  options: [{
    id: "self-leveling",
    label: "Self-Leveling"
  }, {
    id: "broadcast",
    label: "Broadcast / Flake"
  }, {
    id: "trowel",
    label: "Trowel Applied"
  }, {
    id: "slurry",
    label: "Slurry Coat"
  }]
}, {
  key: "thickness",
  label: "Thickness",
  options: [{
    id: "1mm",
    label: "1 mm (Coating)"
  }, {
    id: "2mm",
    label: "2 mm"
  }, {
    id: "3mm",
    label: "3 mm"
  }, {
    id: "6mm",
    label: "6 mm (Screed)"
  }, {
    id: "9mm",
    label: "9 mm (Heavy)"
  }]
}, {
  key: "finish",
  label: "Finish",
  options: [{
    id: "high-gloss",
    label: "High Gloss"
  }, {
    id: "satin",
    label: "Satin"
  }, {
    id: "matte",
    label: "Matte"
  }, {
    id: "anti-slip",
    label: "Anti-Slip Textured"
  }]
}];
const carpetAttributes = [{
  key: "pile-type",
  label: "Pile Type",
  options: [{
    id: "loop",
    label: "Loop Pile"
  }, {
    id: "cut",
    label: "Cut Pile"
  }, {
    id: "cut-loop",
    label: "Cut & Loop"
  }, {
    id: "velvet",
    label: "Velvet"
  }, {
    id: "shag",
    label: "Shag"
  }, {
    id: "flat-weave",
    label: "Flat Weave"
  }]
}, {
  key: "tile-size",
  label: "Tile / Roll Size",
  options: [{
    id: "50x50",
    label: "50×50 cm Tile"
  }, {
    id: "25x100",
    label: "25×100 cm Plank"
  }, {
    id: "4m-roll",
    label: "4m Wide Roll"
  }, {
    id: "custom-rug",
    label: "Custom Rug"
  }]
}, {
  key: "material",
  label: "Fiber Material",
  options: [{
    id: "nylon",
    label: "Nylon"
  }, {
    id: "wool",
    label: "100% Wool"
  }, {
    id: "wool-nylon",
    label: "Wool/Nylon Blend"
  }, {
    id: "polypropylene",
    label: "Polypropylene"
  }, {
    id: "polyester",
    label: "Polyester"
  }, {
    id: "sisal",
    label: "Natural Sisal"
  }]
}];
const outdoorAttributes = [{
  key: "board-size",
  label: "Board / Tile Size",
  options: [{
    id: "30x30",
    label: "30×30 cm Tile"
  }, {
    id: "145x2200",
    label: "145×2200 mm Board"
  }, {
    id: "145x3600",
    label: "145×3600 mm Board"
  }, {
    id: "60x60",
    label: "60×60 cm Paver"
  }]
}, {
  key: "finish",
  label: "Surface Finish",
  options: [{
    id: "textured",
    label: "Textured"
  }, {
    id: "grooved",
    label: "Grooved"
  }, {
    id: "smooth",
    label: "Smooth"
  }, {
    id: "oiled",
    label: "Oiled Natural"
  }, {
    id: "capped",
    label: "Co-Extruded Cap"
  }]
}, {
  key: "thickness",
  label: "Thickness / Profile",
  options: [{
    id: "20mm",
    label: "20 mm"
  }, {
    id: "22mm",
    label: "22 mm"
  }, {
    id: "25mm",
    label: "25 mm"
  }, {
    id: "30mm",
    label: "30 mm"
  }]
}];
const rubberAttributes = [{
  key: "format",
  label: "Format",
  options: [{
    id: "tile-50x50",
    label: "50×50 cm Tile"
  }, {
    id: "tile-100x100",
    label: "100×100 cm Tile"
  }, {
    id: "roll-125",
    label: "1.25m Roll"
  }, {
    id: "mat",
    label: "Individual Mat"
  }]
}, {
  key: "thickness",
  label: "Thickness",
  options: [{
    id: "6mm",
    label: "6 mm"
  }, {
    id: "8mm",
    label: "8 mm"
  }, {
    id: "10mm",
    label: "10 mm"
  }, {
    id: "15mm",
    label: "15 mm"
  }, {
    id: "20mm",
    label: "20 mm"
  }, {
    id: "30mm",
    label: "30 mm (Impact)"
  }]
}, {
  key: "surface",
  label: "Surface Pattern",
  options: [{
    id: "smooth",
    label: "Smooth"
  }, {
    id: "coin-top",
    label: "Coin Top"
  }, {
    id: "diamond",
    label: "Diamond Plate"
  }, {
    id: "pebbled",
    label: "Pebbled"
  }]
}];

// Map flooring type to its attributes
const attributesByType = {
  tile: tileAttributes,
  stone: stoneAttributes,
  wood: woodAttributes,
  vinyl: vinylAttributes,
  resin: resinAttributes,
  carpet: carpetAttributes,
  outdoor: outdoorAttributes,
  rubber: rubberAttributes
};
export const getAttributesForType = type => {
  return attributesByType[type] || [];
};