"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@pratham7711/ui";
import { fadeUp, stagger, viewportOnce, ease } from "@/lib/animations";
import { Upload, Rocket, CircleDollarSign } from "lucide-react";

const steps = [
  {
    icon: <Upload size={24} />,
    number: "01",
    title: "Import your creators",
    description: "Bulk-import from CSV, connect Instagram or TikTok, or add manually. Profiles auto-enrich with engagement data.",
  },
  {
    icon: <Rocket size={24} />,
    number: "02",
    title: "Launch a campaign",
    description: "Set deliverables, deadlines, and budgets. Invite creators and track acceptance in real time.",
  },
  {
    icon: <CircleDollarSign size={24} />,
    number: "03",
    title: "Track & pay",
    description: "Monitor content delivery live. Approve deliverables and trigger automated payments when milestones hit.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 md:py-36" style={{ background: "var(--cc-bg-alt)" }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <SectionHeader
            overline="How it works"
            title={<>Three steps. <span className="gradient-text">Zero spreadsheets.</span></>}
            subtitle="Get your first campaign live in under 10 minutes."
            centered
          />
        </motion.div>

        <motion.div
          className="relative mt-20 grid gap-8 md:grid-cols-3"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Connector line */}
          <motion.div
            className="absolute top-16 left-[16.6%] right-[16.6%] hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, transparent, var(--cc-accent), var(--cc-purple), transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, delay: 0.4, ease }}
          />

          {steps.map((step, i) => (
            <motion.div key={step.number} variants={fadeUp} className="relative text-center">
              {/* Step circle */}
              <div className="relative mx-auto mb-8">
                <div
                  className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl"
                  style={{
                    background: "var(--cc-bg-alt)",
                    border: "1px solid var(--cc-border)",
                    color: "var(--cc-accent-light)",
                  }}
                >
                  {step.icon}
                </div>
                {/* Glow behind */}
                <div
                  className="absolute inset-0 mx-auto h-[72px] w-[72px] rounded-2xl opacity-40 blur-xl"
                  style={{ background: i === 1 ? "var(--cc-purple-glow)" : "var(--cc-accent-glow)" }}
                />
              </div>

              <div
                className="text-overline mb-3 inline-block rounded-full px-3 py-1"
                style={{ background: "var(--cc-surface)", color: "var(--cc-accent-light)" }}
              >
                Step {step.number}
              </div>
              <h3 className="text-subheading mb-3" style={{ color: "var(--cc-text)" }}>
                {step.title}
              </h3>
              <p className="text-body mx-auto max-w-xs" style={{ color: "var(--cc-text-muted)" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
