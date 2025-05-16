const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const Person = require("./model/person");
const app = express();
const PORT = process.env.PORT || 3001;

// let persons = [
// 	{
// 		name: "Arto Hellas",
// 		number: "040-123456",
// 		id: "1",
// 	},
// 	{
// 		name: "Ada Lovelace",
// 		number: "39-44-5323523",
// 		id: "2",
// 	},
// 	{
// 		name: "Dan Abramov",
// 		number: "12-43-234345",
// 		id: "3",
// 	},
// 	{
// 		name: "Mary Poppendieck",
// 		number: "39-23-6423122",
// 		id: "4",
// 	},
// ];

// const generateId = () => {
// 	const randId = Math.floor(100000 + Math.random() * 900000);
// 	return randId.toString();
// };

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.get(/^(?!\/api).*/, (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		":method :url :status :response-time ms - :res[content-length] :body"
	)
);

// app.get("/info", (req, res) => {
// 	const totalPersons = persons.length;
// 	const currentDateTime = new Date().toUTCString();
// 	const htmlTemp = `<p>Phonebook has info for ${totalPersons} people</p><p>${currentDateTime}</p>`;

// 	return res.send(htmlTemp);
// });

app.get("/api/persons", (req, res, next) => {
	Person.find({})
		.then((result) => {
			return res.json(result);
		})
		.catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;

	Person.findById(id)
		.then((person) => {
			if (!person) return res.status(404).end();

			return res.json(person);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;
	Person.findByIdAndDelete(id)
		.then((result) => {
			console.log(result);
			return res.status(204).end();
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
});

app.post("/api/persons", (req, res, next) => {
	const { name, number } = req.body;

	if (!name || !number) {
		return res
			.status(400)
			.json({ message: "Name and Number must be filled" });
	}

	Person.find({ name })
		.then((person) => {
			if (person) {
				return res.status(409).json({ error: "name must be unique" });
			}
		})
		.catch((error) => next(error));

	const newPerson = new Person({
		name,
		number,
	});

	newPerson
		.save()
		.then((savedPerson) => {
			return res.status(201).json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;
	const { number } = req.body;
	console.log(`number body: ${number}`);
	console.log(`id: ${id}`);

	Person.findByIdAndUpdate(id, { number }, { new: true })
		.then((person) => {
			console.log(`success: ${person}`);
			return res.status(200).json(person);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.log(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformed id" });
	}

	next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});

module.exports = app;
