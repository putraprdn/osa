interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (exerciseArr: number[], target: number): Result => {
	const periodLength = exerciseArr.length;

	const trainingDays = exerciseArr.filter((e) => e !== 0).length;

	let total = 0;
	exerciseArr.map((e) => {
		if (isNaN(e)) throw new Error("array should only contains numbers");
		total += e;
	});
	const average = total / periodLength;

	const success = average === target ? true : false;

	const percent = (average / target) * 100;

	let rating = 0;
	let ratingDescription = "none";
	if (percent === 100) {
		rating = 3;
		ratingDescription = `you're ${percent.toFixed(0)}% on target`;
	} else if (percent >= 75) {
		rating = 2;
		ratingDescription = `you're ${percent.toFixed(
			0
		)}% of the target. Keep it up`;
	} else {
		ratingDescription = `you're ${percent.toFixed(
			0
		)}% of the target. Work harder`;
		rating = 1;
	}

	const result = {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
	console.log(result);
	return result;
};

if (require.main === module) {
	const target: number = Number(process.argv[2]);
	const trainingDaysArgs: number[] = [
		...process.argv.slice(3, process.argv.length),
	].map((e) => Number(e));
	calculateExercises(trainingDaysArgs, target);
	console.log(
		"direct pass: ",
		calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
	);
}

export default calculateExercises;
