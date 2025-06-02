import { useState } from "react";

const BlogForm = ({ onCreateBlog }) => {
	const [blogData, setBlogData] = useState({
		title: "",
		author: "",
		url: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onCreateBlog(blogData);
		setBlogData({
			title: "",
			author: "",
			url: "",
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBlogData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				title:
				<input
					value={blogData.title}
					onChange={handleChange}
					data-testid="title"
					type="text"
					name="title"
				/>
			</div>
			<div>
				author:
				<input
					value={blogData.author}
					onChange={handleChange}
					type="text"
					data-testid="author"
					name="author"
				/>
			</div>
			<div>
				url:
				<input
					value={blogData.url}
					onChange={handleChange}
					type="text"
					data-testid="url"
					name="url"
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default BlogForm;
