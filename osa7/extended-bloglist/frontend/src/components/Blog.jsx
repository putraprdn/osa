import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { setBlogs } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const Blog = ({ blogs }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const match = useMatch("/blogs/:id");
	const matchedBlog = blogs.find((b) => b.id === match.params.id);
	const userData = useSelector(({ user }) => user);

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

			const newBlogs = blogs.map((b) => {
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
			dispatch(
				showNotification("error", error?.response?.data?.error || error)
			);
		}
	};

	const handleRemove = async (id) => {
		try {
			await blogService.removeBlog(id);
			const newBlogs = blogs.filter((b) => b.id !== id);
			dispatch(setBlogs(newBlogs));
			dispatch(showNotification("success", "blog removed"));
			navigate("/");
		} catch (error) {
			console.error(error);
			dispatch(
				showNotification("error", error?.response?.data?.error || error)
			);
		}
	};

	return (
		<div className="container mt-4">
			<h2>{matchedBlog.title}</h2>
			<div>
				<a
					href={matchedBlog.url}
					className="text-primary"
				>
					{matchedBlog.url}
				</a>
			</div>
			<div className="my-3">
				likes {matchedBlog.likes}{" "}
				<button
					onClick={() => handleVote(matchedBlog)}
					className="btn btn-primary"
				>
					like
				</button>
			</div>
			<div>added by {matchedBlog.author}</div>

			{matchedBlog.user?.username === userData?.username && (
				<button
					className="btn btn-danger"
					onClick={() => handleRemove(matchedBlog.id)}
				>
					remove
				</button>
			)}
			</div>
		</div>
	);
};

export default Blog;
