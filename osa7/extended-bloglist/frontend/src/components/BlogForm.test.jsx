import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
	test("should call the right handler and return the new blog", async () => {
		const handleCreateBlog = vi.fn();
		const user = userEvent.setup();

		const { container } = render(
			<BlogForm onCreateBlog={handleCreateBlog} />
		);

		const titleInput = container.querySelector("input[name='title']");
		await user.type(titleInput, "Mock input value");

		const authorInput = container.querySelector("input[name='author']");
		await user.type(authorInput, "Mock author input");

		const urlInput = container.querySelector("input[name='url']");
		await user.type(urlInput, "https://google.com");

		const submitButton = screen.getByText("create");
		await userEvent.click(submitButton);

		expect(handleCreateBlog.mock.calls).toHaveLength(1);
		expect(handleCreateBlog.mock.calls[0][0].title).toBe(
			"Mock input value"
		);
	});
});
