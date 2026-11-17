import type { Role, Skill } from "../content/schemas";

export type IntegrityInput = {
  skills: Skill[];
  roles: Role[];
  caseStudies: { slug: string; stack: string[] }[];
  logEntries: { slug: string; topic: string }[];
};

export function checkCaseStudy(
  study: { slug: string; stack: string[] },
  skills: Skill[],
): string[] {
  const byName = new Map(skills.map((skill) => [skill.name, skill]));
  return study.stack.flatMap((name) => {
    const skill = byName.get(name);
    if (!skill)
      return [`work/${study.slug}: stack item "${name}" is not in skills`];
    if (skill.tier === "learning") {
      return [
        `work/${study.slug}: stack item "${name}" is a learning skill, not experience`,
      ];
    }
    return [];
  });
}

export function checkLogEntry(
  entry: { slug: string; topic: string },
  skills: Skill[],
): string[] {
  const skill = skills.find((candidate) => candidate.name === entry.topic);
  if (!skill)
    return [`now/${entry.slug}: topic "${entry.topic}" is not in skills`];
  if (skill.tier === "production") {
    return [
      `now/${entry.slug}: topic "${entry.topic}" is a production skill, not a learning or shipped one`,
    ];
  }
  return [];
}

export function findIntegrityErrors(input: IntegrityInput): string[] {
  const { skills, roles, caseStudies, logEntries } = input;
  const errors: string[] = [];

  const names = new Set<string>();
  for (const skill of skills) {
    if (names.has(skill.name))
      errors.push(`skills: duplicate skill "${skill.name}"`);
    names.add(skill.name);
  }

  const slugs = new Set<string>();
  for (const { slug } of [...caseStudies, ...logEntries]) {
    if (slugs.has(slug))
      errors.push(`slug "${slug}" is used by more than one work or now entry`);
    slugs.add(slug);
  }

  const studySlugs = new Set(caseStudies.map((study) => study.slug));

  for (const skill of skills) {
    for (const slug of skill.evidence) {
      if (!slugs.has(slug))
        errors.push(`skills: "${skill.name}" cites unknown evidence "${slug}"`);
    }
  }

  for (const role of roles) {
    for (const slug of role.caseStudies) {
      if (!studySlugs.has(slug)) {
        errors.push(
          `experience: ${role.company} cites unknown case study "${slug}"`,
        );
      }
    }
  }

  for (const study of caseStudies)
    errors.push(...checkCaseStudy(study, skills));
  for (const entry of logEntries) errors.push(...checkLogEntry(entry, skills));

  return errors;
}

export function assertNoErrors(errors: string[]): void {
  if (errors.length > 0) {
    throw new Error(
      `Content integrity check failed:\n- ${errors.join("\n- ")}`,
    );
  }
}
