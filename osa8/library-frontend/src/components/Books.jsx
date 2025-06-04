/* eslint-disable react/prop-types */
const Books = ({ books: propBooks }) => {
	const books = propBooks.allBooks;

	return (
		<div>
			<h2>books</h2>

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
							<td>{b.author}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
