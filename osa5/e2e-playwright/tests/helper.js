const loginWith = async (page, username, password) => {
	await page.getByTestId("username").fill(username);
	await page.getByTestId("password").fill(password);
	await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, content) => {
	await page.getByRole("button", { name: "new blog" }).click();
	await page.getByTestId("title").fill(content);
	await page.getByTestId("author").fill("Playwright");
	await page.getByTestId("url").fill("https://google.com");
	await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
