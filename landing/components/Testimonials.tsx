"use client";

import { motion } from "framer-motion";
import { Card, SectionHeader, Avatar } from "@pratham7711/ui";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "We cut campaign setup time by 70%. What used to take a full day now takes two hours.",
    name: "Maya Chen",
    role: "Head of Partnerships",
    company: "Surge Creative",
    stars: 5,
  },
  {
    quote: "The automated payouts alone saved us from hiring another ops person. It just works.",
    name: "Jordan Ellis",
    role: "CEO",
    company: "Nova Sound",
    stars: 5,
  },
  {
    quote: "Finally a tool built for agencies, not brands pretending to be agencies. The white-label reports are perfect.",
    name: "Priya Sharma",
    role: "Founder",
    company: "Reach Collective",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <SectionHeader
            overline="Testimonials"
            title="Teams ship faster with Outreach AI"
            subtitle="Hear from the agencies and brands who made the switch."
            centered
          />
        </motion.div>

        <motion.div
          className="mt-16 grid gap-5 md:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <div className="glass-card flex h-full flex-col p-7">
                {/* Stars */}
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--cc-accent)" color="var(--cc-accent)" />
                  ))}
                </div>

                <p className="text-body mb-8 flex-1" style={{ color: "var(--cc-text-muted)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <p className="text-body-sm font-semibold" style={{ color: "var(--cc-text)" }}>
                      {t.name}
                    </p>
                    <p className="text-caption" style={{ color: "var(--cc-text-subtle)" }}>
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
