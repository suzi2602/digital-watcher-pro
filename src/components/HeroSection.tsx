import { motion } from "framer-motion";
import { Shield, ScanSearch, AlertTriangle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
        >
          <Shield className="h-4 w-4 text-primary" />
          AI-Powered Protection
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        >
          Stay Safe Online with{" "}
          <span className="text-primary">ShieldHer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Paste any suspicious message, email, or URL — our smart analyzer detects
          scams, phishing attempts, and fraud patterns to keep you protected.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { icon: ScanSearch, label: "Message Analysis" },
            { icon: AlertTriangle, label: "Scam Detection" },
            { icon: Shield, label: "URL Safety Check" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
