const calculateBmi = (height: number, mass: number): string => {
	let msg = "";

	const result = mass / (height / 100) ** 2;
	const formattedResult = result.toFixed(2);
	if (result < 18.5) {
		msg = `${formattedResult} is in underweight range`;
	} else if (result >= 25 && result <= 29.9) {
		msg = `${formattedResult} is in overweight range`;
	} else if (result >= 30) {
		msg = `${formattedResult} is in obese range`;
	} else {
		msg = `${formattedResult} is in normal range`;
	}
	console.log(msg);
	return msg;
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
if (a && b) calculateBmi(a, b);
console.log("direct pass args", calculateBmi(171, 60));
