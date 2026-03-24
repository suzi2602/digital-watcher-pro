import { motion } from "framer-motion";
import { Lock, Eye, Link2, UserX } from "lucide-react";

const tips = [
  {
    icon: Eye,
    title: "Verify the Sender",
    description: "Always check the sender's email address carefully. Scammers often use addresses that look similar to legitimate ones.",
  },
  {
    icon: Link2,
    title: "Don't Click Unknown Links",
    description: "Hover over links to preview the URL before clicking. Avoid shortened URLs from unknown sources.",
  },
  {
    icon: Lock,
    title: "Protect Personal Info",
    description: "Never share passwords, SSN, or bank details via email or text. Legitimate organizations won't ask for these.",
  },
  {
    icon: UserX,
    title: "Trust Your Instincts",
    description: "If something feels too good to be true or creates panic, it's likely a scam. Take time to verify before acting.",
  },
];

const SafetyTips = () => {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Safety Tips
          </h2>
          <p className="mt-3 text-muted-foreground">
            Essential practices to stay protected online
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <tip.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {tip.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;
