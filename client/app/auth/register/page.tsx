"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usersAPI } from "@/src/services/api";
import { toast } from "sonner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await usersAPI.register({ email, name, password, phone });
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } catch (err: unknown) {
      const error = err as { response?: { status?: number } };
      if (error.response?.status === 409) {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: "#0f0f14" }}>
      {/* Background Elements */}
      <div
        className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: "#FF8C00" }}
      />
      <div
        className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
        style={{ backgroundColor: "#CCFF00" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Dumbbell className="h-8 w-8" style={{ color: "#CCFF00" }} />
          <span className="text-2xl font-bold" style={{ color: "#f5f5f5" }}>
            FITFLOW <span style={{ color: "#CCFF00" }}>STUDIO</span>
          </span>
        </Link>

        {/* Glass Card */}
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#f5f5f5" }}>
              Create Account
            </h1>
            <p className="text-sm" style={{ color: "#808080" }}>
              Begin your transformation today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#606060" }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 placeholder:opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204, 255, 0, 0.1)", color: "#f5f5f5" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#606060" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 placeholder:opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204, 255, 0, 0.1)", color: "#f5f5f5" }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#606060" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="050-000-0000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 placeholder:opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204, 255, 0, 0.1)", color: "#f5f5f5" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#b0b0b0" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#606060" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 placeholder:opacity-40"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(204, 255, 0, 0.1)", color: "#f5f5f5" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#606060" }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm mt-2 transition-all duration-300 disabled:opacity-50"
              style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#0f0f14", borderTopColor: "transparent" }} />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#808080" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "#CCFF00" }}>
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
