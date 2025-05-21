import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await blogService.getAll();
			setBlogs(blogs);
		};
		fetchBlogs();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await loginService.login({
				username,
				password,
			});

			if (!response.token) throw new Error("wrong username or password");

			setUser(response);
		} catch (error) {
			console.error(error);
		} finally {
			setUsername("");
			setPassword("");
		}
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

	const blogForm = () => {
		return <></>;
	};

	return (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>
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
