"use client";

import { motion } from "framer-motion";
import { Card, SectionHeader } from "@pratham7711/ui";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";
import { Users, BarChart3, DollarSign, Calendar, Palette, Shield } from "lucide-react";

const features = [
  {
    icon: <Users size={22} />,
    title: "Creator CRM",
    description: "Track every relationship, conversation, and deliverable in one searchable database.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "#60a5fa",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Campaign Analytics",
    description: "Real-time dashboards for reach, engagement, and ROI across all campaigns.",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconColor: "#a78bfa",
  },
  {
    icon: <DollarSign size={22} />,
    title: "Automated Payouts",
    description: "Set payment milestones, auto-generate invoices, and pay creators in 50+ currencies.",
    gradient: "from-emerald-500/10 to-green-500/10",
    iconColor: "#34d399",
  },
  {
    icon: <Calendar size={22} />,
    title: "Content Calendar",
    description: "Visual timeline for every deliverable. Drag, reschedule, and never miss a deadline.",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconColor: "#fbbf24",
  },
  {
    icon: <Palette size={22} />,
    title: "White-Label Reports",
    description: "Export branded campaign reports with your logo, colors, and custom domain.",
    gradient: "from-pink-500/10 to-rose-500/10",
    iconColor: "#f472b6",
  },
  {
    icon: <Shield size={22} />,
    title: "Contract Management",
    description: "Template-based contracts with e-signatures, usage rights tracking, and auto-renewals.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "#818cf8",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 md:py-36">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <SectionHeader
            overline="Platform"
            title="Everything to run your creator operation"
            subtitle="Six core modules that replace your spreadsheets, email threads, and disconnected tools."
            centered
          />
        </motion.div>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <div className="glass-card gradient-border group h-full p-6">
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient}`}
                  style={{ color: f.iconColor }}
                >
                  {f.icon}
                </div>
                <h3 className="text-subheading mb-2" style={{ color: "var(--cc-text)" }}>
                  {f.title}
                </h3>
                <p className="text-body" style={{ color: "var(--cc-text-muted)" }}>
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
