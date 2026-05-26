import { test, expect } from "@playwright/test";

test.describe("YAML Formatter", () => {
  test("formats YAML and shows output", async ({ page }) => {
    await page.goto("/en/yaml-formatter");
    await expect(page.locator("h1")).toContainText("YAML Formatter");

    const textareas = page.locator("textarea");
    await textareas.first().fill("name: hello\nversion: 1.0");
    await page.waitForTimeout(300);

    await expect(textareas.last()).toContainText("name: hello");
  });

  test("shows error for invalid YAML", async ({ page }) => {
    await page.goto("/en/yaml-formatter");
    const textareas = page.locator("textarea");
    await textareas.first().fill(": invalid");
    await page.waitForTimeout(300);

    await expect(page.locator("text=syntax error")).toBeVisible();
  });

  test("switches to Chinese", async ({ page }) => {
    await page.goto("/en/yaml-formatter");
    await page.click("text=中文");
    await expect(page.locator("h1")).toContainText("格式化");
  });
});

test.describe("YAML to JSON", () => {
  test("converts YAML to JSON", async ({ page }) => {
    await page.goto("/en/yaml-to-json");
    await expect(page.locator("h1")).toContainText("YAML to JSON");

    const textareas = page.locator("textarea");
    await textareas.first().fill('name: hello\nversion: "1.0"');
    await page.waitForTimeout(300);

    await expect(textareas.last()).toContainText('"name"');
    await expect(textareas.last()).toContainText('"hello"');
  });
});

test.describe("YAML Query", () => {
  test("queries YAML with expression", async ({ page }) => {
    await page.goto("/en/yaml-query");
    await expect(page.locator("h1")).toContainText("YAML Query");

    const textareas = page.locator("textarea");
    await textareas.first().fill("services:\n  web:\n    image: nginx");
    await page.fill('input[type="text"]', ".services.web.image");
    await page.click("text=Run");

    await expect(page.locator("pre")).toContainText("nginx");
  });

  test("share button copies URL", async ({ page }) => {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/en/yaml-query");
    const textareas = page.locator("textarea");
    await textareas.first().fill("name: hello");
    await page.fill('input[type="text"]', ".");
    await page.click("text=Share");

    await expect(page.locator("text=Copied")).toBeVisible();
  });
});

test.describe("Homepage", () => {
  test("shows three tool cards", async ({ page }) => {
    await page.goto("/en");
    const links = page.locator("a[href*='yaml']");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
