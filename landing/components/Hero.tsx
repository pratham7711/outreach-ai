"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@pratham7711/ui";
import { fadeUp, stagger, viewportOnce, ease } from "@/lib/animations";
import { ArrowRight, Play } from "lucide-react";

const stats = [
  { value: "500+", label: "Agencies" },
  { value: "2.4M", label: "Creators reached" },
  { value: "98%", label: "Satisfaction" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />

      {/* Floating orbs */}
      <div
        className="animate-orb pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)" }}
      />
      <div
        className="animate-orb-slow pointer-events-none absolute -bottom-32 left-1/4 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-6 pt-36 pb-20 text-center md:pt-44 md:pb-28">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-caption"
            style={{
              background: "var(--cc-gradient-subtle)",
              border: "1px solid var(--cc-border)",
              color: "var(--cc-accent-light)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cc-accent)" }} />
            Now in public beta — Join 500+ agencies
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-display mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          Run creator campaigns{" "}
          <br className="hidden sm:block" />
          from <span className="gradient-text-hero">pitch to payout</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-body-lg mx-auto mt-6 max-w-2xl"
          style={{ color: "var(--cc-text-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          The all-in-one platform for managing influencer partnerships,
          tracking deliverables, and automating payments — so your team can
          focus on building relationships, not spreadsheets.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          <Button variant="primary" size="lg" className="ui-btn-primary" iconRight={<ArrowRight size={16} />}>
            Start free trial
          </Button>
          <Button variant="secondary" size="lg" className="ui-btn-secondary" iconLeft={<Play size={14} />}>
            Watch demo
          </Button>
        </motion.div>

        {/* Trust */}
        <motion.p
          className="text-body-sm mt-6"
          style={{ color: "var(--cc-text-subtle)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          No credit card required · 14-day free trial · Cancel anytime
        </motion.p>

        {/* Stats bar */}
        <motion.div
          className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-8"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="text-heading" style={{ color: "var(--cc-text)" }}>
                {stat.value}
              </div>
              <div className="text-caption mt-1" style={{ color: "var(--cc-text-subtle)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient divider */}
        <motion.div
          className="gradient-line mx-auto mt-20 w-full max-w-lg"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.2, ease }}
        />
      </div>
    </section>
  );
}
