"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, RefreshCw } from "lucide-react";
import { getRandomQuote } from "@/src/data/quotes";

export function MotivationCard() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20"
        style={{ backgroundColor: "#FF8C00" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5" style={{ color: "#FF8C00" }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#FF8C00" }}>
              Daily Motivation
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            onClick={refreshQuote}
            className="p-1.5 rounded-lg transition-all duration-200"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              style={{ color: "#808080" }}
            />
          </motion.button>
        </div>

        <motion.div
          key={quote.text}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-base md:text-lg font-medium italic leading-relaxed mb-3" style={{ color: "#f5f5f5" }}>
            {'"'}{quote.text}{'"'}
          </p>
          <p className="text-xs font-medium" style={{ color: "#CCFF00" }}>
            - {quote.author}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
