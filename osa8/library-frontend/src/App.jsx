import { Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from "./queries";

const App = () => {
	const authorQuery = useQuery(GET_ALL_AUTHORS);
	const bookQuery = useQuery(GET_ALL_BOOKS);

	if (authorQuery.loading || bookQuery.loading) {
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

			<Routes>
				<Route
					path="/"
					element={<Authors authors={authorQuery.data} />}
				/>
				<Route
					path="/books"
					element={<Books books={bookQuery.data} />}
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
