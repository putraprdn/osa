const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

// Note: Using legacy format since the latest one doesn't work as expected
const URL = `mongodb://putraperdana:${password}@ac-ozt8k7p-shard-00-00.xnvp4hk.mongodb.net:27017,ac-ozt8k7p-shard-00-01.xnvp4hk.mongodb.net:27017,ac-ozt8k7p-shard-00-02.xnvp4hk.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-iirddf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(URL);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
	const person = new Person({
		name,
		number,
	});
	person.save().then((result) => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
} else {
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person);
		});
		mongoose.connection.close();
	});
}
