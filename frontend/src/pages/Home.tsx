import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Sparkles, ArrowRight, Star } from "lucide-react";
import Reviews from "../components/Reviews";
import { CATEGORIES } from "../lib/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Animated floating particles for the hero section
  const particles = Array.from({ length: 15 });

  const CATEGORY_SLIDER_CARDS = [
    { src: "/images/sub_paithani.png", label: "Paithani" },
    { src: "/images/wedding_collection.png", label: "Bridal Couture" },
    { src: "/images/sub_kanjivaram.png", label: "Kanjivaram" },
    { src: "/images/cotton_saree.png", label: "Cotton Silk" },
    { src: "/images/party_wear.png", label: "Party Wear" },
    { src: "/images/trending_saree.png", label: "Trending" },
    { src: "/images/nauvari_saree.png", label: "9 Vari" },
  ];

  return (
    <div ref={containerRef} className="bg-[var(--bg-page)] relative">
      {/* ─── SECTION 1: CINEMATIC HERO ─── */}
      <section className="relative h-screen w-full overflow-hidden bg-[#1a110a] flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Sliding Category Cards Background */}
          <div className="absolute inset-0 w-full h-full flex items-center pt-20 overflow-hidden mix-blend-screen opacity-50">
            <motion.div 
              className="flex gap-4 md:gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 50, repeat: Infinity }}
            >
              {[...CATEGORY_SLIDER_CARDS, ...CATEGORY_SLIDER_CARDS].map((card, idx) => (
                <div key={idx} className="relative w-64 md:w-80 h-[50vh] md:h-[60vh] rounded-xl overflow-hidden shrink-0">
                  <img src={card.src} alt={card.label} className="w-full h-full object-cover opacity-80" style={{ filter: "brightness(0.9) contrast(1.1)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a] via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-8 left-8 text-[#F3D9B1] font-display text-xl md:text-2xl tracking-[0.2em] font-light">{card.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Dark luxury vignette for cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a] via-[#1a110a]/40 to-[#1a110a]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#1a110a_100%)] opacity-80 pointer-events-none" />
          
          {/* Luxury Grain */}
          <div className="absolute inset-0 opacity-10 luxury-grain mix-blend-overlay" />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${7 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 mt-8 md:mt-16 max-w-5xl mx-auto flex flex-col items-center">
          {/* Subtle dark transparent overlay & blur behind text area only for readability */}
          <div className="absolute inset-0 bg-black/15 blur-2xl rounded-[100%] scale-[2.0] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_transparent_60%)] pointer-events-none scale-[1.8]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
            className="flex items-center gap-4 mb-8 relative z-10"
          >
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A96E]" />
            <span className="text-[#F3D9B1] tracking-[0.4em] text-xs font-bold uppercase drop-shadow-md">Since 1999</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A96E]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="heading-cinematic text-6xl md:text-8xl lg:text-[7.5rem] mb-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] leading-[1.1] relative z-10"
          >
            <span className="text-[#FAF6F0] drop-shadow-[0_0_20px_rgba(250,246,240,0.25)] block mb-2">
              Timeless Elegance,
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6CCB2] via-[#F3D9B1] to-[#C9A96E] italic font-light inline-block transform hover:scale-105 transition-transform duration-1000 cursor-default filter drop-shadow-[0_0_15px_rgba(201,169,110,0.3)]">
              Draped in Tradition
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="text-[var(--secondary)] text-lg md:text-xl max-w-2xl font-light tracking-wide mb-12 relative z-10 drop-shadow-md"
          >
            Discover Maharashtra's most exclusive collection of pure silk, handwoven Paithani, and designer bridal sarees.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-6 items-center relative z-10"
          >
            <Link to="/collections" className="btn-luxury w-full sm:w-auto shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(201,169,110,0.4)] transition-shadow duration-500">
              Explore Collections
            </Link>
            <Link to="/showroom" className="group flex items-center gap-3 text-[var(--accent-gold)] hover:text-[#FAF6F0] hover:drop-shadow-[0_0_10px_rgba(201,169,110,0.5)] transition-all duration-500 text-sm font-semibold tracking-widest uppercase">
              <span className="relative">
                Visit Showroom
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent-gold)] transition-all duration-500 group-hover:w-full group-hover:bg-[#FAF6F0]" />
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hidden [@media(min-height:700px)]:flex"
        >
          <span className="text-[var(--accent-gold)] text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to discover</span>
          <div className="w-[1px] h-16 bg-[var(--accent-gold)]/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent-gold)] animate-[slideUp_2s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: THE LEGACY (ABOUT) ─── */}
      <section className="section-cinematic section-about relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-gold)]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-[var(--accent-gold)]/30 translate-x-4 translate-y-4 rounded-sm pointer-events-none" />
            <img 
              src="/images/showroom_interior.png" 
              alt="Shyam Sadi Depot Showroom" 
              className="w-full h-auto aspect-[4/5] object-cover rounded-sm shadow-2xl relative z-10"
            />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -right-10 glass-panel p-8 rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-xl z-20 animate-gentle-float">
              <span className="text-4xl font-display font-bold text-[var(--primary)]">25+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-center mt-1">Years of<br/>Legacy</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="luxury-separator" />
              <span className="text-[var(--accent-gold)] tracking-[0.2em] text-xs font-bold uppercase">Our Heritage</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display text-[var(--primary)] mb-8 leading-tight">
              A Symphony of <br/><span className="italic font-light">Threads & Colors</span>
            </h2>
            
            <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed mb-8">
              For over two decades, Shyam Sadi Depot has been the custodian of authentic Maharashtrian textile heritage. From the royal looms of Yeola to the intricate weaves of Kanchipuram, every saree in our showroom tells a story of unparalleled craftsmanship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <div className="glass-gold p-6 rounded-xl">
                <Sparkles size={24} className="text-[var(--accent-gold)] mb-4" />
                <h3 className="font-display font-bold text-xl text-[var(--primary)] mb-2">Purity Guaranteed</h3>
                <p className="text-sm text-[var(--text-muted)]">100% authentic silk and pure zari work, certified for quality.</p>
              </div>
              <div className="glass-gold p-6 rounded-xl">
                <Shield size={24} className="text-[var(--accent-gold)] mb-4" />
                <h3 className="font-display font-bold text-xl text-[var(--primary)] mb-2">Fixed & Fair Pricing</h3>
                <p className="text-sm text-[var(--text-muted)]">Transparent pricing policies ensuring the best value for authentic weaves.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: CURATED COLLECTIONS ─── */}
      <section className="section-cinematic bg-[#1a110a] relative overflow-hidden py-24 md:py-32">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-20 luxury-grain mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--accent-gold)]" />
                <span className="text-[var(--accent-gold)] tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase drop-shadow-sm">Curated Excellence</span>
                <span className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--accent-gold)]" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#FAF6F0] leading-[1.1] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                Masterpieces <br className="hidden md:block"/>
                <span className="italic font-light text-[#E6CCB2]">for Every Occasion</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link to="/collections" className="group relative inline-flex items-center gap-3 text-[#E6CCB2] font-semibold text-xs md:text-sm uppercase tracking-[0.2em] transition-colors py-2 overflow-hidden">
                <span className="relative z-10 group-hover:text-[#FAF6F0] transition-colors duration-500">View Entire Catalog</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500 text-[var(--accent-gold)]" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent-gold)] transform origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-out" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FAF6F0] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-100" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Cinematic Slider - Bleeding off the right edge */}
        <div className="pl-6 md:pl-12 lg:pl-[calc((100vw-1400px)/2+48px)]">
          <Swiper
            modules={[FreeMode, Mousewheel]}
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={true}
            mousewheel={{ forceToAxis: true }}
            breakpoints={{
              320: { spaceBetween: 16 },
              768: { spaceBetween: 24 },
              1024: { spaceBetween: 32 }
            }}
            className="!overflow-visible"
          >
            {CATEGORIES.slice(0, 6).map((category, index) => (
              <SwiperSlide key={category.name} className="!w-[85vw] sm:!w-[300px] md:!w-[400px] lg:!w-[450px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link to={`/collections#${category.name.replace(/\s+/g, '-')}`} className="group block relative h-[500px] md:h-[650px] overflow-hidden rounded-sm bg-black">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                    />
                    
                    {/* Deep Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700" />
                    
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                      <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]">
                        <span className="text-[var(--accent-gold)] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                          Luxury Edit
                        </span>
                        <h3 className="text-3xl md:text-5xl font-display font-medium text-[#FAF6F0] mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                          {category.name}
                        </h3>
                        <div className="w-12 group-hover:w-full h-[1px] bg-gradient-to-r from-[var(--accent-gold)] to-transparent transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] mb-4" />
                        <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out">
                          <p className="text-[#FAF6F0]/90 text-xs font-light tracking-[0.2em] uppercase flex items-center gap-3">
                            Discover Range <ArrowRight size={14} className="text-[var(--accent-gold)]" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ─── SECTION 4: REVIEWS ─── */}
      <Reviews />

      {/* ─── SECTION 5: FINAL CTA ─── */}
      <section className="py-32 relative overflow-hidden bg-[#1A110A]">
        <div className="absolute inset-0 bg-[url('/images/saree_4_1778669675692.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A110A] to-transparent opacity-80" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Star className="text-[var(--accent-gold)] mx-auto mb-8" size={32} strokeWidth={1.5} />
            <h2 className="text-4xl md:text-6xl font-display text-[#FAF6F0] mb-6 leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              Begin Your Journey of <span className="italic font-light text-[#E6CCB2]">Elegance</span>
            </h2>
            <p className="text-[var(--secondary)] text-lg font-light mb-12 max-w-2xl mx-auto">
              Visit our flagship showroom to experience the touch of pure silk and the grandeur of our heritage collections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/showroom" className="btn-luxury w-full sm:w-auto">
                Get Directions
              </Link>
              <a 
                href={`https://wa.me/918177887720`} 
                target="_blank" 
                rel="noreferrer"
                className="btn-outline w-full sm:w-auto border-[var(--accent-gold)]/30 text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10"
              >
                Chat with Owner
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
