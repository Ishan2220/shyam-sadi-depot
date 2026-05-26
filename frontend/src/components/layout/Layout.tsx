import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Navbar from "./Navbar";
import { SmoothScroll } from "./SmoothScroll";
import SocialChatBoard from "./SocialChatBoard";
import ScrollToTop from "../ScrollToTop";
import { BRAND } from "../../lib/constants";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <SmoothScroll>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen selection:bg-[var(--primary)] selection:text-white">
        <Navbar />

        {/* Content with padding for the fixed navbar */}
        <main className="flex-grow pt-20 md:pt-24">{children}</main>

        <SocialChatBoard />

        {/* Luxury Deep Coffee Footer */}
        <footer className="relative bg-[#1A110A] text-[#FAF6F0] pt-28 pb-12 mt-20 border-t-4 border-[var(--primary)] overflow-hidden">
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none luxury-grain" />
          
          {/* Decorative Gold Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-50" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-gold)]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
              
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <Link to="/" className="inline-block mb-8 group">
                  <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent-gold)] tracking-tight">
                    Shyam Sadi Depot
                  </h2>
                  <h3 className="text-xl font-display font-medium text-[var(--secondary)] mt-1 tracking-wider">
                    श्याम साडी डेपो
                  </h3>
                  <div className="h-[1px] w-12 bg-[var(--accent-gold)] mt-4 transition-all duration-500 group-hover:w-full opacity-50" />
                </Link>
                <p className="text-[var(--secondary)] text-sm leading-relaxed mb-4 font-light tracking-wide">
                  Experience timeless elegance. We bring you the finest collection of authentic Indian ethnic wear, 
                  crafted with tradition and contemporary grace.
                </p>
                <p className="text-[var(--accent-gold)] text-xs font-semibold mb-8 tracking-wider">
                  GST No: 27ABBPC6348R1Z8
                </p>
                <div className="flex gap-5">
                  <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[var(--primary)] flex items-center justify-center text-[var(--secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] hover:-translate-y-1 transition-all duration-300">
                    <Facebook size={18} />
                  </a>
                  <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[var(--primary)] flex items-center justify-center text-[var(--secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] hover:-translate-y-1 transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-[0.2em] mb-8">The Boutique</h3>
                <ul className="space-y-4">
                  {[
                    { name: 'Collections', path: '/collections' },
                    { name: 'Bridal Exclusive', path: '/collections' },
                    { name: 'Our Showroom', path: '/showroom' },
                    { name: 'Bulk Inquiries', path: '/bulk-inquiry' },
                    { name: 'Job Inquiry', path: '/job-inquiry' }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-sm text-[var(--secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2 group">
                        <span className="w-0 h-[1px] bg-[var(--accent-gold)] transition-all duration-300 group-hover:w-3" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-2">
                <h3 className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-[0.2em] mb-8">Visit Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <a href={BRAND.mapUrl} target="_blank" rel="noreferrer" className="group flex items-start gap-4 p-4 rounded-xl hover:bg-[var(--primary)]/20 transition-colors border border-transparent hover:border-[var(--primary)]/40">
                    <div className="mt-1 text-[var(--accent-gold)]">
                      <MapPin size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--secondary)] font-medium mb-2">Flagship Showroom</p>
                      <p className="text-sm text-[var(--secondary)] leading-relaxed">
                        {BRAND.address}
                      </p>
                    </div>
                  </a>

                  <div className="space-y-4">
                    <a href={`tel:${BRAND.phone}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--primary)]/20 transition-colors group border border-transparent hover:border-[var(--primary)]/40">
                      <div className="text-[var(--accent-gold)]">
                        <Phone size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--secondary)] uppercase tracking-wider mb-1">Call Us</p>
                        <p className="text-sm text-[var(--secondary)] group-hover:text-[var(--accent-gold)] transition-colors font-medium">{BRAND.phone}</p>
                      </div>
                    </a>
                    
                    <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--primary)]/20 transition-colors group border border-transparent hover:border-[var(--primary)]/40">
                      <div className="text-[var(--accent-gold)]">
                        <Mail size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--secondary)] uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm text-[var(--secondary)] group-hover:text-[var(--accent-gold)] transition-colors font-medium">{BRAND.email}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>


            {/* Copyright */}
            <div className="border-t border-[var(--secondary)]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[var(--secondary)] tracking-wide">
                &copy; {currentYear} {BRAND.name}. All Rights Reserved.
              </p>
              <div className="flex gap-6">
                <Link to="/" className="text-xs text-[var(--secondary)] hover:text-[var(--accent-gold)] transition-colors">Privacy Policy</Link>
                <Link to="/" className="text-xs text-[var(--secondary)] hover:text-[var(--accent-gold)] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
