import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { CATEGORIES, SUBCATEGORY_IMAGES } from "../lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";
import type { Product } from "../types/product";
import { productImageUrl } from "../lib/utils";
import ProductGalleryModal from "../components/ProductGalleryModal";

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeSubcategory = searchParams.get("subcategory");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activeSubcategory && products.length === 0) {
      setLoading(true);
      api.get("/api/products")
        .then(({ data }) => setProducts(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [activeCategory, activeSubcategory, products.length]);

  const activeCategoryData = CATEGORIES.find(c => c.name === activeCategory);

  const filteredProducts = products.filter(p => {
    let match = true;
    if (activeCategory) {
      match = match && p.category?.toLowerCase() === activeCategory.toLowerCase();
    }
    if (activeSubcategory) {
      match = match && p.subcategory?.toLowerCase() === activeSubcategory.toLowerCase();
    }
    return match;
  });

  return (
    <div className="bg-[#FAF6F0] min-h-screen">
      {/* ─── HEADER ─── */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-[#1a110a] text-center">
        <div className="absolute inset-0 bg-[url('/images/saree_3_1778669652786.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a] to-transparent opacity-90" />
        <div className="absolute inset-0 opacity-30 luxury-grain mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="w-12 h-px bg-[var(--accent-gold)]" />
            <span className="text-[var(--accent-gold)] tracking-[0.3em] text-[10px] font-bold uppercase">The Heritage</span>
            <span className="w-12 h-px bg-[var(--accent-gold)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-[#FAF6F0] mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] leading-tight">
            {activeSubcategory || activeCategory || "Our Collections"}
          </h1>
          <p className="text-[#E6CCB2] text-lg font-light tracking-wide max-w-2xl mx-auto">
            Discover the artistry of Indian textiles through our meticulously curated collections, celebrating tradition and modernity.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {!activeCategory ? (
            /* ─── LEVEL 1: ALL COLLECTIONS VIEW ─── */
            <motion.div
              key="all-collections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
            >
              {CATEGORIES.map((category, index) => {
                const spans = [
                  "md:col-span-12 lg:col-span-8",
                  "md:col-span-12 lg:col-span-4",
                  "md:col-span-12 lg:col-span-4",
                  "md:col-span-12 lg:col-span-8",
                  "md:col-span-12 lg:col-span-6",
                  "md:col-span-12 lg:col-span-6",
                ];
                let colSpanClass = spans[index] || "md:col-span-12 lg:col-span-4";

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`relative ${colSpanClass}`}
                  >
                    <div
                      onClick={() => setSearchParams({ category: category.name })}
                      className="block w-full h-[380px] md:h-[650px] lg:h-[750px] cursor-pointer group relative overflow-hidden bg-black"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                      />
                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-80 group-hover:opacity-70 transition-opacity duration-700" />
                      
                      {/* Subtle Cinematic Grain */}
                      <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-30 pointer-events-none" />

                      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                        {/* Top Accent */}
                        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
                          <span className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-[0.3em] border border-[var(--accent-gold)]/40 px-4 py-2 backdrop-blur-md bg-black/20">
                            Luxury Collection
                          </span>
                        </div>

                        {/* Bottom Text Area */}
                        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#FAF6F0] mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                            {category.name}
                          </h3>
                          <div className="w-12 group-hover:w-32 h-[2px] bg-[var(--accent-gold)] transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] mb-6 shadow-[0_0_10px_rgba(201,169,110,0.5)]" />
                          <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out">
                            <p className="text-[#FAF6F0]/90 text-xs md:text-sm font-light tracking-[0.2em] uppercase flex items-center gap-4">
                              Explore {category.subcategories.length} Curations <ArrowRight size={16} className="text-[var(--accent-gold)]" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : !activeSubcategory ? (
            /* ─── LEVEL 2: SUBCATEGORY DETAIL VIEW ─── */
            <motion.div
              key="category-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <button
                  onClick={() => setSearchParams({})}
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-xs font-bold uppercase tracking-widest mb-8"
                >
                  <X size={16} /> Back to Collections
                </button>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest">Collections</span>
                  <ChevronRight size={14} className="text-[var(--text-muted)]" />
                  <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">{activeCategory}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--primary)] mb-6">
                  {activeCategory}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-gold)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {activeCategoryData?.subcategories.map((sub, index) => {
                  const slug = sub.slug;
                  const imageSrc = SUBCATEGORY_IMAGES[slug] || "/images/showroom_interior.png";

                  return (
                    <motion.div
                      key={sub.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div
                        onClick={() => setSearchParams({ category: activeCategory, subcategory: sub.name })}
                        className="group block cursor-pointer"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-black group-hover:shadow-2xl transition-shadow duration-700">
                          <img
                            src={imageSrc}
                            alt={sub.name}
                            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                          />
                          {/* Dark Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5 opacity-80 group-hover:opacity-70 transition-opacity duration-700" />
                          
                          {/* Subtle Cinematic Grain */}
                          <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-30 pointer-events-none" />

                          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                              <h3 className="text-2xl md:text-3xl font-display font-medium text-[#FAF6F0] mb-3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                {sub.name}
                              </h3>
                              <div className="w-8 group-hover:w-16 h-[1px] bg-[var(--accent-gold)] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] mb-3" />
                              <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out">
                                <span className="text-[#FAF6F0]/90 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                  View Collection <ArrowRight size={12} className="text-[var(--accent-gold)]" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ─── LEVEL 3: PRODUCT SHOWCASE ─── */
            <motion.div
              key="product-showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <button
                  onClick={() => setSearchParams({ category: activeCategory })}
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-xs font-bold uppercase tracking-widest mb-8"
                >
                  <ChevronRight size={16} className="rotate-180" /> Back to {activeCategory}
                </button>
                
                <div className="flex items-center flex-wrap gap-2 md:gap-4 mb-4">
                  <span className="text-[var(--text-muted)] text-[10px] md:text-xs font-bold uppercase tracking-widest">Collections</span>
                  <ChevronRight size={12} className="text-[var(--text-muted)]" />
                  <span 
                    className="text-[var(--text-muted)] hover:text-[var(--primary)] text-[10px] md:text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                    onClick={() => setSearchParams({ category: activeCategory })}
                  >
                    {activeCategory}
                  </span>
                  <ChevronRight size={12} className="text-[var(--text-muted)]" />
                  <span className="text-[var(--primary)] text-[10px] md:text-xs font-bold uppercase tracking-widest">{activeSubcategory}</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--primary)] mb-6">
                  {activeSubcategory} Showcase
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-gold)]" />
              </div>

              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-6">
                  <div className="w-12 h-12 border-4 border-[var(--accent-gold)]/20 border-t-[var(--accent-gold)] rounded-full animate-spin" />
                  <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase font-bold animate-pulse">Curating pieces...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="premium-card group bg-white"
                    >
                      <div 
                        className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-[#f8f5f0] cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={productImageUrl(product.images?.[0], product._id?.length || 0)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {product.fabrics && product.fabrics[0] && (
                            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] shadow-sm">
                              {product.fabrics[0]}
                            </span>
                          )}
                          {product.colors && product.colors.length > 1 && (
                            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] shadow-sm">
                              {product.colors.length} Colors
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="bg-[var(--primary)] text-[var(--secondary)] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#3A2818] hover:shadow-xl transition-all w-full justify-center"
                          >
                            <ArrowRight size={16} /> View Details
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6 text-center" onClick={() => setSelectedProduct(product)}>
                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-2">
                          {product.subcategory || product.category}
                        </p>
                        <h3 className="font-display font-bold text-lg text-[var(--primary)] mb-1 cursor-pointer hover:text-[var(--accent-gold)] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                          {product.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] text-[var(--accent-gold)] uppercase tracking-widest font-bold px-2 py-0.5 border border-[var(--accent-gold)]/30 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center glass-panel rounded-2xl max-w-2xl mx-auto border border-[var(--primary)]/10">
                  <p className="text-[var(--text-muted)] text-lg mb-4">No pieces currently available in this style.</p>
                  <p className="text-sm font-light text-[var(--text-muted)] mb-8">Please check back later or explore other collections.</p>
                  <button 
                    onClick={() => setSearchParams({ category: activeCategory })}
                    className="btn-outline border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--secondary)]"
                  >
                    Explore Other Styles
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Product Modal */}
      <ProductGalleryModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
