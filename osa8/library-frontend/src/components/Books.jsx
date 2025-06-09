import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Books = ({ books: propBooks }) => {
	const books = propBooks;
	const [filteredBooks, setFilteredBooks] = useState(books);

	const [genre, setGenre] = useState("");
	const [genreOptions, setGenreOptions] = useState([]);

	const handleOnChangeGenre = (genre) => {
		setGenre(genre);

		if (genre === "all") {
			setGenre("");
			setFilteredBooks(books);
			return;
		}

		const filtered = books.filter((b) => b.genres.includes(genre));
		setFilteredBooks(filtered);
	};

	useEffect(() => {
		const genres = [...new Set(books.map((b) => b.genres).flat())];
		setGenreOptions(genres);
	}, []);

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
					{filteredBooks.map((b) => (
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
