export interface Shade {
  id: string;
  name: string;
  gradient: string; // CSS gradient for visual swatch
}

export interface ShadeGroup {
  id: string;
  name: string;
  shades: Shade[];
}

export const shadeGroups: ShadeGroup[] = [
  {
    id: "light",
    name: "Light",
    shades: [
      { id: "ivory", name: "Ivory", gradient: "linear-gradient(145deg, #FFFFF0 0%, #F5F5DC 50%, #FAF0E6 100%)" },
      { id: "sand", name: "Sand", gradient: "linear-gradient(145deg, #F4E7D3 0%, #E8D5B5 50%, #DCC9A3 100%)" },
      { id: "pearl", name: "Pearl", gradient: "linear-gradient(145deg, #F0EAE2 0%, #E8E0D5 50%, #F5EFE7 100%)" },
      { id: "cream", name: "Cream", gradient: "linear-gradient(145deg, #FFFDD0 0%, #F5E6C8 50%, #F0DEB4 100%)" },
      { id: "beige-mist", name: "Beige Mist", gradient: "linear-gradient(145deg, #F5F0E8 0%, #EDE5D8 50%, #E5DCCC 100%)" },
      { id: "white-oak", name: "White Oak", gradient: "linear-gradient(145deg, #F2E8D6 0%, #E8DBC4 50%, #DDD0B8 100%)" },
      { id: "birch", name: "Birch", gradient: "linear-gradient(145deg, #F5E9D4 0%, #EDE0C4 50%, #E3D4B4 100%)" },
      { id: "cotton", name: "Cotton", gradient: "linear-gradient(145deg, #FAF5EF 0%, #F0E8DD 50%, #E8DFD0 100%)" },
    ],
  },
  {
    id: "medium",
    name: "Medium",
    shades: [
      { id: "natural-oak", name: "Natural Oak", gradient: "linear-gradient(145deg, #C9A96E 0%, #B8944F 50%, #A88040 100%)" },
      { id: "honey", name: "Honey", gradient: "linear-gradient(145deg, #D4A843 0%, #C49830 50%, #B48820 100%)" },
      { id: "walnut-lite", name: "Walnut Lite", gradient: "linear-gradient(145deg, #A0845C 0%, #90744C 50%, #80643C 100%)" },
      { id: "caramel", name: "Caramel", gradient: "linear-gradient(145deg, #C68E4E 0%, #B67E3E 50%, #A66E2E 100%)" },
      { id: "maple", name: "Maple", gradient: "linear-gradient(145deg, #C4A265 0%, #B49255 50%, #A48245 100%)" },
      { id: "almond", name: "Almond", gradient: "linear-gradient(145deg, #D2B48C 0%, #C4A47C 50%, #B6946C 100%)" },
      { id: "teak", name: "Teak", gradient: "linear-gradient(145deg, #B08050 0%, #A07040 50%, #906030 100%)" },
      { id: "sahara", name: "Sahara", gradient: "linear-gradient(145deg, #C4A468 0%, #B49458 50%, #A48448 100%)" },
    ],
  },
  {
    id: "dark",
    name: "Dark",
    shades: [
      { id: "dark-walnut", name: "Dark Walnut", gradient: "linear-gradient(145deg, #5C4033 0%, #4A3228 50%, #3E2A20 100%)" },
      { id: "espresso", name: "Espresso", gradient: "linear-gradient(145deg, #4B3832 0%, #3C2A22 50%, #2D1E15 100%)" },
      { id: "chocolate", name: "Chocolate", gradient: "linear-gradient(145deg, #5C3A21 0%, #4E2E18 50%, #40220F 100%)" },
      { id: "smoked-oak", name: "Smoked Oak", gradient: "linear-gradient(145deg, #5A4632 0%, #4A3822 50%, #3C2C18 100%)" },
      { id: "wenge", name: "Wenge", gradient: "linear-gradient(145deg, #3C352E 0%, #2E2820 50%, #201C15 100%)" },
      { id: "charcoal", name: "Charcoal", gradient: "linear-gradient(145deg, #36454F 0%, #2C3940 50%, #222E34 100%)" },
      { id: "ebony", name: "Ebony", gradient: "linear-gradient(145deg, #3C3022 0%, #2E2418 50%, #221810 100%)" },
      { id: "midnight", name: "Midnight", gradient: "linear-gradient(145deg, #2C2C3A 0%, #22222E 50%, #181822 100%)" },
    ],
  },
  {
    id: "grey",
    name: "Grey",
    shades: [
      { id: "ash-grey", name: "Ash Grey", gradient: "linear-gradient(145deg, #B2BEB5 0%, #A0ACA3 50%, #8E9A91 100%)" },
      { id: "concrete-grey", name: "Concrete Grey", gradient: "linear-gradient(145deg, #9C9C9C 0%, #8C8C8C 50%, #7C7C7C 100%)" },
      { id: "silver-oak", name: "Silver Oak", gradient: "linear-gradient(145deg, #C0B8A8 0%, #B0A898 50%, #A09888 100%)" },
      { id: "slate", name: "Slate", gradient: "linear-gradient(145deg, #708090 0%, #607080 50%, #506070 100%)" },
      { id: "mist-grey", name: "Mist Grey", gradient: "linear-gradient(145deg, #C4C4BC 0%, #B4B4AC 50%, #A4A49C 100%)" },
      { id: "graphite", name: "Graphite", gradient: "linear-gradient(145deg, #5C5C5C 0%, #4C4C4C 50%, #3C3C3C 100%)" },
      { id: "pewter", name: "Pewter", gradient: "linear-gradient(145deg, #8E8E82 0%, #7E7E72 50%, #6E6E62 100%)" },
      { id: "storm", name: "Storm", gradient: "linear-gradient(145deg, #6D7B8D 0%, #5D6B7D 50%, #4D5B6D 100%)" },
    ],
  },
  {
    id: "natural",
    name: "Natural",
    shades: [
      { id: "raw-oak", name: "Raw Oak", gradient: "linear-gradient(145deg, #D4BE8C 0%, #C4AE7C 50%, #B49E6C 100%)" },
      { id: "natural-pine", name: "Natural Pine", gradient: "linear-gradient(145deg, #DCC89A 0%, #CCB88A 50%, #BCA87A 100%)" },
      { id: "driftwood", name: "Driftwood", gradient: "linear-gradient(145deg, #B8A88C 0%, #A8987C 50%, #98886C 100%)" },
      { id: "linen", name: "Linen", gradient: "linear-gradient(145deg, #E8DCC8 0%, #DCD0BC 50%, #D0C4B0 100%)" },
      { id: "stonewash", name: "Stonewash", gradient: "linear-gradient(145deg, #C8BCA8 0%, #B8AC98 50%, #A89C88 100%)" },
      { id: "rustic", name: "Rustic", gradient: "linear-gradient(145deg, #A89070 0%, #988060 50%, #887050 100%)" },
      { id: "bamboo", name: "Bamboo", gradient: "linear-gradient(145deg, #D4C48C 0%, #C4B47C 50%, #B4A46C 100%)" },
      { id: "sandstone", name: "Sandstone", gradient: "linear-gradient(145deg, #D2C4A8 0%, #C2B498 50%, #B2A488 100%)" },
    ],
  },
  {
    id: "warm",
    name: "Warm",
    shades: [
      { id: "amber", name: "Amber", gradient: "linear-gradient(145deg, #D4930D 0%, #C4830D 50%, #B4730D 100%)" },
      { id: "cinnamon", name: "Cinnamon", gradient: "linear-gradient(145deg, #A0522D 0%, #90421D 50%, #803210 100%)" },
      { id: "toffee", name: "Toffee", gradient: "linear-gradient(145deg, #A87040 0%, #986030 50%, #885020 100%)" },
      { id: "golden-oak", name: "Golden Oak", gradient: "linear-gradient(145deg, #C49B40 0%, #B48B30 50%, #A47B20 100%)" },
      { id: "copper", name: "Copper", gradient: "linear-gradient(145deg, #B87333 0%, #A86323 50%, #985313 100%)" },
      { id: "warm-teak", name: "Warm Teak", gradient: "linear-gradient(145deg, #9C7050 0%, #8C6040 50%, #7C5030 100%)" },
      { id: "cognac", name: "Cognac", gradient: "linear-gradient(145deg, #9F5030 0%, #8F4020 50%, #7F3010 100%)" },
      { id: "terracotta", name: "Terracotta", gradient: "linear-gradient(145deg, #CC6644 0%, #BC5634 50%, #AC4624 100%)" },
    ],
  },
];

export const getAllShades = (): Shade[] => shadeGroups.flatMap((g) => g.shades);

export const getShadeById = (id: string): Shade | undefined => getAllShades().find((s) => s.id === id);
