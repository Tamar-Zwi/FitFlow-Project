"use client";

import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

export function useConfetti() {
  const fire = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 20,
      colors: ["#CCFF00", "#FF8C00", "#ffffff", "#00ff88"],
    };

    confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ["circle"] });
    confetti({ ...defaults, particleCount: 25, scalar: 0.8, shapes: ["square"] });
    
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 30, scalar: 1, shapes: ["circle"] });
    }, 150);
  }, []);

  return fire;
}

interface SuccessAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

export function SuccessAnimation({ show, onComplete }: SuccessAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#CCFF00" }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Check className="h-12 w-12" style={{ color: "#0f0f14" }} strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
