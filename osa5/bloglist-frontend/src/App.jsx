import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState({});
	const [blogData, setBlogData] = useState({
		title: "",
		author: "",
		url: "",
	});
	const [notification, setNotification] = useState({
		type: "",
		msg: "",
	});

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await blogService.getAll();
			setBlogs(blogs);
		};
		fetchBlogs();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON && loggedUserJSON !== "undefined") {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await loginService.login({
				username,
				password,
			});

			blogService.setToken(response.token);
			setUser(response);
			window.localStorage.setItem(
				"loggedUser",
				JSON.stringify(response.data)
			);
		} catch (error) {
			console.error(error.response);
			handleShowNotification("error", error.response.data.error);
		} finally {
			setUsername("");
			setPassword("");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser({});
	};

	const handleBlogDataChange = (e) => {
		console.log(e.target.name, e.target.value);
		setBlogData({ ...blogData, [e.target.name]: e.target.value });
	};

	const handleCreateBlog = async (e) => {
		e.preventDefault();
		try {
			const newBlog = await blogService.createBlog(blogData);
			setBlogs(blogs.concat(newBlog));
			handleShowNotification(
				"success",
				`a new blog ${newBlog.title} by ${newBlog.author} added`
			);
		} catch (error) {
			console.error(error.response);
			handleShowNotification("error", error.response.data.error);
		} finally {
			setBlogData({
				title: "",
				author: "",
				url: "",
			});
		}
	};

	const handleShowNotification = (type, msg) => {
		console.log(type, msg);
		setNotification({ type, msg });
		setTimeout(() => {
			setNotification({ type: "", msg: "" });
		}, 5000);
	};

	if (!user.token) {
		return (
			<>
				<h2>log in to application</h2>

				<Notification
					type={notification.type}
					msg={notification.msg}
				/>

				<form onSubmit={handleLogin}>
					<div>
						username{" "}
						<input
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							value={username}
							type="text"
							name="username"
						/>
					</div>
					<div>
						password{" "}
						<input
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
							type="text"
							name="password"
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</>
		);
	}

	return (
		<div>
			<h2>blogs</h2>

			<Notification
				type={notification.type}
				msg={notification.msg}
			/>

			<p>
				{user.name} logged in{" "}
				<button onClick={handleLogout}>logout</button>
			</p>

			<h3>create new</h3>
			<form onSubmit={handleCreateBlog}>
				<div>
					title:
					<input
						value={blogData.title}
						onChange={handleBlogDataChange}
						type="text"
						name="title"
					/>
				</div>
				<div>
					author:
					<input
						value={blogData.author}
						onChange={handleBlogDataChange}
						type="text"
						name="author"
					/>
				</div>
				<div>
					url:
					<input
						value={blogData.url}
						onChange={handleBlogDataChange}
						type="text"
						name="url"
					/>
				</div>
				<button type="submit">create</button>
			</form>

			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
				/>
			))}
		</div>
	);
};

export default App;
