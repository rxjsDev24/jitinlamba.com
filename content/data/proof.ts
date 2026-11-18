import type { SkillTier } from "../schemas";

export type Proof = {
  value: string;
  label: string;
  source: string;
};

export const proof: Proof[] = [
  {
    value: "6 yrs",
    label: "Building React and TypeScript products",
    source: "Since 2020",
  },
  { value: "30%", label: "Faster page loads", source: "Spinny" },
  { value: "20%", label: "Better Core Web Vitals scores", source: "Spinny" },
  {
    value: "LLM",
    label: "Brand-intelligence product shipped to enterprise pilots",
    source: "Sprinklr",
  },
];

export const tierBlurbs: Record<SkillTier, string> = {
  production: "Used daily in production work.",
  shipped: "Shipped features with it at work.",
  learning: "Studying now. Not professional experience yet.",
};
