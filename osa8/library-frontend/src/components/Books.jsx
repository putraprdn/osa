import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_BOOKS } from "../queries";

/* eslint-disable react/prop-types */
const Books = ({ books: booksProp }) => {
	const [genre, setGenre] = useState(null);
	const [books, setBooks] = useState(booksProp);
	const [genreOptions, setGenreOptions] = useState([]);

	const bookQuery = useQuery(GET_ALL_BOOKS, {
		variables: { genre },
		skip: !genre,
	});

	useEffect(() => {
		(() => {
			const genres = [...new Set(books.map((b) => b.genres).flat())];
			setGenreOptions(genres);
			console.log("rendered");
		})();
	}, [booksProp]);

	useEffect(() => {
		if (bookQuery.data && genre) {
			setBooks(bookQuery.data.allBooks);
		}
		console.log("fetched book");
	}, [bookQuery.data, genre]);

	if (bookQuery.loading) return <div>loading...</div>;

	const handleOnChangeGenre = async (genre) => {
		if (genre === "all") {
			setGenre("");
			setBooks(booksProp);
			return;
		}

		setGenre(genre);
	};

	return (
		<div>
			<h2>books</h2>
			{genre && (
				<p>
					in genre <strong>{genre}</strong>
				</p>
			)}
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => (
						<tr key={b.id}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{genreOptions.map((g) => (
					<button
						key={g}
						onClick={() => handleOnChangeGenre(g)}
					>
						{g}
					</button>
				))}
				<button onClick={() => handleOnChangeGenre("all")}>
					all genres
				</button>
			</div>
		</div>
	);
};

export default Books;
