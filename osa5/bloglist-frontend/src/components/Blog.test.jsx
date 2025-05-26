import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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

test("should render blog's url and likes after clicked the 'show' button ", () => {});
