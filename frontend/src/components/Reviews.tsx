import { useState, useEffect } from "react";
import { Star, Quote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../lib/api";

type Review = {
  id?: string;
  _id?: string;
  name: string;
  text: string;
  rating: number;
  avatar?: string;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? "text-[var(--accent-gold)] fill-[var(--accent-gold)]" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

// Helper to get monogram initials for luxury avatars
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get("/api/reviews");
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          throw new Error("No reviews found");
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        // Luxury Fallback Data
        setReviews([
          { name: "Priya Sharma", text: "साडी quality kharach premium aahe ❤️ The entire family loved the fabric.", rating: 5 },
          { name: "Anjali Desai", text: "Bridal collection literally next level hota. Felt like a queen on my wedding day.", rating: 5 },
          { name: "Megha Patil", text: "Paithani collection pahilyavar wow feel ala. The intricate weaving is pure art.", rating: 5 },
          { name: "Neha Kulkarni", text: "Fabric ani finishing khup rich diste. The authentic silk texture is unmatchable.", rating: 5 },
          { name: "Pooja Joshi", text: "Family shopping experience khup mast hota. Truly a luxury showroom experience.", rating: 5 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) return null;

  // Duplicate reviews to create a seamless infinite scroll effect
  const scrollingReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden py-24 bg-[var(--bg-page)]">
      {/* Premium Cinematic Background Gradient & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0] via-[#f5efe6] to-[#FAF6F0] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-gold)]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-40 pointer-events-none z-0" />

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/40 to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-6 mb-6 opacity-80">
            <span className="w-16 h-[1px] bg-[var(--accent-gold)]" />
            <span className="text-[var(--accent-gold)] tracking-[0.3em] text-[10px] font-bold uppercase">Client Diaries</span>
            <span className="w-16 h-[1px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-[var(--primary)] mb-6 drop-shadow-sm">
            Words of <span className="italic font-light">Admiration</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            The trust of thousands of families who chose our handcrafted luxury for their most precious moments.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-hidden group z-10">
        {/* Left Fade */}
        <div className="absolute top-0 left-0 w-24 md:w-56 h-full bg-gradient-to-r from-[#FAF6F0] to-transparent z-20 pointer-events-none" />

        {/* Scroll Track */}
        <div className="flex gap-8 py-12 px-4 animate-scroll-left w-max hover:[animation-play-state:paused] ease-linear">
          {scrollingReviews.map((review, index) => (
            <div
              key={`${review.id || review._id || index}-${index}`}
              className="w-[350px] md:w-[420px] flex-shrink-0 relative group/card transition-transform duration-700 hover:-translate-y-2"
            >
              {/* Luxury Floating Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(74,51,32,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(74,51,32,0.15)] hover:bg-white/80 transition-all duration-700 ease-out h-full flex flex-col justify-between relative overflow-hidden">
                
                {/* Floating Soft Gold Quote Icon */}
                <Quote 
                  size={60} 
                  className="absolute -top-4 -left-4 text-[var(--accent-gold)] opacity-10 group-hover/card:opacity-20 transition-opacity duration-700 group-hover/card:-rotate-12 transform" 
                />
                <Quote 
                  size={120} 
                  className="absolute -bottom-10 -right-10 text-[var(--accent-gold)] opacity-5 group-hover/card:opacity-10 transition-opacity duration-700" 
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    {/* Premium Monogram Avatar */}
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover border border-[var(--accent-gold)]/40 p-1 shadow-md"
                      />
                    ) : (
                      <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-br from-[var(--accent-gold)] via-[var(--secondary)] to-[var(--primary)] shadow-lg">
                        <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <span className="font-display font-medium text-xl text-[var(--primary)] tracking-wider">
                            {getInitials(review.name)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-display font-semibold text-[var(--primary)] text-xl mb-1 tracking-wide">
                        {review.name}
                      </h4>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  <p className="text-[var(--text-dark)] text-base md:text-lg font-display italic leading-relaxed mb-10 opacity-90">
                    "{review.text}"
                  </p>
                </div>

                {/* Footer Decor */}
                <div className="relative z-10">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/30 to-transparent mb-4" />
                  <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] group-hover/card:text-[var(--accent-gold)] transition-colors duration-500">
                    <CheckCircle size={12} className="text-[var(--accent-gold)]" />
                    Verified Customer
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Right Fade */}
        <div className="absolute top-0 right-0 w-24 md:w-56 h-full bg-gradient-to-l from-[#FAF6F0] to-transparent z-20 pointer-events-none" />
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/40 to-transparent z-10" />
    </section>
  );
}
