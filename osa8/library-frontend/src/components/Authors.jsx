import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_AUTHORS, UPDATE_AUTHOR_BORN } from "../queries";

/* eslint-disable react/prop-types */
const Authors = ({ authors: propAuthors }) => {
	const [authorBornFields, setAuthorBornFields] = useState({
		name: "",
		born: "",
	});

	const [updateAuthor] = useMutation(UPDATE_AUTHOR_BORN, {
		refetchQueries: [{ query: GET_ALL_AUTHORS }],
	});

	const authors = propAuthors.allAuthors || [];

	const handleOnChange = (e) => {
		setAuthorBornFields({
			...authorBornFields,
			[e.target.name]: e.target.value,
		});
		console.log(authorBornFields);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		updateAuthor({
			variables: {
				...authorBornFields,
				born: parseInt(authorBornFields.born),
			},
		});
		setAuthorBornFields({ name: "", born: "" });
	};

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.id}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h3>Set birthyear</h3>
			<form onSubmit={handleSubmit}>
				<div>
					name{" "}
					<input
						value={authorBornFields.name}
						onChange={handleOnChange}
						type="text"
						name="name"
					/>
				</div>
				<div>
					born{" "}
					<input
						value={authorBornFields.born}
						onChange={handleOnChange}
						type="number"
						name="born"
					/>
				</div>
				<button>update author</button>
			</form>
		</div>
	);
};

export default Authors;
