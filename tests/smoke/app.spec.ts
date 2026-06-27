import { expect, test } from "@playwright/test";

test("opens the studio runtime with diagnostics and procedural fallback", async ({
  page
}, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start studio session" }).click();

  await expect(page.getByTestId("studio-screen")).toBeVisible();
  await expect(page.getByTestId("studio-canvas")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Runtime health" })).toBeVisible();
  await expect(page.getByTestId("procedural-fallback")).toHaveText("active");
  await expect(page.getByTestId("diagnostics-message")).toContainText(
    "Using development procedural starter set because studio.glb is not present."
  );

  await page.screenshot({ path: testInfo.outputPath("studio-screen.png"), fullPage: true });
});
