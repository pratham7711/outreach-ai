"use client";

import { motion } from "framer-motion";
import { SectionHeader, Badge, Button } from "@pratham7711/ui";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For solo managers getting started.",
    features: ["Up to 25 creators", "3 active campaigns", "Basic analytics", "Email support"],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    description: "For growing agencies that need more.",
    features: ["Unlimited creators", "Unlimited campaigns", "Advanced analytics & ROI", "Automated payouts", "White-label reports", "Priority support"],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams with custom needs.",
    features: ["Everything in Pro", "SSO & audit logs", "Custom integrations", "Dedicated account manager", "SLA guarantee"],
    cta: "Contact sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 md:py-36" style={{ background: "var(--cc-bg-alt)" }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <SectionHeader
            overline="Pricing"
            title="Simple, transparent pricing"
            subtitle="Start free. Upgrade when you're ready. No hidden fees."
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
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={fadeUp}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 ${
                  tier.popular ? "glow-blue" : "glass-card"
                }`}
                style={
                  tier.popular
                    ? {
                        background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.04) 100%)",
                        border: "1px solid rgba(59,130,246,0.25)",
                        borderRadius: 16,
                      }
                    : undefined
                }
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}

                <h3 className="text-subheading" style={{ color: "var(--cc-text)" }}>{tier.name}</h3>
                <p className="text-body-sm mt-1" style={{ color: "var(--cc-text-muted)" }}>{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span style={{ color: "var(--cc-text)", fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-body-sm" style={{ color: "var(--cc-text-subtle)" }}>{tier.period}</span>
                  )}
                </div>

                <div className="gradient-line my-6" />

                <ul className="flex flex-1 flex-col gap-3.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ background: "var(--cc-accent-glow)" }}
                      >
                        <Check size={12} style={{ color: "var(--cc-accent-light)" }} />
                      </div>
                      <span className="text-body-sm" style={{ color: "var(--cc-text-muted)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? "primary" : "secondary"}
                  className={tier.popular ? "ui-btn-primary" : "ui-btn-secondary"}
                  fullWidth
                  style={{ marginTop: 32 }}
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
