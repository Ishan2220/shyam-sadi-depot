import { MapPin, Phone, Clock, ShieldCheck, Award } from "lucide-react";
import { BRAND } from "../lib/constants";
import { motion } from "framer-motion";

export default function Showroom() {
  return (
    <div className="bg-[var(--bg-page)] min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#1a110a]">
        <div className="absolute inset-0">
          <img
            src="/images/showroom_interior.png"
            alt="Shyam Sadi Depot Interior"
            className="w-full h-full object-cover scale-105 animate-[gentleFloat_20s_ease-in-out_infinite]"
            style={{ filter: "brightness(0.5) saturate(1.1)" }}
          />
          {/* Main Vignette and Cinematic Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#1a110a_120%)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[#1a110a]/50 to-[#1a110a]/60 opacity-90" />
          <div className="absolute inset-0 opacity-20 luxury-grain mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
          {/* Dark transparent overlay + blur specifically behind text area */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] rounded-[100%] scale-150 blur-3xl -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="w-12 h-px bg-[#E6CCB2]/50" />
              <span className="tracking-[0.3em] text-[10px] font-bold uppercase" style={{ color: '#E6CCB2' }}>The Experience</span>
              <span className="w-12 h-px bg-[#E6CCB2]/50" />
            </div>
            {/* Forced inline styles for absolute guarantee of color rendering */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display mb-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]" style={{ color: '#FAF6F0' }}>
              Our Flagship <span className="italic font-light" style={{ color: '#E6CCB2' }}>Showroom</span>
            </h1>
            <p className="text-lg font-light tracking-wide max-w-2xl mx-auto drop-shadow-md" style={{ color: '#FAF6F0' }}>
              Step into a world of timeless elegance. Located in the heart of Gandhinagar, Kolhapur, our showroom is a sanctuary for authentic Indian textiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="relative z-20 mt-8 md:-mt-32 max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 md:p-10 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-16 h-16 mx-auto bg-[var(--primary)] text-[var(--accent-gold)] rounded-full flex items-center justify-center mb-6 shadow-xl">
              <MapPin size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--primary)] mb-4">Location</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 font-light">
              {BRAND.address}
            </p>
            <a 
              href={BRAND.mapUrl} 
              target="_blank" 
              rel="noreferrer"
              className="text-[var(--accent-gold)] font-semibold text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors"
            >
              Get Directions
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="premium-card p-6 md:p-10 rounded-2xl text-center"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary)] to-[#3A2818] text-[var(--secondary)] rounded-full flex items-center justify-center mb-6 shadow-xl">
              <Clock size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--primary)] mb-4">Opening Hours</h3>
            <div className="text-[var(--text-muted)] text-sm leading-relaxed font-light space-y-2">
              <p className="flex justify-between border-b border-[var(--border-color)] pb-2">
                <span>Mon - Sat</span>
                <span className="font-medium text-[var(--primary)]">10:30 AM - 9:00 PM</span>
              </p>
              <p className="flex justify-between pt-2">
                <span>Sunday</span>
                <span className="font-medium text-[var(--primary)]">11:00 AM - 3:00 PM</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-6 md:p-10 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-16 h-16 mx-auto bg-[var(--primary)] text-[var(--accent-gold)] rounded-full flex items-center justify-center mb-6 shadow-xl">
              <Phone size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--primary)] mb-4">Contact Us</h3>
            <div className="space-y-4">
              <a href={`tel:${BRAND.phone}`} className="block text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">
                Call: {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="block text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">
                Email: {BRAND.email}
              </a>
              <a 
                href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-4 text-[var(--accent-gold)] font-semibold text-xs uppercase tracking-widest hover:text-[var(--primary)] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── THE EXPERIENCE ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display text-[var(--primary)] mb-8 leading-tight">
                Beyond Shopping, <br/><span className="italic font-light text-[var(--accent-gold)]">An Experience</span>
              </h2>
              <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed mb-8">
                Shopping for a saree is a personal journey, especially for milestones like weddings and festivals. Our showroom is designed to give you the space, comfort, and expert guidance needed to find the perfect drape.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck size={20} />, title: "Authenticity Guaranteed", desc: "Every weave comes with the promise of pure quality." },
                  { icon: <Award size={20} />, title: "Expert Stylists", desc: "Personalized assistance to help you choose the right fabric and design." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-[#FAF6F0] transition-colors border border-transparent hover:border-[var(--primary)]/10">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/5 text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[var(--primary)] text-lg mb-1">{feature.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/images/saree_2_1778669640500.png" 
                alt="Styling session" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-8 border-white/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MAP SECTION ─── */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--primary)]/10 relative"
          >
            <div className="absolute inset-0 bg-[var(--primary)]/5 animate-pulse" />
            <iframe
              src="https://maps.google.com/maps?q=16.70538117735975,74.29537049030138&hl=en&z=18&output=embed"
              width="100%"
              height="500"
              style={{ border: 0, position: 'relative', zIndex: 10, filter: "grayscale(20%) contrast(1.1)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shyam Sadi Depot Location"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
