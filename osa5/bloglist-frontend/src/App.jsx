import { useState, useEffect, useMemo } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toogleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState({});
	const [blogFormVisible, setBlogFormVisible] = useState(false);
	const [notification, setNotification] = useState({
		type: "",
		msg: "",
	});

	useEffect(() => {
		const fetchBlogs = async () => {
			const fetchedBlogs = await blogService.getAll();
			// Sort only during initial fetch
			const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
			setBlogs(sortedBlogs);
		};
		fetchBlogs();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON && loggedUserJSON !== "undefined") {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleShowNotification = (type, msg) => {
		setNotification({ type, msg });
		setTimeout(() => {
			setNotification({ type: "", msg: "" });
		}, 5000);
	};

	const handleLogin = async ({ username, password }) => {
		try {
			const response = await loginService.login({
				username,
				password,
			});

			blogService.setToken(response.token);
			setUser(response);
			window.localStorage.setItem("loggedUser", JSON.stringify(response));
		} catch (error) {
			console.error(error.response);
			handleShowNotification("error", error.response.data.error);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser({});
	};

	const handleCreateBlog = async (blogData) => {
		try {
			const newBlog = await blogService.createBlog(blogData);
			setBlogs(blogs.concat(newBlog));
			setBlogFormVisible(false);
			handleShowNotification(
				"success",
				`a new blog ${newBlog.title} by ${newBlog.author} added`
			);
		} catch (error) {
			console.error(error.response);
			handleShowNotification("error", error.response.data.error);
		}
	};

	const handleUpdateBlog = async (updatedBlog) => {
		try {
			const serverUpdatedBlog = await blogService.updateBlog(updatedBlog.id, updatedBlog);
			
			setBlogs(prevBlogs => 
				prevBlogs.map(blog => 
					blog.id === serverUpdatedBlog.id ? serverUpdatedBlog : blog
				)
			);

			handleShowNotification(
				"success",
				`blog ${serverUpdatedBlog.title} updated`
			);
		} catch (error) {
			console.error(error.response);
			handleShowNotification("error", error.response.data.error);
		}
	};

	// Use useMemo to memoize sorted blogs
	const sortedBlogs = useMemo(() => 
		[...blogs].sort((a, b) => b.likes - a.likes), 
		[blogs]
	);

	return (
		<div>
			<Notification
				type={notification.type}
				msg={notification.msg}
			/>

			{!user.token ? (
				<>
					<h2>log in to application</h2>
					<LoginForm onLogin={handleLogin} />
				</>
			) : (
				<>
					<h2>blogs</h2>

					<p>
						{user.name} logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</p>

					<Toggleable
						buttonLabel="new note"
						visible={blogFormVisible}
						onToggle={() => setBlogFormVisible(!blogFormVisible)}
					>
						<BlogForm onCreateBlog={handleCreateBlog} />
					</Toggleable>

					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							onUpdateBlog={handleUpdateBlog}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
