import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onUpdateBlog, onRemoveBlog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleUpdateLike = async () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		await onUpdateBlog(updatedBlog);
	};

	const handleRemoveBlog = async () => {
		await onRemoveBlog(blog);
	};

	return (
		<div style={blogStyle}>
			{blog.title}{" "}
			<button onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? "hide" : "show"}
			</button>
			<div style={{ display: showDetails ? "" : "none" }}>
				<div>
					<a href={blog.url}>{blog.url}</a>
				</div>
				<div>
					likes {blog.likes}{" "}
					<button onClick={handleUpdateLike}>like</button>
				</div>
				<div>{blog.author}</div>
				<button
					onClick={handleRemoveBlog}
					style={{ backgroundColor: "lightblue" }}
				>
					remove
				</button>
			</div>
		</div>
	);
};

export default Blog;
