import { useEffect, useState } from "react";
import axios from "axios";
import {
	createPhoneBook,
	deletePhoneBook,
	getAllPhoneBooks,
	updatePhoneBook,
} from "./services/phones";
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
		const newPersonObj = {
			name: newName,
			number: newNumber,
		};

		const isDuplicated = persons.find((person) => {
			return person.name === newName;
		});

		if (isDuplicated) {
			const { id, name } = isDuplicated;
			const isConfirmed = confirm(
				`${name} is already added to phonebook, replace the old number with a new one?`
			);
			if (!isConfirmed) return;

			updatePhoneBook(id, newPersonObj).then((response) => {
				setPersons((prev) =>
					prev.map((person) =>
						person.id === id ? response.data : person
					)
				);
			});
			return;
		}

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

	const handleDelete = (id) => {
		const person = persons.find((p) => p.id === id);
		const isConfirmed = confirm(`Delete ${person.name}?`);
		if (!isConfirmed) return;

		deletePhoneBook(id)
			.then(() => {
				setPersons(persons.filter((p) => p.id !== id));
			})
			.catch(console.log);
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

			<Persons
				handleDelete={handleDelete}
				persons={listToShow}
			/>
		</div>
	);
};

export default App;
