import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setBlogs } from "./reducers/blogReducer";
import { showNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";
import Notification from "./components/Notification";
import Toggleable from "./components/Toogleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
	const dispatch = useDispatch();

	const [userList, setUserList] = useState([]);

	const user = useSelector(({ user }) => user);
	const blogs = useSelector(({ blogs }) => blogs);

	useEffect(() => {
		const fetchBlogs = async () => {
			const fetchedBlogs = await blogService.getAll();

			// Sort only during initial fetch
			const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
			dispatch(setBlogs(sortedBlogs));
		};

		const fetchUser = () => {
			const getUser = user?.username
				? user
				: JSON.parse(window.localStorage.getItem("user"));

			dispatch(setUser(getUser));
		};

		fetchBlogs();
		fetchUser();
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await userService.getAll();
			const sortedUsers = users.sort(
				(a, b) => b.blogs.length - a.blogs.length
			);
			setUserList(sortedUsers);
		};

		fetchUsers();
	}, [blogs]);

	const blogFormRef = useRef();

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
		<div className="container">
			<Navbar />
			<Notification />

			{!user.token ? (
				<>
					<h2>log in to application</h2>
					<LoginForm />
				</>
			) : (
				<>
					<h2>blogs</h2>

					<Routes>
						<Route
							path="/"
							element={
								<div style={{ marginTop: "20px" }}>
									<Toggleable
										ref={blogFormRef}
										buttonLabel="new blog"
									>
										<BlogForm
											onCreateBlog={handleCreateBlog}
										/>
									</Toggleable>

									<BlogList blogs={blogs} />
								</div>
							}
						/>
						<Route
							path="/users"
							element={<UserList users={userList} />}
						/>
						<Route
							path="/users/:id"
							element={<User users={userList} />}
						/>
						<Route
							path="/blogs/:id"
							element={<Blog blogs={blogs} />}
						/>
					</Routes>
				</>
			)}
		</div>
	);
};

export default App;
