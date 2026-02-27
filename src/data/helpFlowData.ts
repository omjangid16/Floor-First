import { type HelpFlowNode } from "./helpCenter/types";

export const helpFlowData: Record<string, HelpFlowNode> = {
  // ─── ROOT ────────────────────────────────────
  root: {
    message: "Hello! Welcome to Floor First Help Center.\n\n**How can I assist you today?**",
    options: [
      { label: "Product Selection Help", value: "selection" },
      { label: "Pricing & Calculator Help", value: "pricing" },
      { label: "Orders, Delivery & Installation", value: "orders" },
      { label: "Warranty & Maintenance", value: "warranty" },
      { label: "Design & Consultation", value: "design" },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },

  // ─── PRODUCT SELECTION ───────────────────────
  selection: {
    message: "Great! I'd love to help you find the perfect flooring.\n\n**Where do you need flooring?**",
    options: [
      { label: "Home", value: "sel-home" },
      { label: "Office", value: "sel-office" },
      { label: "Commercial Shop", value: "sel-commercial" },
      { label: "Warehouse", value: "sel-warehouse" },
      { label: "Gym", value: "sel-gym" },
      { label: "Outdoor Area", value: "sel-outdoor" },
    ],
  },
  "sel-home": {
    message: "Perfect! For your home, the room matters a lot.\n\n**Which room are you focusing on?**",
    options: [
      { label: "Living Room", value: "sel-home-living" },
      { label: "Bedroom", value: "sel-home-bedroom" },
      { label: "Kitchen", value: "sel-home-kitchen" },
      { label: "Bathroom", value: "sel-home-bathroom" },
    ],
  },
  "sel-home-living": {
    message: "For living rooms, you want a balance of beauty and durability.\n\n**Our top recommendations:**\n\n- **Engineered Wood** — Warm, natural, timeless\n- **SPC Vinyl** — Waterproof, scratch-resistant\n- **Porcelain Tiles** — Marble-look elegance\n\n**What matters most to you?**",
    options: [
      { label: "Prefer warm wood look", value: "sel-prefer-wood" },
      { label: "Prefer stone/marble look", value: "sel-prefer-stone" },
      { label: "Need waterproof option", value: "sel-prefer-waterproof" },
      { label: "Need budget-friendly option", value: "sel-prefer-budget" },
      { label: "Show best sellers", value: "sel-bestsellers" },
    ],
  },
  "sel-home-bedroom": {
    message: "Bedrooms call for comfort and warmth underfoot.\n\n**Our top picks for bedrooms:**\n\n- **Hardwood/Engineered** — Natural warmth\n- **Carpet** — Soft and cozy\n- **SPC Vinyl Wood-Look** — Warm feel, easy care\n\n**What's your preference?**",
    options: [
      { label: "Prefer warm wood look", value: "sel-prefer-wood" },
      { label: "Want soft carpet", value: "sel-prefer-carpet" },
      { label: "Need budget option", value: "sel-prefer-budget" },
      { label: "Show best sellers", value: "sel-bestsellers" },
    ],
  },
  "sel-home-kitchen": {
    message: "Kitchens need waterproof, easy-to-clean flooring.\n\n**Best options for kitchens:**\n\n- **Porcelain Tiles** — Waterproof, hygienic\n- **SPC Vinyl** — Waterproof, softer underfoot\n- **Epoxy** — Seamless, modern look\n\n**What appeals to you?**",
    options: [
      { label: "Classic tile look", value: "sel-prefer-tile" },
      { label: "Modern seamless look", value: "sel-prefer-resin" },
      { label: "Need budget option", value: "sel-prefer-budget" },
      { label: "Show best sellers", value: "sel-bestsellers" },
    ],
  },
  "sel-home-bathroom": {
    message: "Bathrooms demand waterproof, anti-slip flooring.\n\n**Top bathroom options:**\n\n- **Porcelain Tiles** — Anti-slip rated\n- **Natural Stone** — Luxury marble/travertine\n- **LVT Vinyl** — Waterproof, warm\n\n**What's your style?**",
    options: [
      { label: "Prefer stone/marble look", value: "sel-prefer-stone" },
      { label: "Need anti-slip rated", value: "sel-prefer-tile" },
      { label: "Need budget option", value: "sel-prefer-budget" },
      { label: "Show best sellers", value: "sel-bestsellers" },
    ],
  },
  "sel-prefer-wood": {
    message: "Excellent choice! Wood brings warmth and character.\n\n**Here are our wood flooring categories:**\n\n- **Engineered Wood** — AED 249–449/sqft\n- **Solid Hardwood** — AED 129–549/sqft\n- **Laminate** — AED 59–69/sqft\n- **Parquet** — AED 379–429/sqft\n\n**What would you like to do next?**",
    options: [
      { label: "Browse Wood Flooring", value: "link:/products?type=wood", isLink: true },
      { label: "Compare top 3 options", value: "sel-compare-wood" },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-compare-wood": {
    message: "**Top 3 Wood Flooring Compared:**\n\n| Feature | Engineered Oak | Herringbone Parquet | Laminate |\n|---------|---------------|--------------------|---------|\n| Price/sqft | AED 249–349 | AED 379–429 | AED 59–69 |\n| Durability | High | High | Medium |\n| Maintenance | Medium | Medium | Easy |\n| Best For | Living/Bedroom | Luxury Spaces | Budget |\n\n**What would you like to do?**",
    options: [
      { label: "Browse all wood products", value: "link:/products?type=wood", isLink: true },
      { label: "Get a quote", value: "link:/get-quote", isLink: true },
      { label: "Add to cart", value: "link:/products?type=wood", isLink: true },
      { label: "Talk to an expert", value: "expert" },
    ],
  },
  "sel-prefer-stone": {
    message: "Natural stone is the epitome of luxury.\n\n**Our stone collection includes:**\n\n- **Marble** — Carrara, Statuario, Emperador\n- **Granite** — Black Galaxy, Grey\n- **Travertine** — Mediterranean warmth\n- **Limestone** — Subtle elegance\n\n**What would you like to do?**",
    options: [
      { label: "Browse Stone Flooring", value: "link:/products?type=stone", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Get a quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-prefer-waterproof": {
    message: "Great choice! Here are our best waterproof options:\n\n- **SPC Vinyl** — 100% waterproof, easy install, AED 89–129/sqft\n- **Porcelain Tile** — Permanent waterproofing, AED 79–399/sqft\n- **Epoxy Resin** — Seamless waterproofing, AED 65–129/sqft\n\n**What interests you?**",
    options: [
      { label: "Browse Vinyl & SPC", value: "link:/products?type=vinyl", isLink: true },
      { label: "Browse Tile Flooring", value: "link:/products?type=tile", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-prefer-budget": {
    message: "Smart budgeting! Here are great options under AED 100/sqft:\n\n- **SPC Vinyl Oak** — AED 89/sqft, waterproof\n- **Chevron Laminate** — AED 69/sqft, stylish\n- **Subway Metro Tile** — AED 79/sqft, classic\n- **Epoxy Floor** — AED 65/sqft, industrial\n- **Rubber Gym Tiles** — AED 59/sqft, durable\n\n**What would you like to do?**",
    options: [
      { label: "Browse all products", value: "link:/products", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Get a quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-prefer-carpet": {
    message: "Carpet is the coziest option!\n\n**Our carpet range:**\n\n- **Broadloom Wall-to-Wall** — AED 129–199/sqft\n- **Carpet Tiles** — AED 59–119/sqft\n- **Area Rugs** — AED 99–349/sqft\n- **Natural Sisal** — AED 99/sqft\n\n**What appeals to you?**",
    options: [
      { label: "Browse Carpet Flooring", value: "link:/products?type=carpet", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-prefer-tile": {
    message: "Tiles are incredibly versatile!\n\n**Our tile collection:**\n\n- **Porcelain** — AED 79–399/sqft\n- **Ceramic** — AED 79–229/sqft\n- **Mosaic** — AED 149–169/sqft\n- **Wood-Look Porcelain** — AED 159/sqft\n\n**What would you like to do?**",
    options: [
      { label: "Browse Tile Flooring", value: "link:/products?type=tile", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-prefer-resin": {
    message: "Resin floors create stunning seamless surfaces!\n\n**Options include:**\n\n- **Metallic Epoxy** — Unique marble effects\n- **Micro-Cement** — Contemporary raw look\n- **Clear Self-Leveling** — Mirror finish\n\n**What would you like to do?**",
    options: [
      { label: "Browse Resin Flooring", value: "link:/products?type=resin", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-bestsellers": {
    message: "**Our Best Sellers:**\n\n1. **Calacatta Gold Marble Tile** — AED 289/sqft\n2. **SPC Luxury Vinyl Oak** — AED 89/sqft\n3. **Herringbone Oak Parquet** — AED 399/sqft\n\nThese are loved by our customers for their quality and value.\n\n**What would you like to do?**",
    options: [
      { label: "Browse all products", value: "link:/products", isLink: true },
      { label: "Get a quote", value: "link:/get-quote", isLink: true },
      { label: "Add to cart", value: "link:/products", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-office": {
    message: "For offices, durability and acoustics are key.\n\n**Top picks for offices:**\n\n- **Carpet Tiles** — Great acoustics, easy replacement\n- **SPC Vinyl** — Waterproof, scratch-resistant\n- **Laminate** — Budget-friendly, stylish\n\n**What matters most?**",
    options: [
      { label: "Best acoustics", value: "sel-prefer-carpet" },
      { label: "Most durable", value: "sel-prefer-waterproof" },
      { label: "Budget friendly", value: "sel-prefer-budget" },
      { label: "Show all office products", value: "link:/products", isLink: true },
    ],
  },
  "sel-commercial": {
    message: "For commercial shops, you need eye-catching yet durable flooring.\n\n**Recommended:**\n\n- **Large Format Porcelain** — Premium look\n- **SPC Vinyl** — Quick installation\n- **Polished Epoxy** — Modern, seamless\n\n**What would you like?**",
    options: [
      { label: "Browse Tile Flooring", value: "link:/products?type=tile", isLink: true },
      { label: "Browse Resin Flooring", value: "link:/products?type=resin", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-warehouse": {
    message: "For warehouses, industrial-grade is essential.\n\n**Best options:**\n\n- **Heavy-Duty Epoxy** — AED 65/sqft, chemical resistant\n- **PU Screed** — AED 95/sqft, impact resistant\n- **Rubber Tiles** — AED 59/sqft, shock absorbing\n\n**What would you like?**",
    options: [
      { label: "Browse Resin Flooring", value: "link:/products?type=resin", isLink: true },
      { label: "Browse Rubber Flooring", value: "link:/products?type=rubber", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-gym": {
    message: "For gyms, safety and performance are critical.\n\n**Our gym solutions:**\n\n- **Rubber Gym Tiles** — AED 59/sqft\n- **Olympic Platforms** — AED 89/sqft\n- **Sports Court Surface** — AED 79/sqft\n\n**What type of gym?**",
    options: [
      { label: "Browse Rubber & Sports", value: "link:/products?type=rubber", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Get a quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },
  "sel-outdoor": {
    message: "For outdoor areas, weather resistance is key.\n\n**Top outdoor options:**\n\n- **WPC Decking** — AED 159–219/sqft\n- **Porcelain Pavers** — AED 199/sqft\n- **Ipe Hardwood** — AED 349/sqft\n- **Rubber Playground** — AED 79/sqft\n\n**What's your outdoor space?**",
    options: [
      { label: "Browse Outdoor & Deck", value: "link:/products?type=outdoor", isLink: true },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to an Expert", value: "expert" },
    ],
  },

  // ─── PRICING ─────────────────────────────────
  pricing: {
    message: "I can help you understand our pricing and get estimates!\n\n**What would you like to know?**",
    options: [
      { label: "How pricing works", value: "pricing-how" },
      { label: "How to measure area", value: "pricing-measure" },
      { label: "Installation costs", value: "pricing-install" },
      { label: "Budget ranges (AED)", value: "pricing-ranges" },
      { label: "Use Calculator Now", value: "link:/calculator", isLink: true },
    ],
  },
  "pricing-how": {
    message: "**How our pricing works:**\n\n1. **Material Cost** — Price per sqft varies by type\n2. **Installation** — Starts from AED 25/sqft\n3. **Add-ons** — Underlay (AED 8/sqft), Skirting (AED 15/linear ft)\n4. **Delivery** — Free for orders above AED 5,000\n\nAll prices include VAT. Bulk discounts available for large projects.\n\n**What else would you like to know?**",
    options: [
      { label: "See budget ranges", value: "pricing-ranges" },
      { label: "Use Calculator", value: "link:/calculator", isLink: true },
      { label: "Get instant quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to expert", value: "expert" },
    ],
  },
  "pricing-measure": {
    message: "**How to measure your space:**\n\n**Do you know your area measurements?**",
    options: [
      { label: "I know sqft already", value: "pricing-measure-known" },
      { label: "I know length & width", value: "pricing-measure-lw" },
      { label: "I need help measuring", value: "pricing-measure-help" },
    ],
  },
  "pricing-measure-known": {
    message: "Great! Simply enter your sqft into our calculator and get an instant estimate.\n\n**What would you like to do?**",
    options: [
      { label: "Open Calculator", value: "link:/calculator", isLink: true },
      { label: "Get instant quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to expert", value: "expert" },
    ],
  },
  "pricing-measure-lw": {
    message: "**Simple formula:**\n\n**Area = Length x Width**\n\nExample: A room that is 15ft x 12ft = **180 sqft**\n\n**Tip:** Add 10% extra for cuts and waste.\nSo 180 sqft + 10% = **198 sqft** (round to 200 sqft)\n\n**What would you like to do?**",
    options: [
      { label: "Open Calculator", value: "link:/calculator", isLink: true },
      { label: "Get instant quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to expert", value: "expert" },
    ],
  },
  "pricing-measure-help": {
    message: "No worries! We offer **free site measurement** for projects in the UAE.\n\nA team member will visit your site, take accurate measurements, and provide a detailed quote.\n\n**How would you like to proceed?**",
    options: [
      { label: "Book free site visit", value: "link:/get-quote", isLink: true },
      { label: "Talk to expert", value: "expert" },
      { label: "Try Calculator with estimate", value: "link:/calculator", isLink: true },
    ],
  },
  "pricing-install": {
    message: "**Installation Pricing:**\n\n- **Standard Installation** — AED 25/sqft\n- **Complex Patterns (Herringbone)** — AED 35/sqft\n- **Epoxy/Resin Application** — AED 30–45/sqft\n- **Outdoor Decking** — AED 30/sqft\n\nAll installations include surface preparation and come with a workmanship warranty.\n\n**What else can I help with?**",
    options: [
      { label: "Open Calculator", value: "link:/calculator", isLink: true },
      { label: "Book installation", value: "link:/get-quote", isLink: true },
      { label: "Talk to expert", value: "expert" },
    ],
  },
  "pricing-ranges": {
    message: "**Budget Ranges Guide:**\n\n**Economy (AED 59–119/sqft)**\nLaminate, SPC Vinyl, PVC, Rubber\n\n**Mid-Range (AED 129–199/sqft)**\nCarpet, Outdoor Decking, Ceramic Tiles\n\n**Premium (AED 200–399/sqft)**\nEngineered Wood, Porcelain, Stone\n\n**Luxury (AED 400–799/sqft)**\nHardwood, Marble, Onyx\n\n**What budget range interests you?**",
    options: [
      { label: "Browse budget products", value: "sel-prefer-budget" },
      { label: "Browse premium products", value: "link:/products", isLink: true },
      { label: "Open Calculator", value: "link:/calculator", isLink: true },
      { label: "Talk to expert", value: "expert" },
    ],
  },

  // ─── ORDERS ──────────────────────────────────
  orders: {
    message: "I can help with your orders and installation.\n\n**What do you need help with?**",
    options: [
      { label: "How to place an order", value: "orders-place" },
      { label: "Delivery timelines", value: "orders-delivery" },
      { label: "Installation scheduling", value: "orders-install" },
      { label: "Rescheduling / Cancellation", value: "orders-cancel" },
      { label: "Order tracking", value: "orders-track" },
    ],
  },
  "orders-place": {
    message: "**How to place an order:**\n\n1. Browse our products and add to cart\n2. Review your cart and quantities\n3. Enter delivery details\n4. Choose installation date (optional)\n5. Confirm and pay\n\nYou can also submit a quote request and our team will prepare a custom order for you.\n\n**What would you like to do?**",
    options: [
      { label: "Browse Products", value: "link:/products", isLink: true },
      { label: "Request a Quote", value: "link:/get-quote", isLink: true },
      { label: "Talk to agent", value: "expert" },
    ],
  },
  "orders-delivery": {
    message: "**Delivery Information:**\n\n- **Standard Delivery:** 3–5 business days\n- **Express Delivery:** 1–2 business days (+AED 200)\n- **Free Delivery:** Orders above AED 5,000\n\nWe deliver across all Emirates in the UAE.\n\n**Need anything else?**",
    options: [
      { label: "Track my order", value: "orders-track" },
      { label: "Schedule installation", value: "orders-install" },
      { label: "Talk to agent", value: "expert" },
    ],
  },
  "orders-install": {
    message: "**Installation Scheduling:**\n\nOur installation team is available **Sunday to Saturday, 8AM–6PM**.\n\nSteps:\n1. Choose your preferred date during checkout\n2. Our team confirms within 24 hours\n3. Pre-installation site check (for large projects)\n4. Professional installation by certified team\n\n**What would you like to do?**",
    options: [
      { label: "Book installation", value: "link:/get-quote", isLink: true },
      { label: "Talk to agent", value: "expert" },
    ],
  },
  "orders-cancel": {
    message: "**Rescheduling & Cancellation:**\n\nTo reschedule or cancel, contact us at least **48 hours** before the scheduled date.\n\n- No cancellation fee if within 48 hours\n- Rescheduling is free (subject to availability)\n- Materials can be returned within 14 days (unopened)\n\n**How can I help?**",
    options: [
      { label: "Talk to agent", value: "expert" },
      { label: "Go back to orders", value: "orders" },
    ],
  },
  "orders-track": {
    message: "**Order Tracking:**\n\nTo track your order, please contact our team with your order number.\n\n**Call:** +971 55 166 7112\n**Email:** orders@floorfirst.ae\n**WhatsApp:** Click to chat\n\n**What else can I help with?**",
    options: [
      { label: "Talk to agent", value: "expert" },
      { label: "Schedule installation", value: "orders-install" },
      { label: "Go back to main menu", value: "root" },
    ],
  },

  // ─── WARRANTY ────────────────────────────────
  warranty: {
    message: "I can help with warranty and maintenance questions.\n\n**What do you need?**",
    options: [
      { label: "Warranty coverage", value: "warranty-coverage" },
      { label: "Maintenance tips", value: "warranty-maintenance" },
      { label: "Cleaning products allowed", value: "warranty-cleaning" },
      { label: "Damage / Replacement", value: "warranty-damage" },
    ],
  },
  "warranty-coverage": {
    message: "**Warranty Coverage by Type:**\n\n- **Wood** — 10–25 years (structural)\n- **Tile/Stone** — 15–Lifetime\n- **Vinyl/SPC** — 10–20 years\n- **Carpet** — 5–15 years\n- **Resin** — 10–15 years\n- **Rubber** — 5–15 years\n\nWarranty covers manufacturing defects. Installation warranty: 2 years.\n\n**What else do you need?**",
    options: [
      { label: "Show care guide", value: "warranty-maintenance" },
      { label: "Talk to support", value: "expert" },
      { label: "Request site visit", value: "link:/get-quote", isLink: true },
    ],
  },
  "warranty-maintenance": {
    message: "**General Maintenance Tips:**\n\n- **Daily:** Sweep or vacuum to remove debris\n- **Weekly:** Damp mop with pH-neutral cleaner\n- **Avoid:** Harsh chemicals, abrasive tools, excess water\n- **Tip:** Use felt pads under furniture legs\n\nSpecific care varies by material type.\n\n**Want material-specific guidance?**",
    options: [
      { label: "Wood care guide", value: "warranty-care-wood" },
      { label: "Tile/Stone care guide", value: "warranty-care-tile" },
      { label: "Vinyl care guide", value: "warranty-care-vinyl" },
      { label: "Talk to support", value: "expert" },
    ],
  },
  "warranty-care-wood": {
    message: "**Wood Floor Care:**\n\n**Do:**\n- Use microfiber mop\n- Wood-specific cleaner only\n- Wipe spills immediately\n- Maintain 40–60% humidity\n- Refinish every 5–7 years (hardwood)\n\n**Don't:**\n- Never use steam mop\n- Never use wax on lacquered floors\n- Avoid dragging furniture\n\n**What else can I help with?**",
    options: [
      { label: "Browse wood products", value: "link:/products?type=wood", isLink: true },
      { label: "Talk to support", value: "expert" },
      { label: "Back to main menu", value: "root" },
    ],
  },
  "warranty-care-tile": {
    message: "**Tile & Stone Care:**\n\n**Do:**\n- Seal natural stone annually\n- Use pH-neutral stone cleaner\n- Clean grout lines regularly\n- Polish marble periodically\n\n**Don't:**\n- Never use vinegar on marble\n- Avoid acidic cleaners on stone\n- Don't let stains sit\n\n**What else can I help with?**",
    options: [
      { label: "Browse tile products", value: "link:/products?type=tile", isLink: true },
      { label: "Talk to support", value: "expert" },
      { label: "Back to main menu", value: "root" },
    ],
  },
  "warranty-care-vinyl": {
    message: "**Vinyl Floor Care:**\n\n**Do:**\n- Sweep/vacuum regularly\n- Damp mop weekly\n- Use vinyl-safe cleaner\n- Place mats at entrances\n\n**Don't:**\n- Never use wax or polish\n- Avoid rubber-backed mats\n- Don't use steam cleaners\n\nVinyl is the easiest flooring to maintain!\n\n**What else can I help with?**",
    options: [
      { label: "Browse vinyl products", value: "link:/products?type=vinyl", isLink: true },
      { label: "Talk to support", value: "expert" },
      { label: "Back to main menu", value: "root" },
    ],
  },
  "warranty-cleaning": {
    message: "**Approved Cleaning Products:**\n\n- **Bona Floor Cleaner** — Wood floors\n- **Lithofin** — Natural stone\n- **Dr. Schutz** — Vinyl/SPC\n- **pH-Neutral All-Purpose** — Tiles\n\nAlways test in a small area first.\n\n**Need specific advice?**",
    options: [
      { label: "Talk to support", value: "expert" },
      { label: "Back to warranty", value: "warranty" },
      { label: "Back to main menu", value: "root" },
    ],
  },
  "warranty-damage": {
    message: "**Damage & Replacement Support:**\n\nIf your floor has been damaged:\n\n1. Take photos of the damage\n2. Note your order number and installation date\n3. Contact our support team\n\nWe'll assess whether it's covered under warranty and arrange repair or replacement.\n\n**How would you like to proceed?**",
    options: [
      { label: "Talk to support", value: "expert" },
      { label: "Request site visit", value: "link:/get-quote", isLink: true },
      { label: "Back to main menu", value: "root" },
    ],
  },

  // ─── DESIGN ──────────────────────────────────
  design: {
    message: "Our design team can help bring your vision to life!\n\n**What are you looking for?**",
    options: [
      { label: "Book free consultation", value: "design-consult" },
      { label: "Online vs Site visit", value: "design-visit-type" },
      { label: "Share room photos", value: "design-photos" },
      { label: "Get recommended style", value: "design-style" },
    ],
  },
  "design-consult": {
    message: "**Free Design Consultation:**\n\nOur interior flooring experts offer complimentary consultations including:\n\n- Material recommendation based on your space\n- Color and pattern coordination\n- Budget optimization\n- 3D visualization (for large projects)\n- Sample selection\n\n**How would you like to connect?**",
    options: [
      { label: "Book online consultation", value: "link:/get-quote", isLink: true },
      { label: "Book site visit", value: "link:/get-quote", isLink: true },
      { label: "Talk to designer now", value: "expert" },
    ],
  },
  "design-visit-type": {
    message: "**Consultation Options:**\n\n**Online Consultation** (Free)\n- Video call with designer\n- Share photos of your space\n- Get instant recommendations\n- Duration: 30 minutes\n\n**Site Visit** (Free for projects >AED 10,000)\n- Designer visits your space\n- Takes measurements\n- Brings material samples\n- Duration: 1–2 hours\n\n**Which do you prefer?**",
    options: [
      { label: "Book online consultation", value: "link:/get-quote", isLink: true },
      { label: "Book site visit", value: "link:/get-quote", isLink: true },
      { label: "Talk to designer now", value: "expert" },
    ],
  },
  "design-photos": {
    message: "**Share Your Space**\n\nYou can share room photos with our design team for personalized recommendations.\n\nPlease use one of these methods:\n\n- **WhatsApp:** +971 55 166 7112\n- **Email:** design@floorfirst.ae\n- **During consultation:** Share screen/photos\n\nOur designer will suggest flooring styles, colors, and patterns that complement your interior.\n\n**What else can I help with?**",
    options: [
      { label: "Save recommendations", value: "link:/get-quote", isLink: true },
      { label: "Book site visit", value: "link:/get-quote", isLink: true },
      { label: "Talk to human designer", value: "expert" },
    ],
  },
  "design-style": {
    message: "**Popular Interior Styles & Flooring:**\n\n**Modern Minimalist**\nLarge format tiles, micro-cement, light wood\n\n**Classic/Traditional**\nMarble, herringbone parquet, broadloom carpet\n\n**Industrial/Loft**\nPolished concrete, epoxy, dark vinyl\n\n**Scandinavian**\nLight oak, white-washed wood, natural tones\n\n**Arabic/Mediterranean**\nMarble, travertine, ornate tiles\n\n**Which style resonates with you?**",
    options: [
      { label: "Browse Inspiration", value: "link:/inspiration", isLink: true },
      { label: "Book consultation", value: "link:/get-quote", isLink: true },
      { label: "Browse products", value: "link:/products", isLink: true },
      { label: "Talk to designer", value: "expert" },
    ],
  },

  // ─── EXPERT ──────────────────────────────────
  expert: {
    message: "I'm connecting you with a flooring expert.\n\n**Ahmed Hassan** — Senior Flooring Consultant\nAvailable now · 12+ years experience\n\nAhmed specializes in residential and commercial flooring projects across the UAE.\n\n**While you wait, you can start describing your project. Ahmed will see the full chat history when he joins.**",
    options: [
      { label: "Call Now: +971 55 166 7112", value: "expert-call" },
      { label: "WhatsApp Chat", value: "expert-whatsapp" },
      { label: "Go back to main menu", value: "root" },
    ],
  },
  "expert-call": {
    message: "**Calling Ahmed Hassan...**\n\nPlease dial: **+971 55 166 7112**\n\nOur team is available:\nSunday–Saturday\n9:00 AM – 7:00 PM (GST)\n\n**Is there anything else I can help with?**",
    options: [
      { label: "Continue shopping", value: "link:/products", isLink: true },
      { label: "Open calculator", value: "link:/calculator", isLink: true },
      { label: "Back to main menu", value: "root" },
    ],
  },
  "expert-whatsapp": {
    message: "**WhatsApp Chat**\n\nOpen WhatsApp and message us at:\n**+971 55 166 7112**\n\nOur experts typically respond within 5 minutes during business hours.\n\n**Is there anything else I can help with?**",
    options: [
      { label: "Continue shopping", value: "link:/products", isLink: true },
      { label: "Open calculator", value: "link:/calculator", isLink: true },
      { label: "Back to main menu", value: "root" },
    ],
  },

  // ─── RESOLUTION ──────────────────────────────
  resolved: {
    message: "Glad I could help!\n\n**What would you like to do next?**",
    options: [
      { label: "Continue shopping", value: "link:/products", isLink: true },
      { label: "Open calculator", value: "link:/calculator", isLink: true },
      { label: "Save recommendations", value: "link:/get-quote", isLink: true },
      { label: "Book consultation", value: "link:/get-quote", isLink: true },
      { label: "Track order", value: "orders-track" },
    ],
  },
};
