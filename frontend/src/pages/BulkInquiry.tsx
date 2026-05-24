import React, { useState } from "react";
import { Building, User, Package, CheckCircle } from "lucide-react";
import { api } from "../lib/api";
import { CATEGORIES } from "../lib/constants";
import { motion } from "framer-motion";

export default function BulkInquiry() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    businessType: "retailer",
    gstNumber: "",
    productCategories: [] as string[],
    estimatedQuantity: "",
    preferredDeliveryDate: "",
    message: "",
    referenceSource: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      productCategories: prev.productCategories.includes(category)
        ? prev.productCategories.filter((c) => c !== category)
        : [...prev.productCategories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/api/inquiry", formData);
      setSuccess(true);
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF6F0] px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-[var(--primary)]/10"
        >
          <div className="w-20 h-20 bg-[#E8DFD4] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary)]">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold text-[var(--primary)] mb-4">Inquiry Received</h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 font-light">
            Thank you for choosing Shyam Sadi Depot for your business needs. 
            Our B2B specialist will review your requirements and contact you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({ ...formData, message: "" });
            }}
            className="btn-luxury w-full"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-[#1a110a] text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a] to-transparent opacity-90" />
        <div className="absolute inset-0 opacity-30 luxury-grain mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="w-12 h-px bg-[var(--accent-gold)]" />
            <span className="text-[var(--accent-gold)] tracking-[0.3em] text-[10px] font-bold uppercase">Wholesale & B2B</span>
            <span className="w-12 h-px bg-[var(--accent-gold)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-[#FAF6F0] mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            Partner With Us
          </h1>
          <p className="text-[#E6CCB2] text-lg font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
            Access exclusive B2B pricing, priority fulfillment, and dedicated account management for your retail business.
          </p>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[var(--primary)]/10">
          <div className="bg-[#f8f5f0] p-6 sm:p-10 border-b border-[var(--primary)]/10 text-center">
            <h2 className="text-2xl font-display font-bold text-[var(--primary)] mb-2">Request Wholesale Catalog</h2>
            <p className="text-[var(--text-muted)] text-sm">Please provide your business details below.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Business Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--primary)]/10 pb-2">
                <Building className="text-[var(--accent-gold)]" size={20} />
                <h3 className="text-lg font-display font-bold text-[var(--primary)]">Business Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Company/Store Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  >
                    <option value="retailer">Retail Store</option>
                    <option value="boutique">Boutique</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="reseller">Online Reseller</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">GST Number (Optional)</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--primary)]/10 pb-2">
                <User className="text-[var(--accent-gold)]" size={20} />
                <h3 className="text-lg font-display font-bold text-[var(--primary)]">Contact Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Contact Person *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--primary)]/10 pb-2">
                <Package className="text-[var(--accent-gold)]" size={20} />
                <h3 className="text-lg font-display font-bold text-[var(--primary)]">Order Requirements</h3>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Categories of Interest</label>
                <div className="flex flex-wrap gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.name)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        formData.productCategories.includes(cat.name)
                          ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md"
                          : "bg-white border border-[var(--primary)]/20 text-[var(--text-muted)] hover:border-[var(--primary)]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Estimated Quantity (Pieces)</label>
                  <input
                    type="number"
                    name="estimatedQuantity"
                    value={formData.estimatedQuantity}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Expected Delivery Date</label>
                  <input
                    type="date"
                    name="preferredDeliveryDate"
                    value={formData.preferredDeliveryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium text-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Additional Message / Requirements</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium resize-none"
                  placeholder="Tell us more about what you are looking for..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-luxury w-full py-5 text-base shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
            </button>

            <p className="text-center text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mt-6">
              You will be redirected to WhatsApp to confirm your inquiry details.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
