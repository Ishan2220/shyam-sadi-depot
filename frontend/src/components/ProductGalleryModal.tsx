import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import type { Product } from "../types/product";
import { productImageUrl, productId } from "../lib/utils";
import { BRAND } from "../lib/constants";

interface ProductGalleryModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductGalleryModal({ product, onClose }: ProductGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return null;

  const images = product.images?.length ? product.images : [productImageUrl(undefined)];
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hello Shyam Sadi Depot, I am interested in this saree design.\n\nProduct: ${product.name}\nFabric: ${product.fabrics?.[0] || 'N/A'}\nID: ${productId(product)}`
    );
    return `https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-[#1a110a]/95 backdrop-blur-md" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/50 backdrop-blur-md hover:bg-white text-[var(--primary)] rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            <X size={20} />
          </button>

          {/* Left: Image Gallery */}
          <div className="relative flex-1 bg-[#f8f5f0] flex flex-col items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full object-contain md:object-cover"
                alt={`${product.name} - View ${currentIndex + 1}`}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/70 hover:bg-white text-[var(--primary)] rounded-full flex items-center justify-center shadow-xl transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/70 hover:bg-white text-[var(--primary)] rounded-full flex items-center justify-center shadow-xl transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 px-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shadow-md ${
                      currentIndex === idx ? "border-[var(--primary)] scale-110" : "border-white/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-[400px] flex flex-col bg-white overflow-y-auto">
            <div className="p-8 flex-1">
              <div className="mb-6">
                <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-2">
                  {product.category} / {product.subcategory}
                </p>
                <h2 className="text-3xl font-display font-bold text-[var(--primary)] leading-tight mb-4">
                  {product.name}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-gold)]" />
              </div>

              {/* Attributes */}
              <div className="space-y-6">
                {product.fabrics && product.fabrics.length > 0 && (
                  <div>
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Fabric</h4>
                    <p className="text-sm font-medium text-[var(--primary)]">{product.fabrics.join(", ")}</p>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Colors Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <span key={color} className="px-3 py-1 bg-[#FAF6F0] border border-[#E6CCB2] text-[var(--primary)] text-xs font-bold rounded-md">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.description && (
                  <div>
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Description</h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed font-light">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-8 bg-gray-50 border-t border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold text-center mb-4">
                Ref ID: {productId(product)}
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[var(--primary)] text-[var(--secondary)] py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#3A2818] hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <MessageCircle size={20} />
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
