# CLAUDE.md for jitinlamba.com

This is Jitin Lamba's personal portfolio site. Read `ARCHITECTURE.md` (v0.2) before making any change.

## Who this is for

- Owner: Jitin Lamba. Senior Software Engineer at Sprinklr since Aug 2025, based in Gurugram.
  Frontend-focused (JS/TS, React, Next.js, Tailwind, Apollo GraphQL), has shipped LLM products, moving toward full stack.
- Audience, in priority order: (1) recruiters and hiring managers for Senior Frontend, Full-Stack, AI-product and FDE roles,
  (2) freelance clients, (3) people curious about his travel (Instagram @ludic.lens).

## Decisions already settled

- One site, engineer first. Travel is a section (globe, later trips) that also shows off frontend craft.
- Hand-built with public code at `rxjsDev24/jitinlamba.com`. The repo is a code sample, so keep it clean.
- Dark only. Black background, white text, neon green accent used for motion. Editorial and minimal. CSS-only animation apart from the globe.
- Skills are shown in tiers `production`, `shipped`, `learning`, plus a dated `/now` log.
  **Never present a `learning` skill as experience.** Seed lists are in ARCHITECTURE.md §7.
- v1 travel is a globe with pins. Trip pages come in slice 6. The trip photo host is chosen then.
- Contact is `mailto:` at `hello@jitinlamba.com` plus LinkedIn. No form.
- The LLM Insights case study states only what Jitin told us. He owned the report creation and management flow in the UI and built supporting Java/Spring Boot/MongoDB features. No metric appears unless he gives one.
- The public `resume.pdf` has no phone number. The full resume stays private. The source file `Common.pdf` in the project folder is not served.
- Get v1 live in about 2 weeks. Update monthly at most. Avoid designs that look dead when there is a gap.
- Domain `jitinlamba.com` is on Cloudflare. DNS on Cloudflare (grey cloud) points to Vercel Hobby. Jitin adds the records by hand, using the values from the Vercel dashboard.
- Package manager is pnpm. Node LTS is pinned. License is MIT for code, all rights reserved for `content/` and images.

## Tooling notes

- The GitHub connector does not authenticate. Use the `gh` CLI after Jitin runs `gh auth login`.
- The Cloudflare connector has no DNS tools. Never ask Jitin for an API token in chat.

## Still open

See ARCHITECTURE.md §10: reference sites, headshot, LinkedIn URL, real case-study numbers, and the trip photo host.

## Working rules

- TypeScript strict. Server Components by default. `'use client'` only in `components/islands/`.
- Content is validated with Zod at build time. Broken cross-references must fail the build.
- Every PR runs lint, typecheck, build, Playwright and axe, and Lighthouse 95 or higher on mobile.
- Build in the vertical slices from ARCHITECTURE.md §11. Each slice ends deployed.
- Do not invent metrics or experience for case studies. Ask Jitin for real numbers.
