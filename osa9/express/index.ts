import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("<h1>Hello Full Stack!</h1>");
});

app.get("/bmi", (req, res) => {
	const query = req.query;
	const height = Number(query.height);
	const weight = Number(query.weight);

	if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
		res.status(400).json({ error: "malformatted parameters" });
		return;
	}

	const bmi = calculateBmi(height, weight);

	res.status(200).json({
		height,
		weight,
		bmi,
	});
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server is up and running on port http://localhost:${PORT}`);
});
