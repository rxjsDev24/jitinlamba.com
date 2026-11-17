import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { skills } from "./content/data/skills";
import { caseStudySchema, logEntrySchema } from "./content/schemas";
import { assertNoErrors, checkCaseStudy, checkLogEntry } from "./lib/integrity";
import { z } from "zod";

const work = defineCollection({
  name: "work",
  directory: "content/work",
  include: "*.mdx",
  schema: caseStudySchema.extend({ content: z.string() }),
  transform: async (document, context) => {
    const slug = document._meta.path;
    assertNoErrors(checkCaseStudy({ slug, stack: document.stack }, skills));
    const mdx = await compileMDX(context, document);
    return { ...document, slug, mdx };
  },
});

const now = defineCollection({
  name: "now",
  directory: "content/now",
  include: "*.mdx",
  schema: logEntrySchema.extend({ content: z.string() }),
  transform: async (document, context) => {
    const slug = document._meta.path;
    assertNoErrors(checkLogEntry({ slug, topic: document.topic }, skills));
    const mdx = await compileMDX(context, document);
    return { ...document, slug, mdx };
  },
});

export default defineConfig({ content: [work, now] });
