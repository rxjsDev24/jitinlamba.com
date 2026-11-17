import { skillSchema, type Skill } from "../schemas";

const input: Skill[] = [
  {
    name: "TypeScript",
    tier: "production",
    category: "frontend",
    evidence: [],
  },
  {
    name: "JavaScript",
    tier: "production",
    category: "frontend",
    evidence: [],
  },
  { name: "React", tier: "production", category: "frontend", evidence: [] },
  { name: "Next.js", tier: "production", category: "frontend", evidence: [] },
  { name: "Redux", tier: "production", category: "frontend", evidence: [] },
  { name: "RxJS", tier: "production", category: "frontend", evidence: [] },
  {
    name: "Apollo GraphQL",
    tier: "production",
    category: "frontend",
    evidence: [],
  },
  {
    name: "Tailwind CSS",
    tier: "production",
    category: "frontend",
    evidence: [],
  },
  { name: "Sass/SCSS", tier: "production", category: "frontend", evidence: [] },
  { name: "Jest", tier: "production", category: "testing", evidence: [] },
  {
    name: "React Testing Library",
    tier: "production",
    category: "testing",
    evidence: [],
  },
  {
    name: "Microfrontends",
    tier: "production",
    category: "architecture",
    evidence: [],
  },
  {
    name: "Core Web Vitals",
    tier: "production",
    category: "architecture",
    evidence: [],
  },
  {
    name: "LLM product development",
    tier: "production",
    category: "ai",
    evidence: [],
  },

  { name: "Java", tier: "shipped", category: "backend", evidence: [] },
  { name: "Spring Boot", tier: "shipped", category: "backend", evidence: [] },
  { name: "MongoDB", tier: "shipped", category: "data", evidence: [] },

  { name: "Node.js", tier: "learning", category: "backend", evidence: [] },
  { name: "Webpack", tier: "learning", category: "frontend", evidence: [] },
  { name: "Docker", tier: "learning", category: "infra", evidence: [] },
  { name: "Kubernetes", tier: "learning", category: "infra", evidence: [] },
  { name: "Kafka", tier: "learning", category: "infra", evidence: [] },
  { name: "Elasticsearch", tier: "learning", category: "data", evidence: [] },
];

export const skills = input.map((skill) => skillSchema.parse(skill));
