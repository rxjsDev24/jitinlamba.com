import { roleSchema, type Role } from "../schemas";

const input: Role[] = [
  {
    company: "Sprinklr",
    title: "Senior Software Engineer, Insights team",
    location: "Gurugram, India",
    start: "2025-08",
    highlights: [
      "LLM Insights: built the report creation and management flow, mostly the UI, for Sprinklr's brand-visibility product for LLM-powered search. The product runs multiple LLMs in parallel to score brand and competitor AI-search visibility across configurable prompt pillars, and shipped to enterprise pilot clients.",
      "Copilot AI: Owned the refactor and expansion of the Copilot module, shipping AI-driven theme generation, keyword queries and a restructured prompt-suggestion architecture; lifted feature adoption by ~4% and cut analyst sessions by ~3 steps.",
      "Microfrontends: Architected the split of a monolithic frontend into independently deployable microfrontends, cutting per-team release cycle time by ~4% and ending shared-state deploy conflicts across 3+ teams.",
      "Backend for LLM Insights: Built backend features in Java, Spring Boot and MongoDB that enabled new LLM Insights use cases such as industry analysis.",
    ],
    caseStudies: [],
  },
  {
    company: "Spinny",
    title: "Senior Software Engineer (promoted from Software Engineer 2)",
    location: "Gurugram, India",
    start: "2022-05",
    end: "2025-08",
    highlights: [
      "Core Web Vitals: Fixed LCP, INP and CLS regressions across the purchase funnel with code splitting, lazy loading and caching, raising Core Web Vitals scores by 20%.",
      "Media performance: Integrated Gumlet for automated image delivery, cutting page load times by 30%, bounce rate by 15% and image latency by ~35%; built a MediaStream API video recorder that shrank support videos by 40%+.",
      "Spinny Care: Led UI development for a new car-servicing vertical, shipped end-to-end in 7 weeks, lifting platform engagement by 5%.",
      "Product pages: Revamped the Pricing and Gallery product pages with a new EMI calculator UX, raising loan attach rate by ~3% and gallery engagement by ~17% within 30 days.",
      "Rewards: Shipped rewards in Car Booking and Test Drive flows, lifting lead-to-delivery conversion by ~4%.",
    ],
    caseStudies: [],
  },
  {
    company: "Phenom People",
    title: "Product Development Engineer 1",
    location: "Hyderabad, India",
    start: "2020-09",
    end: "2022-02",
    highlights: [
      "Built the Interviews and Notes module of the HRM platform for recruiters across enterprise clients.",
      "Wrote Jest and React Testing Library suites for the Candidates domain; the test patterns were adopted across the frontend team.",
    ],
    caseStudies: [],
  },
];

export const roles = input.map((role) => roleSchema.parse(role));
