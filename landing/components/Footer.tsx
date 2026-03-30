"use client";

import { motion } from "framer-motion";
import { Button } from "@pratham7711/ui";
import { fadeUp, stagger, viewportOnce, ease } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Integrations"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API Reference", "Guides", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
};

export default function Footer() {
  return (
    <footer className="relative pt-28 pb-12">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* CTA Block */}
        <motion.div
          className="shimmer relative mb-24 overflow-hidden rounded-3xl p-14 text-center md:p-20"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.04) 50%, rgba(59,130,246,0.06) 100%)",
            border: "1px solid var(--cc-border)",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <h2 className="text-heading" style={{ color: "var(--cc-text)" }}>
              Ready to replace your spreadsheets?
            </h2>
            <p className="text-body-lg mx-auto mt-4 max-w-md" style={{ color: "var(--cc-text-muted)" }}>
              Start your free trial today. No credit card required.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button variant="primary" size="lg" className="ui-btn-primary" iconRight={<ArrowRight size={16} />}>
                Get started free
              </Button>
              <Button variant="secondary" size="lg" className="ui-btn-secondary">
                Talk to sales
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Gradient divider */}
        <div className="gradient-line mb-16" />

        {/* Footer grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-5"
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--cc-gradient)" }}>
                <span className="text-xs font-bold text-white">C</span>
              </div>
              <span className="text-subheading tracking-tight" style={{ color: "var(--cc-text)" }}>
                Outreach AI
              </span>
            </div>
            <p className="text-body-sm mt-4" style={{ color: "var(--cc-text-subtle)" }}>
              The core of the creator economy.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeUp}>
              <h4 className="text-overline mb-4" style={{ color: "var(--cc-text-muted)" }}>
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="cc-footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "var(--cc-border)" }}
        >
          <p className="text-caption" style={{ color: "var(--cc-text-subtle)" }}>
            &copy; {new Date().getFullYear()} Outreach AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="cc-footer-link" aria-label="Twitter">Twitter</a>
            <a href="#" className="cc-footer-link" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" className="cc-footer-link" aria-label="GitHub">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
