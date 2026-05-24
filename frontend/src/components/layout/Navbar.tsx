import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll hide/show logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Showroom", path: "/showroom" },
    { name: "Bulk Orders", path: "/bulk-inquiry" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#F5EDE4] backdrop-blur-xl shadow-[0_4px_30px_rgba(74,51,32,0.08)] border-b border-[var(--primary)]/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between relative">
          
          {/* LEFT: Logo and Brand Name */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-4 group mr-8 lg:relative absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0">
            <img 
              src="/logo.png" 
              alt="Shyam Sadi Depot Logo" 
              className="h-14 md:h-16 w-auto object-contain rounded-full shadow-md border border-[var(--primary)]/10 group-hover:scale-105 transition-transform duration-500" 
            />
            <span className="hidden lg:inline text-2xl font-display font-bold tracking-tight text-[var(--primary)] group-hover:text-[var(--accent-gold)] transition-colors duration-500">
              Shyam Sadi Depot
            </span>
          </Link>

          {/* RIGHT: Navigation and Auth */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] hover:text-[var(--accent-gold)] relative group transition-colors"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-[var(--accent-gold)] transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4 border-l border-[var(--primary)]/10 pl-8">
              <Link to="/admin" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--primary)] hover:text-[var(--accent-gold)] transition-colors" title="Admin Portal">
                <Shield size={16} strokeWidth={1.5} /> Admin Panel
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="text-[var(--primary)] hover:text-[var(--accent-gold)] transition-colors lg:hidden ml-4"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#FAF6F0] z-[101] shadow-2xl flex flex-col border-l border-[var(--primary)]/10"
            >
              <div className="p-6 flex items-center justify-between border-b border-[var(--primary)]/10">
                <span className="text-xl font-display font-bold text-[var(--primary)] tracking-tight">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-[var(--primary)]/5 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-display text-[var(--primary)] hover:text-[var(--accent-gold)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display text-[var(--primary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2"
                  >
                    <Shield size={18} /> Admin Portal
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
