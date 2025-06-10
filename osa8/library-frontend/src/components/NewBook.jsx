import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, GET_ALL_BOOKS } from "../queries";
// import { useNavigate } from "react-router-dom";
import { updateCache } from "../App";

const NewBook = () => {
	const [newBookFields, setNewBookFields] = useState({
		title: "",
		author: "",
		published: "",
		genre: "",
	});
	const [genres, setGenres] = useState([]);

	// const navigate = useNavigate();

	const [createBook] = useMutation(ADD_BOOK, {
		update: (cache, response) => {
			updateCache(cache, { query: GET_ALL_BOOKS }, response.data.addBook);
		},
	});

	const handleOnChange = (e) => {
		setNewBookFields({ ...newBookFields, [e.target.name]: e.target.value });
		console.log(newBookFields);
	};

	const submit = async (e) => {
		e.preventDefault();

		const dataToSubmit = {
			...newBookFields,
			genres,
			published: parseInt(newBookFields.published),
		};
		console.log("add book...", dataToSubmit);

		createBook({ variables: dataToSubmit });
		setNewBookFields({ title: "", author: "", published: "", genre: "" });
		// navigate("/books");
	};

	const addGenre = () => {
		if (!newBookFields.genre) return;
		setGenres(genres.concat(newBookFields.genre));
		setNewBookFields({ ...newBookFields, genre: "" });
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						name="title"
						value={newBookFields.title}
						onChange={handleOnChange}
					/>
				</div>
				<div>
					author
					<input
						name="author"
						value={newBookFields.author}
						onChange={handleOnChange}
					/>
				</div>
				<div>
					published
					<input
						name="published"
						type="number"
						value={newBookFields.published}
						onChange={handleOnChange}
					/>
				</div>
				<div>
					<input
						name="genre"
						value={newBookFields.genre}
						onChange={handleOnChange}
					/>
					<button
						onClick={addGenre}
						type="button"
					>
						add genre
					</button>
				</div>
				<div>genres: {genres.join(", ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
