import { roles } from "@/content/data/experience";
import { proof, tierBlurbs } from "@/content/data/proof";
import { site } from "@/content/data/site";
import { skills } from "@/content/data/skills";
import { skillTiers } from "@/content/schemas";
import { formatPeriod, splitHighlight } from "@/lib/format";

const repoUrl = "https://github.com/rxjsDev24/jitinlamba.com";

const sections = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const textLink = `underline decoration-accent decoration-1 underline-offset-[6px] transition-colors hover:text-accent ${focusRing}`;
const label = "font-mono text-xs uppercase tracking-[0.2em] text-muted";
const gutter = "mx-auto w-full max-w-6xl px-4 sm:px-8";

const marqueeItems = skills
  .filter((skill) => skill.tier === "production")
  .map((skill) => skill.name);

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <Proof />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className={`${gutter} flex h-14 items-center justify-between`}>
        <a
          href="#main"
          className={`font-mono text-sm font-semibold ${focusRing}`}
        >
          JL
          <span aria-hidden className="text-accent">
            .
          </span>
          <span className="sr-only">, back to top</span>
        </a>
        <nav aria-label="Sections">
          <ul className="flex gap-4 font-mono text-[11px] uppercase tracking-[0.2em] sm:gap-8 sm:text-xs">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`text-muted transition-colors hover:text-foreground ${focusRing}`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className={`${gutter} pt-20 pb-16 sm:pt-32 sm:pb-24`}
    >
      <p className={label}>
        <span
          aria-hidden
          className="mr-2 inline-block size-1.5 bg-accent align-middle"
        />
        Senior Software Engineer · {site.location}
      </p>
      <h1
        id="hero-title"
        className="mt-6 font-display text-[clamp(4.5rem,17vw,13rem)] leading-[0.85] uppercase"
      >
        {site.name}
        <span
          aria-hidden
          className="caret ml-[0.05em] inline-block h-[0.72em] w-[0.12em] bg-accent"
        />
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
        {site.headline}
      </p>
      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
        <li>
          <a href={`mailto:${site.email}`} className={textLink}>
            {site.email}
          </a>
        </li>
        <li>
          <a href={site.linkedin} className={textLink}>
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
}

function Marquee() {
  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0">
      {marqueeItems.map((item) => (
        <li key={item} className="px-4">
          {item} <span className="pl-4">/</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-accent py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-black">
      <h2 className="sr-only">Core stack</h2>
      <div className="marquee flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

function Proof() {
  return (
    <section aria-labelledby="proof-title" className="border-b border-line">
      <h2 id="proof-title" className="sr-only">
        Proof
      </h2>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line md:grid-cols-4">
        {proof.map((item) => (
          <li
            key={item.value}
            className="bg-background px-4 py-8 sm:px-8 sm:py-12"
          >
            <p className="font-display text-6xl leading-none uppercase sm:text-7xl">
              {item.value}
            </p>
            <p className="mt-4 text-sm text-foreground">{item.label}</p>
            <p className={`mt-2 ${label}`}>{item.source}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionHeading({
  id,
  index,
  title,
}: {
  id: string;
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-line pb-4">
      <span className={label}>{index}</span>
      <h2 id={id} className="font-display text-4xl uppercase sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className={`${gutter} scroll-mt-14 py-20 sm:py-28`}
    >
      <SectionHeading id="skills-title" index="01" title="Skills" />
      <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8">
        {skillTiers.map((tier) => (
          <div key={tier} data-tier={tier}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              [{tier}]
            </h3>
            <p className="mt-2 text-sm text-muted">{tierBlurbs[tier]}</p>
            <ul className="mt-6 space-y-2">
              {skills
                .filter((skill) => skill.tier === tier)
                .map((skill) => (
                  <li
                    key={skill.name}
                    className={
                      tier === "learning" ? "text-muted" : "text-foreground"
                    }
                  >
                    <span aria-hidden className="mr-3 text-line">
                      –
                    </span>
                    {skill.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={`${gutter} scroll-mt-14 pb-20 sm:pb-28`}
    >
      <SectionHeading id="experience-title" index="02" title="Experience" />
      <ol>
        {roles.map((role) => (
          <li
            key={role.company}
            className="grid gap-6 border-b border-line py-10 md:grid-cols-[1fr_2fr] md:gap-12"
          >
            <div>
              <h3 className="font-display text-4xl leading-none uppercase">
                {role.company}
              </h3>
              <p className="mt-3 text-sm">{role.title}</p>
              <p className={`mt-3 ${label}`}>
                {formatPeriod(role.start, role.end)}
              </p>
              <p className={`mt-1 ${label}`}>{role.location}</p>
            </div>
            <ul className="space-y-4 text-sm leading-relaxed text-muted">
              {role.highlights.map((highlight) => {
                const { lead, body } = splitHighlight(highlight);
                return (
                  <li key={highlight}>
                    {lead && <span className="text-foreground">{lead}. </span>}
                    {body}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={`${gutter} scroll-mt-14 pb-24 sm:pb-32`}
    >
      <p className={label}>03 / Contact</p>
      <h2
        id="contact-title"
        className="mt-6 font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] uppercase"
      >
        Let’s build something.
      </h2>
      <ul className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4">
        <li>
          <a
            href={`mailto:${site.email}`}
            className={`font-mono text-xl sm:text-3xl ${textLink}`}
          >
            {site.email}
          </a>
        </li>
        <li>
          <a href={site.linkedin} className={`font-mono text-sm ${textLink}`}>
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={`${gutter} flex flex-wrap justify-between gap-4 py-6 ${label}`}
      >
        <p>{site.name}</p>
        <a
          href={repoUrl}
          className={`transition-colors hover:text-foreground ${focusRing}`}
        >
          Code on GitHub
        </a>
      </div>
    </footer>
  );
}
