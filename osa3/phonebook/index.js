const express = require("express");

const app = express();
const PORT = 3001;

let persons = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: "1",
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: "2",
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: "3",
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: "4",
	},
];

app.use(express.json());

app.get("/", (req, res) => {
	return res.send("<h1>Hello World</1>");
});

app.get("/info", (req, res) => {
	const totalPersons = persons.length;
	const currentDateTime = new Date().toUTCString();
	const htmlTemp = `<p>Phonebook has info for ${totalPersons} people</p><p>${currentDateTime}</p>`;

	return res.send(htmlTemp);
});

app.get("/api/persons", (req, res) => {
	return res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
	const { id } = req.params;
	const person = persons.find((c) => c.id === id);

	if (!person) return res.status(404).end();

	return res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
	const { id } = req.params;
	const filteredPersons = persons.filter((c) => c.id !== id);

	if (filteredPersons.length === persons.length) return res.status(404).end();

	return res.status(204).end();
});

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
