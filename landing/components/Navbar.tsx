"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@pratham7711/ui";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "cc-nav-scrolled" : "cc-nav-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-subheading tracking-tight" style={{ color: "var(--cc-text)" }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--cc-gradient)" }}>
            <span className="text-xs font-bold text-white">C</span>
          </div>
          Outreach AI
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="cc-nav-link">{l.label}</a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" size="sm" className="ui-btn-secondary">Sign in</Button>
          <Button variant="primary" size="sm" className="ui-btn-primary">Get Started</Button>
        </div>

        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{ color: "var(--cc-text)" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t md:hidden"
            style={{ background: "var(--cc-bg)", borderColor: "var(--cc-border)" }}
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="cc-nav-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" size="sm" className="ui-btn-secondary" fullWidth>Sign in</Button>
                <Button variant="primary" size="sm" className="ui-btn-primary" fullWidth>Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
