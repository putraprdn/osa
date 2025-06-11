const calculateBmi = (height: number, mass: number): string => {
	const result = mass / (height / 100) ** 2;
	const formattedResult = result.toFixed(2);
	if (result < 18.5) {
		return `${formattedResult} is in underweight range`;
	} else if (result >= 25 && result <= 29.9) {
		return `${formattedResult} is in overweight range`;
	} else if (result >= 30) {
		return `${formattedResult} is in obese range`;
	} else {
		return `${formattedResult} is in normal range`;
	}
};

console.log(calculateBmi(171, 60));
