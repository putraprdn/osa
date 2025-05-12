import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		setNewName(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isDuplicated = persons.find((person) => person.name === newName);
		if (isDuplicated) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const newPerson = persons.concat({ name: newName });
		setPersons(newPerson);
		setNewName("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={handleChange}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
