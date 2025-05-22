import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, onUpdateBlog }) => {
	const [showDetails, setShowDetails] = useState(false);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleUpdateLike = async () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1
		};

		await onUpdateBlog(updatedBlog);
	};

	return (
		<div style={blogStyle}>
			{blog.title}{" "}
			<button onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? "hide" : "show"}
			</button>
			<div style={{ display: showDetails ? "" : "none" }}>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}{" "}
					<button onClick={handleUpdateLike}>
						like
					</button>
				</div>
				<div>{blog.author}</div>
			</div>
		</div>
	);
};

export default Blog;
