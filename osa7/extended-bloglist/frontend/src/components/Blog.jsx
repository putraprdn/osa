import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import { useSelector } from "react-redux";

const Blog = ({ blog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const currentBlogs = useSelector(({ blogs }) => blogs);

	const dispatch = useDispatch();

	const userData = useSelector(({ user }) => user);

	const blogStyle = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleVote = async (blogToUpdate) => {
		try {
			const updateField = {
				...blogToUpdate,
				likes: blogToUpdate.likes + 1,
			};

			const updatedBlog = await blogService.updateBlog(
				blogToUpdate.id,
				updateField
			);

			const newBlogs = currentBlogs.map((b) => {
				return b.id === updatedBlog.id ? updatedBlog : b;
			});

			dispatch(setBlogs(newBlogs));

			dispatch(
				showNotification(
					"success",
					`blog '${updatedBlog.title}' updated`
				)
			);
		} catch (error) {
			console.error(error);
			dispatch(showNotification("error", error?.response?.data?.error));
		}
	};

	const handleRemove = async (id) => {
		try {
			await blogService.removeBlog(id);

			const newBlogs = currentBlogs.filter((b) => {
				return b.id !== id;
			});
			dispatch(setBlogs(newBlogs));
			dispatch(showNotification("success", "blog removed"));
		} catch (error) {
			console.error(error);
			dispatch(showNotification("error", error?.response?.data?.error));
		}
	};

	// const handleRemoveBlog = async (blogData) => {
	// 	try {
	// 		const confirm = window.confirm(
	// 			`Remove blog ${blogData.title} by ${blogData.author}`
	// 		);

	// 		if (!confirm) return;

	// 		await blogService.removeBlog(blogData.id);

	// 		setBlogs((prevBlogs) =>
	// 			prevBlogs.filter((blog) => blog.id !== blogData.id)
	// 		);

	// 		handleShowNotification(
	// 			"success",
	// 			`Blog ${blogData.title} by ${blogData.author} removed`
	// 		);
	// 	} catch (error) {
	// 		console.log(error.response);
	// 		handleShowNotification("error", error.response.data.error);
	// 	}
	// };

	// const handleUpdateLike = async () => {
	// 	const updatedBlog = {
	// 		...blog,
	// 		likes: blog.likes + 1,
	// 	};

	// 	await onUpdateBlog(updatedBlog);
	// };

	// const handleRemoveBlog = async () => {
	// 	await onRemoveBlog(blog);
	// };

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
						onClick={() => handleVote(blog)}
						className="btn-like"
					>
						like
					</button>
				</div>
				<div>{blog.author}</div>

				{blog.user?.username === userData?.username && (
					<button
						className="btn-remove"
						onClick={() => handleRemove(blog.id)}
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
