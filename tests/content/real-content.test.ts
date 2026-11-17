import { readdirSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { roles } from "../../content/data/experience";
import { skills } from "../../content/data/skills";
import {
  caseStudySchema,
  logEntrySchema,
  slug as slugSchema,
} from "../../content/schemas";
import { findIntegrityErrors } from "../../lib/integrity";

const root = join(__dirname, "..", "..", "content");

function readCollection(dir: string) {
  const folder = join(root, dir);
  return readdirSync(folder)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = basename(file, ".mdx");
      slugSchema.parse(slug);
      return {
        slug,
        data: matter(readFileSync(join(folder, file), "utf8")).data,
      };
    });
}

describe("real content", () => {
  it("has no broken references and no schema violations", () => {
    const caseStudies = readCollection("work").map(({ slug, data }) => ({
      slug,
      ...caseStudySchema.parse(data),
    }));
    const logEntries = readCollection("now").map(({ slug, data }) => ({
      slug,
      ...logEntrySchema.parse(data),
    }));

    expect(
      findIntegrityErrors({ skills, roles, caseStudies, logEntries }),
    ).toEqual([]);
  });
});
