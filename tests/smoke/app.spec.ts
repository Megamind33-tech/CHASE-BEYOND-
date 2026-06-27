import { expect, test } from "@playwright/test";

test("opens the studio runtime with diagnostics and procedural fallback", async ({
  page
}, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start studio session" }).click();

  await expect(page.getByTestId("studio-screen")).toBeVisible();
  await expect(page.getByTestId("studio-canvas")).toBeVisible();
  await expect(page.getByTestId("studio-preview")).toBeVisible();
  await expect(page.getByTestId("bottom-status")).toBeVisible();
  await expect(page.getByTestId("source-manager")).toBeVisible();
  await expect(page.getByTestId("set-selector")).toBeVisible();
  await expect(page.getByTestId("diagnostics-panel")).toBeVisible();
  await expect(page.getByTestId("active-set")).toHaveText("Starter Studio");
  await expect(page.getByTestId("active-source")).toHaveText("Sample Video");
  await expect(page.getByTestId("runtime-status")).toContainText("Preview");
  await expect(page.locator("body")).toContainText("Output: Studio Preview");
  await expect(page.locator("body")).toContainText("OBS: Not Checked");
  await expect(page.locator("body")).toContainText("Source: Sample Video");
  await expect(page.locator("body")).toContainText("Screen_Main");
  await expect(page.getByTestId("video-texture-status")).toHaveText("Attached");
  await expect(page.getByTestId("render-loop-count")).toHaveText("1");
  await expect(page.getByRole("heading", { name: "Status" })).toBeVisible();
  await expect(page.getByTestId("diagnostics-message")).toContainText("Starter studio active.");
  await expect(page.locator("body")).not.toContainText("Program Output");
  await expect(page.locator("body")).not.toContainText("Development Starter Set");
  await expect(page.locator("body")).not.toContainText(
    "Using development procedural starter set because studio.glb is not present."
  );
  await expect(page.locator("body")).not.toContainText("degraded");
  await expect(page.locator("body")).not.toContainText("Preview Mode");
  await expect(page.locator("body")).not.toContainText("Procedural");
  await expect(page.locator("body")).not.toContainText("Fallback");
  await expect(page.locator("body")).not.toContainText("Sample Video Missing");
  await page.screenshot({ path: testInfo.outputPath("studio-screen.png"), fullPage: true });
});
