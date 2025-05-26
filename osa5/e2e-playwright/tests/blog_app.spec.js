import { expect, test, describe, beforeEach } from "@playwright/test";
import { loginWith } from "./helper";

describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		await request.post("/api/testing/reset");
		await request.post("/api/users", {
			data: {
				name: "Playwright",
				username: "test",
				password: "secret",
			},
		});

		await page.goto("/");
	});

	test("Login form is shown", async ({ page }) => {
		const locator = await page.getByText("log in to application");
		await expect(locator).toBeVisible();
	});

	describe("Login", () => {
		test("succeeds with correct credentials", async ({ page }) => {
			await page.getByTestId("username").fill("test");
			await page.getByTestId("password").fill("secret");
			await page.getByRole("button", { name: "login" }).click();

			const locator = await page.getByText("Playwright logged in");
			await expect(locator).toBeVisible();
		});

		test("fails with wrong credentials", async ({ page }) => {
			await page.getByTestId("username").fill("wrong");
			await page.getByTestId("password").fill("wrong");
			await page.getByRole("button", { name: "login" }).click();

			const errorDiv = await page.locator(".error");
			await expect(errorDiv).toContainText(
				"invalid username or password"
			);
		});
	});

	describe("When logged in", () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, "test", "secret");
		});

		test("a new blog can be created", async ({ page }) => {
			await page.getByRole("button", { name: "new note" }).click();
			await page.getByTestId("title").fill("Test using Playwright");
			await page.getByTestId("author").fill("Playwright");
			await page.getByTestId("url").fill("https://google.com");
			await page.getByRole("button", { name: "create" }).click();

			await expect(
				page.getByText(
					"a new blog Test using Playwright by Playwright added"
				)
			).toBeVisible();
		});
	});
});
