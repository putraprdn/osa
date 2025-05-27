import { expect, test, describe, beforeEach } from "@playwright/test";
import { createBlog, loginWith } from "./helper";

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

			await createBlog(page, "Test Playwright 2");
			await createBlog(page, "Test Playwright 3");
		});

		test("a new blog can be created", async ({ page }) => {
			await createBlog(page, "Test using Playwright");

			await expect(
				page.getByText(
					"a new blog Test using Playwright by Playwright added"
				)
			).toBeVisible();

			await expect(
				page
					.locator(".blog")
					.filter({ hasText: "Test using Playwright" })
			).toBeVisible();
		});

		test("user can like a blog", async ({ page }) => {
			const showBtn = await page.getByRole("button", { name: "show" });

			await expect(showBtn.first()).toBeVisible();
			await showBtn.first().click();

			const likeBtn = await page.getByRole("button", { name: "like" });
			await expect(likeBtn.first()).toBeVisible();
			await likeBtn.first().click();

			const successDiv = await page.locator(".success");
			await expect(successDiv).toBeVisible();
			await expect(successDiv).toContainText("updated");
		});

		test("user can remove their blog", async ({ page }) => {
			await createBlog(page, "To be Removed");

			const blog = page
				.locator(".blog")
				.filter({ hasText: "To be Removed" });

			await blog.getByRole("button", { name: "show" }).click();

			await expect(
				blog.getByRole("button", { name: "remove" })
			).toBeVisible();

			await page.on("dialog", (dialog) => dialog.accept());

			await blog.getByRole("button", { name: "remove" }).click();

			await expect(blog.getByText("To be Removed")).not.toBeVisible();
		});

		test("user can't remove other user's blog", async ({
			page,
			request,
		}) => {
			// Logout
			await page.getByTestId("logout").click();

			const newUser = {
				name: "Other User",
				username: "test2",
				password: "secret",
			};

			// Create new user
			await request.post("/api/users", {
				data: newUser,
			});

			// Login as new user
			await loginWith(page, newUser.username, newUser.password);
			await expect(
				page.getByText(`${newUser.name} logged in`)
			).toBeVisible();

			const showBtns = await page
				.getByRole("button", { name: "show" })
				.first();
			await showBtns.click();

			await expect(
				page.getByRole("button", { name: "remove" })
			).not.toBeVisible();
		});

		test("user can see the blogs sorted by the most likes first", async ({
			page,
		}) => {
			await createBlog(page, "should be at top");

			const blog = await page
				.locator(".blog")
				.filter({ hasText: "should be at top" });
			await expect(blog).toBeVisible();

			await blog.getByRole("button", { name: "show" }).click();

			const likeBtn = await blog.getByRole("button", { name: "like" });
			await expect(likeBtn).toBeVisible();

			await likeBtn.click();
			await likeBtn.click();
			await likeBtn.click(); // Like it three times

			const successDiv = await page.locator(".success");
			await expect(successDiv).toBeVisible();
			await expect(successDiv).toContainText("updated");

			await page.reload();

			const blogs = await page.locator(".blog");
			const firstBlog = await blogs.first();

			const firstBlogText = await firstBlog.textContent();
			expect(firstBlogText).toContain("should be at top");
		});
	});
});
