"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color?: string;
}

export function AnimatedCounter({
  end,
  duration = 2,
  label,
  prefix = "",
  suffix = "",
  color = "#CCFF00",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const endTime = startTime + duration * 1000;

          const tick = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (endTime - startTime), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-black font-mono" style={{ color }}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-xs font-medium mt-1 tracking-wide uppercase" style={{ color: "#808080" }}>
        {label}
      </p>
    </motion.div>
  );
}
