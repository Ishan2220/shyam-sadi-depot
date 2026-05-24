import { useState, useEffect } from "react";
import { MessageCircle, Instagram, Facebook, X, ChevronRight } from "lucide-react";
import { BRAND } from "../../lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialChatBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Auto-pulse animation state for the button when closed
  const [pulse, setPulse] = useState(true);

  // Stop pulsing once user interacts or scrolls down significantly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !hasScrolled) {
        setHasScrolled(true);
        setPulse(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  const toggleBoard = () => {
    setIsOpen(!isOpen);
    setPulse(false);
  };

  const PREFILLED_MESSAGE = encodeURIComponent("Hello Shyam Sadi Depot! I am interested in your luxury saree collection and would like to know more.");

  const links = [
    {
      name: "WhatsApp",
      icon: <MessageCircle size={24} className="text-[#25D366]" />,
      desc: "Chat with our stylists",
      url: `https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${PREFILLED_MESSAGE}`,
      color: "hover:bg-[#25D366]/10",
      border: "hover:border-[#25D366]/30",
    },
    {
      name: "Instagram",
      icon: <Instagram size={24} className="text-[#E1306C]" />,
      desc: "Explore our lookbook",
      url: BRAND.instagram,
      color: "hover:bg-[#E1306C]/10",
      border: "hover:border-[#E1306C]/30",
    },
    {
      name: "Facebook",
      icon: <Facebook size={24} className="text-[#1877F2]" />,
      desc: "Join our community",
      url: BRAND.facebook,
      color: "hover:bg-[#1877F2]/10",
      border: "hover:border-[#1877F2]/30",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-72 md:w-80 rounded-2xl glass-dark shadow-2xl overflow-hidden border border-[var(--accent-gold)]/20 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[#3A2818] p-5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay"></div>
              <h4 className="text-[var(--secondary)] font-display font-bold text-lg mb-1 relative z-10">
                Connect With Us
              </h4>
              <p className="text-[var(--secondary)]/70 text-xs font-medium relative z-10">
                Our luxury stylists are ready to assist you.
              </p>
            </div>

            {/* Links */}
            <div className="p-3 space-y-2 bg-[#1A110A]/90">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 p-3 rounded-xl border border-transparent transition-all duration-300 group ${link.color} ${link.border}`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#FAF6F0]/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--secondary)] font-semibold text-sm mb-0.5">{link.name}</p>
                    <p className="text-[#A49385] text-xs font-medium">{link.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-[#A49385] group-hover:text-[var(--secondary)] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        onClick={toggleBoard}
        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all duration-300 z-50 ${
          isOpen 
            ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent-gold)]" 
            : "bg-gradient-to-br from-[#25D366] to-[#128C7E]"
        }`}
        aria-label="Toggle chat menu"
      >
        {/* Pulse Effect */}
        {!isOpen && pulse && (
          <span className="absolute inset-0 w-full h-full rounded-full bg-[#25D366] opacity-75 animate-ping" />
        )}
        
        {isOpen ? <X size={24} /> : <MessageCircle size={28} className="relative z-10" />}
      </button>
    </div>
  );
}
