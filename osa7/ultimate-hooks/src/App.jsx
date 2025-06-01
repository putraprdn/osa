import { useState } from "react";
import axios from "axios";

const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const changeTo = (value) => {
		setValue(value);
	};

	return {
		type,
		value,
		onChange,
		changeTo,
	};
};

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([]);

	const create = async (resource) => {
		const response = await axios.post(baseUrl, resource);
		setResources([...resources, response.data]);
	};

	const service = {
		create,
	};

	return [resources, service];
};

const App = () => {
	const content = useField("text");
	const name = useField("text");
	const number = useField("text");

	const [notes, noteService] = useResource("http://localhost:3005/notes");
	const [persons, personService] = useResource(
		"http://localhost:3005/persons"
	);

	const handleNoteSubmit = (event) => {
		event.preventDefault();
		content.changeTo("");
		noteService.create({ content: content.value });
	};

	const handlePersonSubmit = (event) => {
		event.preventDefault();
		name.changeTo("");
		number.changeTo("");
		personService.create({ name: name.value, number: number.value });
	};

	return (
		<div>
			<h2>notes</h2>
			<form onSubmit={handleNoteSubmit}>
				<input
					name="content"
					value={content.value}
					type={content.type}
					onChange={content.onChange}
				/>
				<button>create</button>
			</form>
			{notes.map((n) => (
				<p key={n.id}>{n.content}</p>
			))}

			<h2>persons</h2>
			<form onSubmit={handlePersonSubmit}>
				name{" "}
				<input
					value={name.value}
					type={name.type}
					onChange={name.onChange}
				/>{" "}
				<br />
				number{" "}
				<input
					value={number.value}
					type={number.type}
					onChange={number.onChange}
				/>
				<button>create</button>
			</form>
			{persons.map((n) => (
				<p key={n.id}>
					{n.name} {n.number}
				</p>
			))}
		</div>
	);
};

export default App;
