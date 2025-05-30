import { useState } from "react";

const Blog = ({ blog, onUpdateBlog = () => {}, onRemoveBlog = () => {} }) => {
	const [showDetails, setShowDetails] = useState(false);

	const userData = JSON.parse(window.localStorage.getItem("loggedUser"));

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
		<div
			style={blogStyle}
			className="blog"
		>
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
					<button
						onClick={handleUpdateLike}
						className="btn-like"
					>
						like
					</button>
				</div>
				<div>{blog.author}</div>
				{blog.user?.username === userData?.username && (
					<button
						className="btn-remove"
						onClick={handleRemoveBlog}
						style={{ backgroundColor: "lightblue" }}
					>
						remove
					</button>
				)}
			</div>
		</div>
	);
};

export default Blog;
