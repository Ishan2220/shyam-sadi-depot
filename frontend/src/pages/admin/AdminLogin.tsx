import React, { useState } from "react";
import { useAdminAuth } from "../../stores/adminAuthStore";
import { Navigate } from "react-router-dom";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const { login, isAuthenticated, isLoading, error, clearError } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30 luxury-grain mix-blend-overlay pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="premium-card p-8 md:p-10 text-center border-t-4 border-t-[var(--primary)]">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[#3A2818] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield size={28} className="text-[var(--accent-gold)]" />
          </div>
          <h1 className="text-3xl font-display font-bold text-[var(--primary)] mb-2">
            Admin Portal
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-8 font-light">
            Authorized personnel only.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={18} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="admin-email" className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Email Address *
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shyamsadidepot.com"
                required
                className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-4 pr-10 py-3 bg-[#f8f5f0] border border-transparent rounded-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-sm font-medium"
                />
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
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
