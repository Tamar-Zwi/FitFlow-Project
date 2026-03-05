"use client";

import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Users, Calendar, Flame, ChevronDown } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Interactive weekly calendar with real-time class availability and instant booking.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a passionate fitness community. Track progress together and stay motivated.",
  },
  {
    icon: Flame,
    title: "Track Your Fire",
    description: "Monitor calories burned, classes attended, and weekly goals with visual progress rings.",
  },
  {
    icon: Dumbbell,
    title: "Expert Instructors",
    description: "World-class trainers leading dynamic classes from yoga to high-intensity training.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#0f0f14" }}>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230f0f14' width='1920' height='1080'/%3E%3C/svg%3E"
          >
            <source
              src="https://videos.pexels.com/video-files/3191572/3191572-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Dumbbell className="h-7 w-7" style={{ color: "#CCFF00" }} />
              <span className="text-xl font-bold tracking-tight" style={{ color: "#f5f5f5" }}>
                FITFLOW <span style={{ color: "#CCFF00" }}>STUDIO</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: "#a0a0a0" }}>
                Features
              </a>
              <a href="#mission" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: "#a0a0a0" }}>
                Our Mission
              </a>
              <Link
                href="/auth/login"
                className="text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
              >
                Join the Flow
              </Link>
            </div>
            <Link
              href="/auth/login"
              className="md:hidden text-sm font-medium px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
            >
              Join
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-6"
              style={{ color: "#FF8C00" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Next Generation Fitness
            </motion.p>
            <h1
              className="glow-text-animated text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-balance"
              style={{ color: "#CCFF00" }}
            >
              FITFLOW
              <br />
              <span style={{ color: "#f5f5f5" }}>STUDIO</span>
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
              style={{ color: "#b0b0b0" }}
            >
              Where technology meets fitness. Book classes, track your progress,
              and join a community that moves together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 neon-lime"
                style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
              >
                Join the Flow
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/auth/login"
                className="glass flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105"
                style={{ color: "#f5f5f5" }}
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6" style={{ color: "#CCFF00", opacity: 0.6 }} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6" style={{ backgroundColor: "#0f0f14" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#f5f5f5" }}>
              Why <span style={{ color: "#CCFF00" }}>FitFlow</span>?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#808080" }}>
              A next-gen platform designed to make your fitness journey seamless, social, and data-driven.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="glass rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(204, 255, 0, 0.1)" }}
                >
                  <feature.icon className="h-6 w-6" style={{ color: "#CCFF00" }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#f5f5f5" }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "#808080" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="relative z-10 py-24 px-6" style={{ backgroundColor: "#111118" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#f5f5f5" }}>
              Our <span style={{ color: "#FF8C00" }}>Mission</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "#a0a0a0" }}>
              We believe fitness is not just about lifting weights or running miles.
              It is about building discipline, finding your community, and pushing past
              what you thought possible. FitFlow Studio provides the tools, the classes,
              and the energy to keep you in the flow.
            </p>
            <div className="glass rounded-2xl p-8 md:p-12">
              <p className="text-2xl md:text-3xl font-bold italic mb-4" style={{ color: "#CCFF00" }}>
                {'"'}Move. Flow. Transform.{'"'}
              </p>
              <p className="text-sm font-medium tracking-widest uppercase" style={{ color: "#FF8C00" }}>
                The FitFlow Philosophy
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6" style={{ backgroundColor: "#0f0f14" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#f5f5f5" }}>
              Ready to Find Your <span className="neon-lime-text" style={{ color: "#CCFF00" }}>Flow</span>?
            </h2>
            <p className="text-lg mb-10" style={{ color: "#808080" }}>
              Join hundreds of members who have already transformed their fitness journey.
            </p>
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 neon-lime"
              style={{ backgroundColor: "#CCFF00", color: "#0f0f14" }}
            >
              Start Your Journey
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6" style={{ borderTop: "1px solid rgba(204, 255, 0, 0.1)", backgroundColor: "#0a0a0f" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" style={{ color: "#CCFF00" }} />
            <span className="text-sm font-bold" style={{ color: "#f5f5f5" }}>FITFLOW STUDIO</span>
          </div>
          <p className="text-sm" style={{ color: "#606060" }}>
            2026 FitFlow Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
