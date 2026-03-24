import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanSearch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeContent, type AnalysisResult } from "@/lib/fraudAnalyzer";
import ResultCard from "./ResultCard";

const EXAMPLE_MESSAGES = [
  "Congratulations! You've won a $1,000 gift card. Click here immediately to claim your prize before it expires in 24 hours!",
  "Hi Sarah, just confirming our lunch plans for tomorrow at noon. See you at the usual place!",
  "URGENT: Your PayPa1 account has been suspended. Verify your identity now at bit.ly/x3k9 or your account will be permanently deleted within 24 hours.",
];

const AnalyzerSection = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    // Simulate processing delay for UX
    setTimeout(() => {
      const analysis = analyzeContent(content);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <section id="analyzer" className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Analyze Content
          </h2>
          <p className="mt-3 text-muted-foreground">
            Paste a message, email, or URL below to check for fraud
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste suspicious text, email content, or URL here..."
            className="min-h-[140px] resize-none rounded-xl border-border bg-card text-base shadow-sm transition-shadow focus:shadow-md"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Try an example:</span>
            {EXAMPLE_MESSAGES.map((msg, i) => (
              <button
                key={i}
                onClick={() => { setContent(msg); setResult(null); }}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-accent"
              >
                Example {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!content.trim() || isAnalyzing}
              size="lg"
              className="gap-2 rounded-xl px-8 font-heading font-semibold shadow-md transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ScanSearch className="h-5 w-5" />
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze Now"}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-10"
            >
              <ResultCard result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AnalyzerSection;
