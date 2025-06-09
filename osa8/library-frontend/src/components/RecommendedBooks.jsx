import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const RecommendedBooks = ({ books }) => {
	const [favoriteBooks, setFavoriteBooks] = useState([]);
	const currentUser = useQuery(CURRENT_USER);

	const favoriteGenre = currentUser.data.me?.favoriteGenre || "";

	useEffect(() => {
		if (favoriteGenre) {
			const filteredBooks = books.filter((b) =>
				b.genres.includes(favoriteGenre)
			);
			setFavoriteBooks(filteredBooks);
		}
	}, []);

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre <strong>{favoriteGenre}</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{favoriteBooks.map((b) => (
						<tr key={b.id}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RecommendedBooks;
