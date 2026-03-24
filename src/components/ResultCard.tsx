import { Shield, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import type { AnalysisResult, RiskLevel } from "@/lib/fraudAnalyzer";

const riskConfig: Record<RiskLevel, { icon: typeof Shield; colorClass: string; bgClass: string; label: string }> = {
  safe: {
    icon: CheckCircle,
    colorClass: "text-safe",
    bgClass: "bg-safe/10 border-safe/20",
    label: "Safe",
  },
  warning: {
    icon: AlertTriangle,
    colorClass: "text-warning",
    bgClass: "bg-warning/10 border-warning/20",
    label: "Suspicious",
  },
  danger: {
    icon: XCircle,
    colorClass: "text-danger",
    bgClass: "bg-danger/10 border-danger/20",
    label: "Dangerous",
  },
};

interface Props {
  result: AnalysisResult;
}

const ResultCard = ({ result }: Props) => {
  const config = riskConfig[result.riskLevel];
  const Icon = config.icon;

  return (
    <div className={`rounded-2xl border p-6 shadow-sm md:p-8 ${config.bgClass}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`rounded-full bg-card p-2.5 shadow-sm ${config.colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className={`font-heading text-xl font-bold ${config.colorClass}`}>
            {config.label}
          </h3>
          <p className="text-sm text-muted-foreground">
            Risk Score: {result.score}/100
          </p>
        </div>
      </div>

      {/* Score bar */}
      <div className="mt-5">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-card">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              result.riskLevel === "safe"
                ? "bg-safe"
                : result.riskLevel === "warning"
                ? "bg-warning"
                : "bg-danger"
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {/* Summary */}
      <p className="mt-5 text-foreground">{result.summary}</p>

      {/* Flags */}
      <div className="mt-5">
        <h4 className="font-heading text-sm font-semibold text-foreground">
          Detection Details
        </h4>
        <ul className="mt-2 space-y-1.5">
          {result.flags.map((flag, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                result.riskLevel === "safe" ? "bg-safe" : result.riskLevel === "warning" ? "bg-warning" : "bg-danger"
              }`} />
              {flag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;
