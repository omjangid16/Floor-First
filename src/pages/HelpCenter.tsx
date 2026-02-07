import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bot, Send, Phone, ExternalLink } from "lucide-react";
import { helpFlowData } from "@/data/helpFlowData";
import type { ChatMessage, HelpOption } from "@/data/helpCenter/types";

const HelpCenter = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const startChat = () => {
    const root = helpFlowData["root"];
    setMessages([{ role: "assistant", content: root.message, options: root.options }]);
    setStarted(true);
  };

  const handleOptionClick = (option: HelpOption) => {
    if (option.isLink && option.value.startsWith("link:")) {
      // Navigate via Link - but first add user message
      const userMsg: ChatMessage = { role: "user", content: option.label.replace(/^[^\w]*/, "") };
      setMessages((prev) => [...prev, userMsg]);
      // Small delay then navigate
      setTimeout(() => { window.location.href = option.value.replace("link:", ""); }, 300);
      return;
    }

    const userMsg: ChatMessage = { role: "user", content: option.label.replace(/^[^\w]*/, "") };
    const node = helpFlowData[option.value];

    if (node) {
      const assistantMsg: ChatMessage = { role: "assistant", content: node.message, options: node.options };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    } else {
      const fallback: ChatMessage = {
        role: "assistant",
        content: "Thank you for your interest! Let me connect you with our team for more details.\n\n📞 **Call:** +971 55 166 7112\n📧 **Email:** hello@floorfirst.ae",
        options: [
          { label: "Back to main menu", value: "root" },
          { label: "Browse Products", value: "link:/products", isLink: true },
        ],
      };
      setMessages((prev) => [...prev, userMsg, fallback]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: input };
    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: "Thank you for your message! For the most personalized assistance, I recommend connecting with our team:\n\n📞 **Call:** +971 55 166 7112\n💬 **WhatsApp:** Direct chat\n📧 **Email:** hello@floorfirst.ae\n\n**Or I can guide you through our options:**",
      options: [
        { label: "Product Selection Help", value: "selection" },
        { label: "Pricing Help", value: "pricing" },
        { label: "Talk to an Expert", value: "expert" },
        { label: "Back to main menu", value: "root" },
      ],
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
          <p className="text-primary-foreground/60 font-body mt-3 max-w-xl">
            Get guided support for product selection, pricing, orders, and more.
          </p>
        </div>
      </section>

      <div className="container-luxury py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-luxury-lg overflow-hidden flex flex-col" style={{ height: "75vh" }}>
            {/* Header */}
            <div className="p-4 bg-primary flex items-center gap-3 shrink-0">
              {started && (
                <button onClick={() => { setStarted(false); setMessages([]); }} className="p-1 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-primary-foreground text-sm">Floor First Assistant</h3>
                <p className="text-xs text-primary-foreground/50 font-body">Online • Guided support</p>
              </div>
              <a href="tel:+971551667112" className="ml-auto p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>

            {/* Content */}
            {!started ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-secondary rounded-xl p-4 mb-6">
                  <p className="font-body text-foreground">👋 Hello! Welcome to Floor First Help Center. How can I assist you today?</p>
                </div>
                <div className="space-y-3">
                  {(helpFlowData["root"]?.options || []).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => { startChat(); setTimeout(() => handleOptionClick(option), 100); }}
                      className="w-full text-left bg-card rounded-xl border border-border p-4 hover:border-accent hover:shadow-luxury transition-all flex items-center gap-4 group"
                    >
                      <span className="text-2xl">{option.label.split(" ")[0]}</span>
                      <div className="flex-1">
                        <h4 className="font-body font-semibold text-foreground group-hover:text-accent transition-colors">
                          {option.label.replace(/^[^\w]*/, "")}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === "user" ? "gradient-accent text-accent-foreground" : "bg-secondary text-foreground"}`}>
                        <p className="font-body text-sm whitespace-pre-line">{msg.content}</p>
                        {msg.options && msg.options.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {msg.options.map((opt) => (
                              opt.isLink && opt.value.startsWith("link:") ? (
                                <Link
                                  key={opt.value}
                                  to={opt.value.replace("link:", "")}
                                  className="flex items-center justify-between w-full px-3 py-2.5 bg-card/80 rounded-lg text-sm font-body font-medium text-foreground hover:bg-card hover:text-accent transition-colors border border-border/50"
                                >
                                  {opt.label.replace(/^[^\w]*/, "")}
                                  <ExternalLink className="w-3.5 h-3.5 ml-2 shrink-0" />
                                </Link>
                              ) : (
                                <button
                                  key={opt.value}
                                  onClick={() => handleOptionClick(opt)}
                                  className="block w-full text-left px-3 py-2.5 bg-card/80 rounded-lg text-sm font-body font-medium text-foreground hover:bg-card hover:text-accent transition-colors border border-border/50"
                                >
                                  {opt.label.replace(/^[^\w]*/, "")}
                                </button>
                              )
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HelpCenter;
