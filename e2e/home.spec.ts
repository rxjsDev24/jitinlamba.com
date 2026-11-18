import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("introduces Jitin and offers a way to reach him", async ({ page }) => {
  await expect(
    page.getByRole("heading", { level: 1, name: "Jitin Lamba" }),
  ).toBeVisible();
  const email = page
    .getByRole("main")
    .getByRole("link", { name: "hello@jitinlamba.com" })
    .first();
  await expect(email).toHaveAttribute("href", "mailto:hello@jitinlamba.com");
});

test("header links land on their sections", async ({ page }) => {
  for (const name of ["Skills", "Experience", "Contact"]) {
    await page
      .getByRole("navigation", { name: "Sections" })
      .getByRole("link", { name })
      .click();
    await expect(page.locator(`#${name.toLowerCase()} h2`)).toBeInViewport();
  }
});

test("learning skills are never listed as production or shipped", async ({
  page,
}) => {
  const learning = page.locator('[data-tier="learning"]');
  const experienced = page.locator(
    '[data-tier="production"], [data-tier="shipped"]',
  );
  await expect(learning.getByText("Kubernetes")).toBeVisible();
  await expect(experienced.getByText("Kubernetes")).toHaveCount(0);
});

test("lists every role", async ({ page }) => {
  for (const company of ["Sprinklr", "Spinny", "Phenom People"]) {
    await expect(
      page.getByRole("heading", { level: 3, name: company }),
    ).toBeVisible();
  }
});

test("contact headline assembles into readable letters once in view", async ({
  page,
}) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const letters = page.locator("#contact-title .split-letter");
  await expect(letters).toHaveCount(20);
  await expect
    .poll(() =>
      letters.evaluateAll((els) =>
        els.every((el) => {
          const style = getComputedStyle(el);
          return (
            style.opacity === "1" && new DOMMatrix(style.transform).isIdentity
          );
        }),
      ),
    )
    .toBe(true);
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing animates", async ({ page }) => {
    const running = await page.evaluate(() => document.getAnimations().length);
    expect(running).toBe(0);
  });
});

test("has no detectable accessibility violations", async ({ page }) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
