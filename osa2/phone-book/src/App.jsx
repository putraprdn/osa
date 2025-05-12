import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "030-1231231" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		switch (e.target.name) {
			case "name":
				setNewName(value);
				break;
			case "number":
				setNewNumber(value);
				break;
			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isDuplicated = persons.find((person) => person.name === newName);
		if (isDuplicated) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const newPerson = persons.concat({
			name: newName,
			number: newNumber,
		});
		setPersons(newPerson);
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name:{" "}
					<input
						name="name"
						value={newName}
						onChange={handleChange}
					/>
				</div>
				<div>
					number:{" "}
					<input
						name="number"
						value={newNumber}
						onChange={handleChange}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
