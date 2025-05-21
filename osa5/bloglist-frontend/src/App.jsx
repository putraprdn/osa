import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await blogService.getAll();
			setBlogs(blogs);
		};
		fetchBlogs();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON) {
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

			if (!response.token) throw new Error("wrong username or password");

			blogService.setToken(response.token);
			setUser(response);
			window.localStorage.setItem("loggedUser", JSON.stringify(response));
		} catch (error) {
			console.error(error);
		} finally {
			setUsername("");
			setPassword("");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser({});
	};

	if (!user.token) {
		return (
			<>
				<h2>log in to application</h2>
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

	const handleBlogDataChange = (e) => {
		console.log(e.target.name, e.target.value);
		setBlogData({ ...blogData, [e.target.name]: e.target.value });
	};

	const handleCreateBlog = async (e) => {
		e.preventDefault();
		try {
			console.log(blogData);
			const newBlog = await blogService.createBlog(blogData);
			setBlogs(blogs.concat(newBlog));
		} catch (error) {
			console.error(error);
		} finally {
			setBlogData({
				title: "",
				author: "",
				url: "",
			});
		}
	};

	return (
		<div>
			<h2>blogs</h2>
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
