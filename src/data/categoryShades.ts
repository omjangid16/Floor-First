export interface CategoryShade {
  id: string;
  name: string;
  description: string;
  gradient: string; // CSS gradient for visual swatch
}

export const categoryShades: Record<string, CategoryShade[]> = {
  vinyl: [
    { id: "light-oak", name: "Light Oak", description: "Bright natural look", gradient: "linear-gradient(145deg, #D4BE8C 0%, #C4AE7C 50%, #B49E6C 100%)" },
    { id: "dark-oak", name: "Dark Oak", description: "Sophisticated dark tones", gradient: "linear-gradient(145deg, #5C4033 0%, #4A3228 50%, #3E2A20 100%)" },
    { id: "grey-wood", name: "Grey Wood", description: "Modern grey finish", gradient: "linear-gradient(145deg, #B2BEB5 0%, #A0ACA3 50%, #8E9A91 100%)" },
    { id: "walnut", name: "Walnut", description: "Classic walnut look", gradient: "linear-gradient(145deg, #A0845C 0%, #90744C 50%, #80643C 100%)" },
    { id: "ash-white", name: "Ash White", description: "Clean minimal style", gradient: "linear-gradient(145deg, #F0EAE2 0%, #E8E0D5 50%, #DDD0C4 100%)" },
    { id: "honey-maple", name: "Honey Maple", description: "Warm golden tone", gradient: "linear-gradient(145deg, #D4A843 0%, #C49830 50%, #B48820 100%)" },
  ],
  wood: [
    { id: "natural-oak", name: "Natural Oak", description: "Timeless classic grain", gradient: "linear-gradient(145deg, #C9A96E 0%, #B8944F 50%, #A88040 100%)" },
    { id: "dark-walnut", name: "Dark Walnut", description: "Rich deep tones", gradient: "linear-gradient(145deg, #5C4033 0%, #4A3228 50%, #3E2A20 100%)" },
    { id: "cherry", name: "Cherry", description: "Warm reddish brown", gradient: "linear-gradient(145deg, #9F5030 0%, #8F4020 50%, #7F3010 100%)" },
    { id: "birch", name: "Birch", description: "Light Scandinavian feel", gradient: "linear-gradient(145deg, #F5E9D4 0%, #EDE0C4 50%, #E3D4B4 100%)" },
    { id: "mahogany", name: "Mahogany", description: "Luxurious deep red", gradient: "linear-gradient(145deg, #803020 0%, #702010 50%, #601008 100%)" },
    { id: "teak", name: "Teak", description: "Durable golden brown", gradient: "linear-gradient(145deg, #B08050 0%, #A07040 50%, #906030 100%)" },
  ],
  tile: [
    { id: "marble-white", name: "Marble White", description: "Elegant veined marble", gradient: "linear-gradient(145deg, #F5F0E8 0%, #EDE5D8 50%, #E5DCCC 100%)" },
    { id: "terrazzo", name: "Terrazzo", description: "Speckled modern look", gradient: "linear-gradient(145deg, #E8DCC8 0%, #DCD0BC 50%, #D0C4B0 100%)" },
    { id: "slate-grey", name: "Slate Grey", description: "Industrial cool tone", gradient: "linear-gradient(145deg, #708090 0%, #607080 50%, #506070 100%)" },
    { id: "beige-stone", name: "Beige Stone", description: "Warm neutral finish", gradient: "linear-gradient(145deg, #D2B48C 0%, #C4A47C 50%, #B6946C 100%)" },
    { id: "charcoal", name: "Charcoal", description: "Bold dark contrast", gradient: "linear-gradient(145deg, #36454F 0%, #2C3940 50%, #222E34 100%)" },
    { id: "sand-beige", name: "Sand Beige", description: "Soft desert tones", gradient: "linear-gradient(145deg, #F4E7D3 0%, #E8D5B5 50%, #DCC9A3 100%)" },
  ],
  carpet: [
    { id: "ivory", name: "Ivory", description: "Soft neutral elegance", gradient: "linear-gradient(145deg, #FFFFF0 0%, #F5F5DC 50%, #FAF0E6 100%)" },
    { id: "charcoal", name: "Charcoal", description: "Deep rich texture", gradient: "linear-gradient(145deg, #36454F 0%, #2C3940 50%, #222E34 100%)" },
    { id: "burgundy", name: "Burgundy", description: "Classic luxury red", gradient: "linear-gradient(145deg, #800020 0%, #700018 50%, #600010 100%)" },
    { id: "navy", name: "Navy", description: "Professional deep blue", gradient: "linear-gradient(145deg, #1B2A4A 0%, #152240 50%, #101A36 100%)" },
    { id: "beige", name: "Beige", description: "Versatile warm tone", gradient: "linear-gradient(145deg, #F5F0E8 0%, #EDE5D8 50%, #E5DCCC 100%)" },
    { id: "forest-green", name: "Forest Green", description: "Nature-inspired calm", gradient: "linear-gradient(145deg, #2D5A27 0%, #254A20 50%, #1D3A18 100%)" },
  ],
  outdoor: [
    { id: "teak-natural", name: "Teak Natural", description: "Weather-resistant classic", gradient: "linear-gradient(145deg, #B08050 0%, #A07040 50%, #906030 100%)" },
    { id: "grey-composite", name: "Grey Composite", description: "Modern low-maintenance", gradient: "linear-gradient(145deg, #9C9C9C 0%, #8C8C8C 50%, #7C7C7C 100%)" },
    { id: "sandstone", name: "Sandstone", description: "Natural earthy look", gradient: "linear-gradient(145deg, #D2C4A8 0%, #C2B498 50%, #B2A488 100%)" },
    { id: "dark-wood", name: "Dark Wood", description: "Bold deck statement", gradient: "linear-gradient(145deg, #4B3832 0%, #3C2A22 50%, #2D1E15 100%)" },
    { id: "terracotta", name: "Terracotta", description: "Mediterranean warmth", gradient: "linear-gradient(145deg, #CC6644 0%, #BC5634 50%, #AC4624 100%)" },
    { id: "slate", name: "Slate", description: "Cool stone texture", gradient: "linear-gradient(145deg, #708090 0%, #607080 50%, #506070 100%)" },
  ],
  stone: [
    { id: "marble-white", name: "Marble White", description: "Luxury veined finish", gradient: "linear-gradient(145deg, #F5F0E8 0%, #EDE5D8 50%, #E5DCCC 100%)" },
    { id: "granite-black", name: "Granite Black", description: "Dramatic dark stone", gradient: "linear-gradient(145deg, #2C2C2C 0%, #1E1E1E 50%, #141414 100%)" },
    { id: "travertine", name: "Travertine", description: "Warm textured look", gradient: "linear-gradient(145deg, #D4BE8C 0%, #C4AE7C 50%, #B49E6C 100%)" },
    { id: "limestone", name: "Limestone", description: "Subtle natural beauty", gradient: "linear-gradient(145deg, #C8BCA8 0%, #B8AC98 50%, #A89C88 100%)" },
    { id: "slate-blue", name: "Blue Slate", description: "Unique blue-grey tones", gradient: "linear-gradient(145deg, #6D7B8D 0%, #5D6B7D 50%, #4D5B6D 100%)" },
    { id: "sandstone", name: "Sandstone", description: "Earthy desert palette", gradient: "linear-gradient(145deg, #D2C4A8 0%, #C2B498 50%, #B2A488 100%)" },
  ],
  concrete: [
    { id: "polished-grey", name: "Polished Grey", description: "Sleek industrial", gradient: "linear-gradient(145deg, #9C9C9C 0%, #8C8C8C 50%, #7C7C7C 100%)" },
    { id: "raw-concrete", name: "Raw Concrete", description: "Natural cement look", gradient: "linear-gradient(145deg, #B2BEB5 0%, #A0ACA3 50%, #8E9A91 100%)" },
    { id: "dark-cement", name: "Dark Cement", description: "Bold moody finish", gradient: "linear-gradient(145deg, #5C5C5C 0%, #4C4C4C 50%, #3C3C3C 100%)" },
    { id: "sand-wash", name: "Sand Wash", description: "Warm textured surface", gradient: "linear-gradient(145deg, #D2B48C 0%, #C4A47C 50%, #B6946C 100%)" },
  ],
  resin: [
    { id: "clear-gloss", name: "Clear Gloss", description: "High-shine transparent", gradient: "linear-gradient(145deg, #E8E0D5 0%, #DDD5C8 50%, #D0C8BC 100%)" },
    { id: "metallic-silver", name: "Metallic Silver", description: "Shimmering modern", gradient: "linear-gradient(145deg, #C0C0C0 0%, #B0B0B0 50%, #A0A0A0 100%)" },
    { id: "charcoal-matte", name: "Charcoal Matte", description: "Understated elegance", gradient: "linear-gradient(145deg, #5C5C5C 0%, #4C4C4C 50%, #3C3C3C 100%)" },
    { id: "beige-epoxy", name: "Beige Epoxy", description: "Clean warm base", gradient: "linear-gradient(145deg, #F4E7D3 0%, #E8D5B5 50%, #DCC9A3 100%)" },
  ],
  rubber: [
    { id: "classic-black", name: "Classic Black", description: "Standard gym floor", gradient: "linear-gradient(145deg, #2C2C2C 0%, #1E1E1E 50%, #141414 100%)" },
    { id: "sports-blue", name: "Sports Blue", description: "Court & track blue", gradient: "linear-gradient(145deg, #1B4F8A 0%, #153F7A 50%, #10306A 100%)" },
    { id: "safety-red", name: "Safety Red", description: "High-visibility zones", gradient: "linear-gradient(145deg, #CC3333 0%, #BB2222 50%, #AA1111 100%)" },
    { id: "grey-speckle", name: "Grey Speckle", description: "Commercial utility", gradient: "linear-gradient(145deg, #8E8E82 0%, #7E7E72 50%, #6E6E62 100%)" },
  ],
};

export const getCategoryShades = (categoryId: string): CategoryShade[] => {
  return categoryShades[categoryId] || [];
};
