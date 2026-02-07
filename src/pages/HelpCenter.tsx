import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronRight, ArrowLeft, User, Bot, Send, Phone } from "lucide-react";

const helpTopics = [
  { id: "selection", label: "Flooring Selection Help", icon: "🏠", description: "Get guided recommendations based on your space and needs" },
  { id: "pricing", label: "Pricing & Calculator Help", icon: "💰", description: "Understand pricing, get estimates, and budget planning" },
  { id: "orders", label: "Orders & Installation", icon: "📦", description: "Track orders, schedule installation, manage bookings" },
  { id: "warranty", label: "Warranty & Maintenance", icon: "🛡️", description: "Warranty claims, care guides, and maintenance tips" },
  { id: "design", label: "Design & Consultation", icon: "🎨", description: "Interior design advice, custom solutions, and project planning" },
  { id: "expert", label: "Talk to an Expert", icon: "👤", description: "Connect with a real flooring specialist for personalized help" },
];

type Message = { role: "user" | "assistant"; content: string; options?: string[] };

const initialMessages: Record<string, Message[]> = {
  selection: [
    { role: "assistant", content: "Great! I'd love to help you find the perfect flooring. Let's start with a few questions.\n\n**What type of space are you looking to floor?**", options: ["Residential Home", "Commercial Office", "Industrial Space", "Hospitality Venue", "Outdoor Area"] },
  ],
  pricing: [
    { role: "assistant", content: "I can help you understand our pricing and get an estimate!\n\n**What would you like to know?**", options: ["Get a price estimate", "Understand pricing factors", "Compare material costs", "Installation pricing", "Use the Smart Calculator"] },
  ],
  orders: [
    { role: "assistant", content: "I can help with your orders and installation.\n\n**What do you need help with?**", options: ["Track my order", "Schedule installation", "Modify my order", "Delivery information", "Returns & exchanges"] },
  ],
  warranty: [
    { role: "assistant", content: "I can help with warranty and maintenance questions.\n\n**What do you need?**", options: ["Check warranty coverage", "File a warranty claim", "Maintenance tips", "Cleaning guides", "Repair services"] },
  ],
  design: [
    { role: "assistant", content: "Our design team can help bring your vision to life!\n\n**What are you looking for?**", options: ["Color & pattern advice", "Room design consultation", "Custom floor patterns", "Material pairing", "Book a designer visit"] },
  ],
};

const followUpResponses: Record<string, string> = {
  "Residential Home": "Perfect! For residential spaces, we recommend:\n\n🏡 **Living Areas** — Engineered Wood or SPC Vinyl\n🛏️ **Bedrooms** — Carpet or Hardwood\n🚿 **Bathrooms** — Porcelain Tiles or Natural Stone\n🍳 **Kitchen** — Ceramic Tiles or Vinyl\n\n**What room are you focusing on?**",
  "Commercial Office": "For commercial offices, durability and acoustics are key.\n\n**Our top picks:**\n• Carpet Tiles — Great acoustics, easy replacement\n• SPC Vinyl — Waterproof, scratch-resistant\n• Polished Concrete — Modern, low maintenance\n\n**What's your approximate office size?**",
  "Get a price estimate": "I can help with that! Our pricing typically ranges:\n\n💰 **Economy** — AED 59-119/sqft\n💎 **Mid-Range** — AED 129-199/sqft\n👑 **Premium** — AED 200-399/sqft\n🏆 **Luxury** — AED 400-799/sqft\n\nPrices include material only. Installation starts from AED 25/sqft.\n\n**What budget range interests you?**",
};

const HelpCenter = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleTopicSelect = (topicId: string) => {
    if (topicId === "expert") {
      setSelectedTopic("expert");
      setMessages([
        { role: "assistant", content: "I'm connecting you with a flooring expert.\n\n👤 **Ahmed Hassan** — Senior Flooring Consultant\n📞 Available now\n\nAhmed has 12+ years of experience in residential and commercial flooring projects across the UAE.\n\n**While you wait, you can start describing your project and Ahmed will see the full chat history when he joins.**" },
      ]);
      return;
    }
    setSelectedTopic(topicId);
    setMessages(initialMessages[topicId] || []);
  };

  const handleOptionClick = (option: string) => {
    const userMsg: Message = { role: "user", content: option };
    const responseContent = followUpResponses[option] || `Thank you for selecting "${option}". Let me look into that for you.\n\nOur team will provide detailed information about this shortly. In the meantime, you can:\n\n• Browse our [product catalog](/products)\n• Use our [Smart Calculator](/calculator)\n• Request a [free quote](/get-quote)`;
    const assistantMsg: Message = { role: "assistant", content: responseContent };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const assistantMsg: Message = {
      role: "assistant",
      content: "Thank you for your message! I'm processing your request.\n\nFor the most accurate and personalized assistance, I recommend:\n\n• 📞 **Call us:** +971 55 166 7112\n• 💬 **WhatsApp:** Direct chat with our team\n• 📧 **Email:** hello@floorfirst.ae\n\nOur experts are available Sunday–Saturday, 9AM–7PM.",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-12 lg:py-16">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">We're here to help</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">Help Center</h1>
        </div>
      </section>

      <div className="container-luxury py-8 lg:py-12">
        {!selectedTopic ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-luxury-lg overflow-hidden">
              <div className="p-6 bg-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                    <Bot className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary-foreground">Floor First Assistant</h3>
                    <p className="text-xs text-primary-foreground/60 font-body">Online • Typically replies instantly</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-secondary rounded-xl p-4 mb-6">
                  <p className="font-body text-foreground">
                    👋 Hello! Welcome to Floor First Help Center. How can I assist you today?
                  </p>
                </div>

                <div className="space-y-3">
                  {helpTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                      className="w-full text-left bg-card rounded-xl border border-border p-4 hover:border-accent hover:shadow-luxury transition-all flex items-center gap-4 group"
                    >
                      <span className="text-2xl">{topic.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-body font-semibold text-foreground group-hover:text-accent transition-colors">{topic.label}</h4>
                        <p className="text-sm text-muted-foreground font-body">{topic.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-luxury-lg overflow-hidden flex flex-col" style={{ height: "70vh" }}>
              {/* Chat Header */}
              <div className="p-4 bg-primary flex items-center gap-3 shrink-0">
                <button onClick={() => { setSelectedTopic(null); setMessages([]); }} className="p-1 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-primary-foreground text-sm">Floor First Assistant</h3>
                  <p className="text-xs text-primary-foreground/50 font-body">Online</p>
                </div>
                <a href="tel:+971551667112" className="ml-auto p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.role === "user" ? "gradient-accent text-accent-foreground" : "bg-secondary text-foreground"
                    }`}>
                      <p className="font-body text-sm whitespace-pre-line">{msg.content}</p>
                      {msg.options && (
                        <div className="mt-3 space-y-2">
                          {msg.options.map((opt) => (
                            <button key={opt} onClick={() => handleOptionClick(opt)}
                              className="block w-full text-left px-3 py-2 bg-card/80 rounded-lg text-sm font-body text-foreground hover:bg-card transition-colors border border-border/50">
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:ring-2 focus:ring-accent outline-none text-sm"
                  />
                  <button onClick={handleSend} className="p-3 gradient-accent rounded-xl text-accent-foreground hover:opacity-90 transition-opacity">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HelpCenter;
