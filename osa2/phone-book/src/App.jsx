import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

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

	const handleFilter = (e) => {
		const value = e.target.value;
		setFilterValue(value);
		if (value.length === 0 || !value) {
			return setFilteredPersons([]);
		}
		const filteredArr = persons.filter((person) =>
			person.name.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredPersons(filteredArr);
	};

	const listToShow = filterValue ? filteredPersons : persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with{" "}
				<input
					onChange={handleFilter}
					value={filterValue}
				/>
			</div>

			<h3>add a new</h3>
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
			{listToShow.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
