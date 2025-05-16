import { useEffect, useState } from "react";
import {
	createPhoneBook,
	deletePhoneBook,
	getAllPhoneBooks,
	updatePhoneBook,
} from "./services/phones";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [notification, setNotification] = useState({ type: "", msg: "" });

	useEffect(() => {
		getAllPhoneBooks().then((response) => {
			setPersons(response.data);
			console.log(response.data);
		});
	}, []);

	const handleShowNotification = (type, msg) => {
		setNotification({ type, msg });
		setTimeout(() => {
			setNotification({ type: "", msg: "" });
		}, 5000);
	};

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
			return person.name == newName;
		});

		if (isDuplicated) {
			const { id, name } = isDuplicated;
			const isConfirmed = confirm(
				`${name} is already added to phonebook, replace the old number with a new one?`
			);
			if (!isConfirmed) return;

			updatePhoneBook(id, newPersonObj)
				.then((response) => {
					setPersons((prev) =>
						prev.map((person) =>
							person.id === id ? response.data : person
						)
					);
					handleShowNotification(
						"success",
						`Updated ${newName} number`
					);
				})
				.catch((error) => {
					console.log(error);
					handleShowNotification("error", error.message);
				});

			setNewName("");
			setNewNumber("");
			return;
		}

		createPhoneBook(newPersonObj)
			.then((response) => {
				console.log(response);
				setPersons(response.data);
				console.log(newName)
				handleShowNotification(
					"success",
					`Added ${newName}`
				);
			})
			.catch((error) => {
				console.log(error);
				handleShowNotification("error", error.message);
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
				handleShowNotification("success", `Deleted ${person.name}`);
			})
			.catch((error) => {
				console.log(error);
				let msg = `Information of ${person.name} is not found`;

				if (error.response.status == 404) {
					msg = `Information of ${person.name} has already been removed from server`;
				}

				handleShowNotification("error", msg);
				setPersons(persons.filter((p) => p.id !== id));
			});
	};

	const listToShow = filterValue ? filteredPersons : persons;

	return (
		<div>
			<h2>Phonebook</h2>

			<Notification
				type={notification.type}
				msg={notification.msg}
			/>

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
