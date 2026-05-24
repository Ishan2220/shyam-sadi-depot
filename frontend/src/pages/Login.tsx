import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { motion } from "framer-motion";

export default function Login() {
  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-gold)]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      <div className="absolute inset-0 opacity-30 luxury-grain mix-blend-overlay pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="premium-card p-8 md:p-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[#3A2818] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <User size={24} className="text-[var(--secondary)]" />
          </div>
          
          <h1 className="text-3xl font-display font-bold text-[var(--primary)] mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-8 font-light">
            {isLogin
              ? "Sign in to access your curated collections and wishlists."
              : "Join us to experience the world of luxury ethnic fashion."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={18} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                    placeholder="Enter your name"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/50" size={18} />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  placeholder="your@email.com"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/50" size={18} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Password *</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-widest hover:text-[var(--primary)] transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/50" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/50 hover:text-[var(--primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-luxury w-full py-4 text-sm mt-4 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--primary)]/10">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
              {isLogin ? "New to Shyam Sadi Depot?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                clearError();
              }}
              className="mt-3 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent-gold)] transition-colors tracking-wide"
            >
              {isLogin ? "Create an account" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
