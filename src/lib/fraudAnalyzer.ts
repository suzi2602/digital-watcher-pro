export type RiskLevel = "safe" | "warning" | "danger";

export interface AnalysisResult {
  riskLevel: RiskLevel;
  score: number; // 0-100
  flags: string[];
  summary: string;
}

const PHISHING_KEYWORDS = [
  "urgent", "verify your account", "click here immediately",
  "suspended", "confirm your identity", "act now",
  "limited time", "congratulations you won", "prize",
  "lottery", "inheritance", "wire transfer",
  "social security", "bank account details", "password",
  "credit card", "update your payment", "unusual activity",
  "locked account", "verify immediately", "dear customer",
  "nigerian prince", "you have been selected", "claim your reward",
];

const SUSPICIOUS_URL_PATTERNS = [
  /bit\.ly/i, /tinyurl/i, /goo\.gl/i, /t\.co\//i, /rb\.gy/i, /shorturl/i,
  /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/,
  /\.tk(\/|$)/i, /\.ml(\/|$)/i, /\.ga(\/|$)/i, /\.cf(\/|$)/i, /\.xyz(\/|$)/i, /\.top(\/|$)/i, /\.buzz(\/|$)/i, /\.club(\/|$)/i,
  /@.*@/, /https?:\/\/[^/]*[A-Z].*[A-Z]/,
  /paypa[l1]|app[l1]e|go[o0]g[l1]e|amaz[o0]n|faceb[o0]{2}k|micros[o0]ft|netfl[i1]x/i,
  /https?:\/\/[^/]*-[^/]*-[^/]*\./i, // multiple hyphens in domain
  /https?:\/\/[^/]{50,}\//i, // excessively long domain
  /https?:\/\/[^/]*\d{5,}/i, // many numbers in domain
];

const URL_REGEX = /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+/gi;

const URGENCY_PHRASES = [
  "within 24 hours", "immediately", "right now", "don't delay",
  "act fast", "expires today", "last chance", "final warning",
  "your account will be", "failure to respond",
];

const MONEY_PATTERNS = [
  /\$[\d,]+/, /usd/i, /wire/i, /western union/i,
  /bitcoin/i, /crypto/i, /gift card/i, /money order/i,
  /send money/i, /transfer funds/i,
];

export function analyzeContent(content: string): AnalysisResult {
  const lower = content.toLowerCase();
  const flags: string[] = [];
  let score = 0;

  // Check phishing keywords
  const matchedKeywords = PHISHING_KEYWORDS.filter((kw) => lower.includes(kw));
  if (matchedKeywords.length > 0) {
    score += Math.min(matchedKeywords.length * 12, 40);
    flags.push(`Phishing keywords detected: "${matchedKeywords.slice(0, 3).join('", "')}"`);
  }

  // Check suspicious URLs
  const urlMatches = SUSPICIOUS_URL_PATTERNS.filter((p) => p.test(content));
  if (urlMatches.length > 0) {
    score += urlMatches.length * 15;
    flags.push("Suspicious URL patterns found");
  }

  // Check urgency
  const urgencyMatches = URGENCY_PHRASES.filter((p) => lower.includes(p));
  if (urgencyMatches.length > 0) {
    score += urgencyMatches.length * 10;
    flags.push("High-pressure urgency language detected");
  }

  // Check money references
  const moneyMatches = MONEY_PATTERNS.filter((p) => p.test(content));
  if (moneyMatches.length > 0) {
    score += moneyMatches.length * 10;
    flags.push("Financial/money transfer references found");
  }

  // Check for requests for personal info
  if (/ssn|social security|date of birth|mother'?s maiden/i.test(content)) {
    score += 25;
    flags.push("Requests for sensitive personal information");
  }

  // Check for misspelled brand names (common in phishing)
  if (/paypa[l1]|amaz[o0]n|go[o0]g[l1]e|faceb[o0]{2}k|micros[o0]ft/i.test(content)) {
    score += 20;
    flags.push("Possibly misspelled brand names (phishing indicator)");
  }

  // Grammar/spelling heuristic: excessive caps
  const capsRatio = (content.match(/[A-Z]/g) || []).length / Math.max(content.length, 1);
  if (capsRatio > 0.4 && content.length > 20) {
    score += 10;
    flags.push("Excessive capitalization (common in scam messages)");
  }

  score = Math.min(score, 100);

  let riskLevel: RiskLevel;
  let summary: string;

  if (score <= 20) {
    riskLevel = "safe";
    summary = "This content appears safe. No significant fraud indicators were detected.";
  } else if (score <= 55) {
    riskLevel = "warning";
    summary = "Some suspicious patterns were found. Proceed with caution and verify the sender's identity.";
  } else {
    riskLevel = "danger";
    summary = "High risk of fraud detected! Do not click any links, share personal info, or send money.";
  }

  if (flags.length === 0) {
    flags.push("No suspicious patterns detected");
  }

  return { riskLevel, score, flags, summary };
}
