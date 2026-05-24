import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { BRAND } from "../lib/constants";
import { motion } from "framer-motion";

export default function JobInquiry() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    position: "Sales Executive",
    experience: "0-2 years",
    resumeUrl: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Format message for WhatsApp
    const message = `*New Job Application*\n\n*Name:* ${formData.fullName}\n*Position:* ${formData.position}\n*Experience:* ${formData.experience}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*City:* ${formData.city}\n\n*Cover Letter:*\n${formData.coverLetter}`;
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.open(
        `https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }, 1000);
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
          <h2 className="text-3xl font-display font-bold text-[var(--primary)] mb-4">Application Sent</h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 font-light">
            Thank you for your interest in joining Shyam Sadi Depot. 
            Our HR team will review your application and get back to you soon.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({ ...formData, coverLetter: "" });
            }}
            className="btn-luxury w-full"
          >
            Submit Another Application
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
            <span className="text-[var(--accent-gold)] tracking-[0.3em] text-[10px] font-bold uppercase">Job Inquiry</span>
            <span className="w-12 h-px bg-[var(--accent-gold)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-[#FAF6F0] mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            Join Our Legacy
          </h1>
          <p className="text-[#E6CCB2] text-lg font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
            Become a part of Maharashtra's most trusted ethnic fashion house. We are always looking for passionate individuals.
          </p>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[var(--primary)]/10">
          <div className="bg-[#f8f5f0] p-6 sm:p-10 border-b border-[var(--primary)]/10 text-center">
            <h2 className="text-2xl font-display font-bold text-[var(--primary)] mb-2">Application Form</h2>
            <p className="text-[var(--text-muted)] text-sm">Submit your details and we will connect with you.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            
            {/* Role Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[var(--primary)]/10">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Applying For *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                >
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="Social Media Manager">Social Media Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Experience Level *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Full Name *</label>
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
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Current City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Cover Letter / Why should we hire you? *</label>
              <textarea
                name="coverLetter"
                required
                rows={5}
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium resize-none"
                placeholder="Tell us about your experience and why you'd be a great fit..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-luxury w-full py-5 text-base shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Submit Application"}
            </button>
            
            <p className="text-center text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mt-6">
              You will be redirected to WhatsApp to submit your application.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
