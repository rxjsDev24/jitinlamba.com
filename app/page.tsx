import { site } from "@/content/data/site";

const linkClass =
  "underline decoration-accent underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-4 py-24">
      <p className="font-mono text-sm text-muted">jitinlamba.com</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {site.name}
        <span aria-hidden className="caret ml-1 text-accent">
          _
        </span>
      </h1>
      <p className="text-lg text-muted">{site.headline}</p>
      <p className="text-muted">
        The full site is being built. Check back soon.
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        <li>
          <a href={`mailto:${site.email}`} className={linkClass}>
            {site.email}
          </a>
        </li>
        <li>
          <a href={site.linkedin} className={linkClass}>
            LinkedIn
          </a>
        </li>
      </ul>
    </main>
  );
}
