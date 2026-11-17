import { describe, expect, it } from "vitest";
import {
  skillSchema,
  roleSchema,
  type Role,
  type Skill,
} from "../../content/schemas";
import {
  assertNoErrors,
  findIntegrityErrors,
  type IntegrityInput,
} from "../../lib/integrity";

const skills: Skill[] = [
  { name: "React", tier: "production", category: "frontend", evidence: [] },
  { name: "Java", tier: "shipped", category: "backend", evidence: [] },
  { name: "Docker", tier: "learning", category: "infra", evidence: [] },
];

const roles: Role[] = [
  {
    company: "Acme",
    title: "Engineer",
    location: "Remote",
    start: "2024-01",
    highlights: ["Did a thing"],
    caseStudies: [],
  },
];

function input(overrides: Partial<IntegrityInput> = {}): IntegrityInput {
  return { skills, roles, caseStudies: [], logEntries: [], ...overrides };
}

describe("content integrity", () => {
  it("accepts consistent content", () => {
    const errors = findIntegrityErrors(
      input({
        caseStudies: [{ slug: "report-flow", stack: ["React", "Java"] }],
        logEntries: [{ slug: "docker-notes", topic: "Docker" }],
        skills: skills.map((s) =>
          s.name === "Docker" ? { ...s, evidence: ["docker-notes"] } : s,
        ),
      }),
    );
    expect(errors).toEqual([]);
  });

  it("rejects a case study stack item that is not a skill", () => {
    const errors = findIntegrityErrors(
      input({ caseStudies: [{ slug: "report-flow", stack: ["Rust"] }] }),
    );
    expect(errors).toEqual([
      'work/report-flow: stack item "Rust" is not in skills',
    ]);
  });

  it("rejects presenting a learning skill as case-study experience", () => {
    const errors = findIntegrityErrors(
      input({ caseStudies: [{ slug: "report-flow", stack: ["Docker"] }] }),
    );
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("learning skill, not experience");
  });

  it("rejects a log topic that is not a skill", () => {
    const errors = findIntegrityErrors(
      input({ logEntries: [{ slug: "x", topic: "Kafka" }] }),
    );
    expect(errors).toEqual(['now/x: topic "Kafka" is not in skills']);
  });

  it("rejects a log entry about a production skill", () => {
    const errors = findIntegrityErrors(
      input({ logEntries: [{ slug: "x", topic: "React" }] }),
    );
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("production skill");
  });

  it("rejects skill evidence that points at nothing", () => {
    const errors = findIntegrityErrors(
      input({
        skills: skills.map((s) =>
          s.name === "React" ? { ...s, evidence: ["ghost"] } : s,
        ),
      }),
    );
    expect(errors).toEqual(['skills: "React" cites unknown evidence "ghost"']);
  });

  it("rejects a role that cites a missing case study", () => {
    const errors = findIntegrityErrors(
      input({ roles: [{ ...roles[0], caseStudies: ["ghost"] }] }),
    );
    expect(errors).toEqual([
      'experience: Acme cites unknown case study "ghost"',
    ]);
  });

  it("rejects duplicate skills and duplicate slugs", () => {
    const errors = findIntegrityErrors(
      input({
        skills: [...skills, skills[0]],
        caseStudies: [{ slug: "same", stack: ["React"] }],
        logEntries: [{ slug: "same", topic: "Docker" }],
      }),
    );
    expect(errors).toHaveLength(2);
  });

  it("assertNoErrors throws with every message", () => {
    expect(() => assertNoErrors(["a", "b"])).toThrow(/- a\n- b/);
    expect(() => assertNoErrors([])).not.toThrow();
  });
});

describe("schemas", () => {
  it("rejects unknown keys on a skill", () => {
    expect(() => skillSchema.parse({ ...skills[0], level: 9 })).toThrow();
  });

  it("rejects a malformed role date", () => {
    expect(() =>
      roleSchema.parse({ ...roles[0], start: "Jan 2024" }),
    ).toThrow();
  });
});
