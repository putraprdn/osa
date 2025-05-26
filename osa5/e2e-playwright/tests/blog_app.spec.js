import { expect, test, describe, beforeEach } from "@playwright/test";

describe("Blog app", () => {
	beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("Login form is shown", async ({ page }) => {
		const locator = await page.getByText("log in to application");
		await expect(locator).toBeVisible();
	});
});
