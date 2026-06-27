import { expect, test, type Locator } from "@playwright/test";

async function hasVisibleVideoFrame(canvasLocator: Locator): Promise<boolean> {
  return canvasLocator.evaluate((canvas) => {
    const studioCanvas = canvas as HTMLCanvasElement;
    const probeCanvas = document.createElement("canvas");
    probeCanvas.width = studioCanvas.width;
    probeCanvas.height = studioCanvas.height;
    const context = probeCanvas.getContext("2d", { willReadFrequently: true });

    if (!context || studioCanvas.width === 0 || studioCanvas.height === 0) {
      return false;
    }

    context.drawImage(studioCanvas, 0, 0);

    return [
      [0.5, 0.4],
      [0.5, 0.48],
      [0.48, 0.46],
      [0.52, 0.46]
    ].some(([xRatio, yRatio]) => {
      const x = Math.floor(studioCanvas.width * xRatio);
      const y = Math.floor(studioCanvas.height * yRatio);
      const [red, green, blue, alpha] = context.getImageData(x, y, 1, 1).data;

      return alpha > 0 && red > 140 && red > green * 1.4 && red > blue * 1.4;
    });
  });
}

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
  await expect(page.getByRole("heading", { name: "Status" })).toBeVisible();
  await expect(page.getByTestId("diagnostics-message")).toContainText("Starter studio active.");
  await expect(page.locator("body")).not.toContainText("Development Starter Set");
  await expect(page.locator("body")).not.toContainText(
    "Using development procedural starter set because studio.glb is not present."
  );
  await expect(page.locator("body")).not.toContainText("degraded");
  await expect(page.locator("body")).not.toContainText("Preview Mode");
  await expect(page.locator("body")).not.toContainText("Procedural");
  await expect(page.locator("body")).not.toContainText("Fallback");
  await expect(page.locator("body")).not.toContainText("Sample Video Missing");
  await expect
    .poll(async () => hasVisibleVideoFrame(page.getByTestId("studio-canvas")), {
      timeout: 10_000
    })
    .toBe(true);

  await page.screenshot({ path: testInfo.outputPath("studio-screen.png"), fullPage: true });
});
