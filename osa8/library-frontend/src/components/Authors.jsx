import { useMutation } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { GET_ALL_AUTHORS, UPDATE_AUTHOR_BORN } from "../queries";

/* eslint-disable react/prop-types */
const Authors = ({ authors: propAuthors }) => {
	const [born, setBorn] = useState("");
	const [selectedOption, setSelectedOption] = useState(null);

	const [updateAuthor] = useMutation(UPDATE_AUTHOR_BORN, {
		refetchQueries: [{ query: GET_ALL_AUTHORS }],
	});

	const authors = useMemo(() => propAuthors.allAuthors || [], [propAuthors]);

	const [options, setOptions] = useState([]);

	useEffect(() => {
		const populate = () => {
			const populatedOptions = authors.map((a) => {
				return {
					value: a.name,
					label: a.name,
				};
			});

			console.log(populatedOptions);
			setOptions(populatedOptions);
		};

		populate();
	}, [authors]);

	const handleSubmit = (e) => {
		e.preventDefault();

		updateAuthor({
			variables: {
				name: selectedOption.value,
				born: parseInt(born),
			},
		});
		setBorn("");
		setSelectedOption(null);
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
					<Select
						value={selectedOption}
						options={options}
						onChange={setSelectedOption}
						name="born"
					/>
				</div>
				<div>
					born{" "}
					<input
						value={born}
						onChange={(e) => {
							setBorn(e.target.value);
						}}
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
