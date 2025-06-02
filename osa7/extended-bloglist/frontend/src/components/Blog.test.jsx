import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
	test("renders blog", () => {
		const blog = {
			title: "Test Blog",
			author: "Test Author",
			url: "https://google.com",
			likes: 10,
		};

		render(<Blog blog={blog} />);

		const blogTitle = screen.getByText(blog.title, {
			exact: false,
		});

		expect(blogTitle).toBeDefined();

		const blogAuthor = screen.getByText(blog.author, {
			exact: false,
		});

		expect(blogAuthor).toBeDefined();
	});

	test("should render blog's url and likes after clicked the 'show' button ", async () => {
		const blog = {
			title: "Test Blog 2",
			author: "Test Author 2",
			url: "https://google.com",
			likes: 10,
		};

		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector("div.blog div");
		expect(div).toHaveStyle("display: none");

		const user = userEvent.setup();
		const button = screen.getByText("show");
		await user.click(button);

		expect(div).not.toHaveStyle("display: none");

		const urlElement = screen.getByText(blog.url);
		expect(urlElement).toBeDefined();

		const likesElement = screen.getByText(`likes ${blog.likes}`, {
			exact: false,
		});
		expect(likesElement).toBeDefined();
	});

	test("should handle the like button clicked twice", async () => {
		const blog = {
			title: "Test Blog 2",
			author: "Test Author 2",
			url: "https://google.com",
			likes: 10,
		};

		const handleLikeButton = vi.fn();

		const { container } = render(
			<Blog
				blog={blog}
				onUpdateBlog={handleLikeButton}
			/>
		);

		const user = userEvent.setup();
		const likesButton = container.querySelector(".btn-like");
		await user.click(likesButton);
		await user.click(likesButton);

		expect(handleLikeButton.mock.calls).toHaveLength(2);
	});
});
