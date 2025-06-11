import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

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
		res.status(400).json({ error: "malformed parameters" });
		return;
	}

	const bmi = calculateBmi(height, weight);

	res.status(200).json({
		height,
		weight,
		bmi,
	});
});

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const daily_exercises: number[] = req.body.daily_exercises || null;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const target: number = req.body.target || null;

	if (!(daily_exercises && target)) {
		res.status(400).json({
			error: "malformed parameters",
		});
		return;
	}

	try {
		const result = calculateExercises(daily_exercises, target);
		res.json(result);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
			res.status(400).json({ error: error.message });
			return;
		}
		res.status(400).json({ error: "something happened" });
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server is up and running on port http://localhost:${PORT}`);
});
