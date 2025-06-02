import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetUser } from "./reducers/userReducer";
import { setBlogs } from "./reducers/blogReducer";
import { showNotification } from "./reducers/notificationReducer";
import Notification from "./components/Notification";
import Toggleable from "./components/Toogleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector(({ user }) => user);
	const blogs = useSelector(({ blogs }) => blogs);

	useEffect(() => {
		const fetchBlogs = async () => {
			const fetchedBlogs = await blogService.getAll();

			// Sort only during initial fetch
			const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
			dispatch(setBlogs(sortedBlogs));
		};
		fetchBlogs();
	}, []);

	const blogFormRef = useRef();

	const handleLogout = () => {
		dispatch(resetUser());
	};

	const handleCreateBlog = async (blogData) => {
		try {
			const newBlog = await blogService.createBlog(blogData);

			dispatch(setBlogs(blogs.concat(newBlog)));

			blogFormRef.current.toggleVisibility();

			dispatch(
				showNotification(
					"success",
					`a new blog '${newBlog.title}' by ${newBlog.author} added`
				)
			);
			console.log("reached");
		} catch (error) {
			console.error(error.response);
			dispatch(showNotification("error", error.response.data.error));
		}
	};

	return (
		<div>
			<Notification />

			{!user.token ? (
				<>
					<h2>log in to application</h2>
					<LoginForm />
				</>
			) : (
				<>
					<h2>blogs</h2>

					<p>
						{user.name} logged in{" "}
						<button
							onClick={handleLogout}
							data-testid="logout"
						>
							logout
						</button>
					</p>

					<Toggleable
						ref={blogFormRef}
						buttonLabel="new blog"
					>
						<BlogForm onCreateBlog={handleCreateBlog} />
					</Toggleable>

					<BlogList blogs={blogs} />
				</>
			)}
		</div>
	);
};

export default App;
