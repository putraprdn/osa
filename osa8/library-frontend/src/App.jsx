import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { CURRENT_USER, GET_ALL_AUTHORS, GET_ALL_BOOKS } from "./queries";
import LoginForm from "./components/LoginForm";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
	const client = useApolloClient();

	const navigate = useNavigate();

	const authorQuery = useQuery(GET_ALL_AUTHORS);
	const bookQuery = useQuery(GET_ALL_BOOKS);
	const userQuery = useQuery(CURRENT_USER);

	const [token, setToken] = useState("");

	useEffect(() => {
		const localToken = localStorage.getItem("user-token") || "";
		setToken(localToken);
		if (!localToken) navigate("/login");
	}, []);

	if (authorQuery.loading || bookQuery.loading) {
		return <div>loading...</div>;
	}

	const handleLogout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		navigate("/login");
	};

	return (
		<div>
			<div>
				<Link to={"/"}>
					<button>authors</button>
				</Link>
				<Link to={"/books"}>
					<button>books</button>
				</Link>
				{token && (
					<>
						<Link to={"/books/create"}>
							<button>add book</button>
						</Link>
						<Link to={"/books/recommend"}>
							<button>recommend</button>
						</Link>
						<button onClick={handleLogout}>logout</button>
					</>
				)}
				{!token && (
					<Link to={"/login"}>
						<button>login</button>
					</Link>
				)}
			</div>

			<Routes>
				<Route
					path="/"
					element={<Authors authors={authorQuery.data} />}
				/>
				<Route
					path="/books"
					element={<Books books={bookQuery.data.allBooks} />}
				/>
				<Route
					path="/books/recommend"
					element={
						userQuery.loading ? (
							<div>loading...</div>
						) : (
							<RecommendedBooks user={userQuery.data?.me} />
						)
					}
				/>
				<Route
					path="/books/create"
					element={<NewBook />}
				/>
				<Route
					path="/login"
					element={<LoginForm setToken={setToken} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
