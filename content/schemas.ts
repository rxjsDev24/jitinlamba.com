import { z } from "zod";

export const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "use lowercase-kebab-case");
const isoMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "use YYYY-MM");

export const skillTiers = ["production", "shipped", "learning"] as const;
export const skillTier = z.enum(skillTiers);

export const skillSchema = z.strictObject({
  name: z.string().min(1),
  tier: skillTier,
  category: z.enum([
    "frontend",
    "backend",
    "data",
    "infra",
    "ai",
    "testing",
    "architecture",
  ]),
  evidence: z.array(slug).default([]),
  since: isoMonth.optional(),
});

export const roleSchema = z.strictObject({
  company: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  start: isoMonth,
  end: isoMonth.optional(),
  highlights: z.array(z.string().min(1)).min(1),
  caseStudies: z.array(slug).default([]),
});

export const caseStudySchema = z.strictObject({
  title: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  impact: z
    .array(
      z.strictObject({ label: z.string().min(1), value: z.string().min(1) }),
    )
    .default([]),
  stack: z.array(z.string().min(1)).min(1),
  featured: z.boolean().default(false),
  confidential: z.boolean().default(false),
});

export const logEntrySchema = z.strictObject({
  date: z.iso.date(),
  topic: z.string().min(1),
  title: z.string().min(1),
  link: z.url().optional(),
});

export type SkillTier = z.infer<typeof skillTier>;
export type Skill = z.infer<typeof skillSchema>;
export type Role = z.infer<typeof roleSchema>;
export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;
export type LogEntryFrontmatter = z.infer<typeof logEntrySchema>;
