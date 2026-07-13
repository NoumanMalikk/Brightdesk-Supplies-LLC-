import { test, expect } from "@playwright/test";

test.describe("Brightdesk storefront", () => {
  test("homepage loads with brand and zones", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Build the room around what needs to happen there/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Five functional zones/i })).toBeVisible();
    await expect(page.getByText(/Demonstration catalog/i).first()).toBeVisible();
  });

  test("shop and product detail", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByRole("heading", { name: /Shop furniture/i })).toBeVisible();
    await page.goto("/products/windowline-writing-desk-42");
    await expect(page.getByRole("heading", { name: /Windowline Writing Desk/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /Windowline Writing Desk/i }).first()).toBeVisible();
  });

  test("zone navigation", async ({ page }) => {
    await page.goto("/zones/focus");
    await expect(page.getByRole("heading", { name: "Focus" })).toBeVisible();
  });

  test("workspace builder and compare empty states", async ({ page }) => {
    await page.goto("/workspace-builder");
    await expect(page.getByRole("heading", { name: /Workspace builder/i })).toBeVisible();
    await page.goto("/compare");
    await expect(page.getByText(/No products selected/i)).toBeVisible();
  });

  test("contact and quote pages", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
    await expect(page.getByText(/No store hours/i)).toBeVisible();
    await page.goto("/request-a-quote");
    await expect(page.getByRole("heading", { name: /Request a furniture quote/i })).toBeVisible();
  });

  test("legal placeholder pages", async ({ page }) => {
    await page.goto("/shipping-policy");
    await expect(page.getByText(/BUSINESS REVIEW REQUIRED/i).first()).toBeVisible();
  });

  test("404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page.getByRole("heading", { name: /Page not found/i })).toBeVisible();
  });

  test("mobile menu opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /Open menu/i }).click();
    await expect(page.getByRole("dialog", { name: /Mobile navigation/i })).toBeVisible();
  });
});
