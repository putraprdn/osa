import { useEffect, useState } from "react";
import axios from "axios";
import { createPhoneBook, getAllPhoneBooks } from "./services/phones";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

	const BASE_URL = "http://localhost:3001/persons";

	useEffect(() => {
		const data = getAllPhoneBooks().then((response) => {
			setPersons(response.data);
			console.log(response.data);
		});
	}, []);

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
		const newPersonObj = {
			name: newName,
			number: newNumber,
		};

		createPhoneBook(newPersonObj)
			.then((response) => {
				console.log(response);
				setPersons(persons.concat(response.data));
			})
			.catch((error) => {
				console.log(error);
			});

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

			<Filter
				value={filterValue}
				handleFilter={handleFilter}
			/>

			<h3>add a new</h3>

			<PersonForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				newName={newName}
				newNumber={newNumber}
			/>

			<h3>Numbers</h3>

			<Persons persons={listToShow} />
		</div>
	);
};

export default App;
