import { Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "./queries";

const App = () => {
	const result = useQuery(GET_ALL_AUTHORS);

	if (result.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<div>
				<Link to={"/"}>
					<button>authors</button>
				</Link>
				<Link to={"/books"}>
					<button>books</button>
				</Link>
				<Link to={"/books/create"}>
					<button>add book</button>
				</Link>
			</div>

			{/* <Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} /> */}

			<Routes>
				<Route
					path="/"
					element={<Authors authors={result.data} />}
				/>
				<Route
					path="/books"
					element={<Books />}
				/>
				<Route
					path="/books/create"
					element={<NewBook />}
				/>
			</Routes>
		</div>
	);
};

export default App;
