import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../queries";

/* eslint-disable react/prop-types */
const RecommendedBooks = ({ user }) => {
	const favoriteGenre = user?.favoriteGenre;

	const { data, loading } = useQuery(GET_ALL_BOOKS);

	if (loading || !favoriteGenre) return <div>loading...</div>;

	const favoriteBooks = data.allBooks.filter((b) =>
		b.genres.includes(favoriteGenre)
	);

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
