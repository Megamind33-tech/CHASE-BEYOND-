import { expect, test } from "@playwright/test";

test("opens the studio runtime with diagnostics and procedural fallback", async ({
  page
}, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start studio session" }).click();

  await expect(page.getByTestId("studio-screen")).toBeVisible();
  await expect(page.getByTestId("studio-canvas")).toBeVisible();
  await expect(page.getByTestId("source-manager")).toBeVisible();
  await expect(page.getByTestId("set-selector")).toBeVisible();
  await expect(page.getByTestId("diagnostics-panel")).toBeVisible();
  await expect(page.getByTestId("active-set")).toHaveText("Starter Studio");
  await expect(page.getByTestId("active-source")).toHaveText("No Source");
  await expect(page.getByTestId("runtime-status")).toHaveText("Preview Mode");
  await expect(page.getByRole("heading", { name: "Status" })).toBeVisible();
  await expect(page.getByTestId("diagnostics-message")).toContainText(
    "Starter set running in preview mode."
  );
  await expect(page.locator("body")).not.toContainText("Development Starter Set");
  await expect(page.locator("body")).not.toContainText(
    "Using development procedural starter set because studio.glb is not present."
  );
  await expect(page.locator("body")).not.toContainText("degraded");

  await page.screenshot({ path: testInfo.outputPath("studio-screen.png"), fullPage: true });
});
