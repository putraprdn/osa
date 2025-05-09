import { useState } from "react";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [all, setAll] = useState(0);
	const [average, setAverage] = useState(0);
	const [positive, setPositive] = useState(0);

	const GOOD_VALUE = 1;
	const NEUTRAL_VALUE = 0;
	const BAD_VALUE = -1;

	const handleButtonClick = (type) => {
		let newGood = good;
		let newNeutral = neutral;
		let newBad = bad;

		switch (type) {
			case "good":
				newGood = good + 1;
				setGood(newGood);
				break;
			case "neutral":
				newNeutral = neutral + 1;
				setNeutral(newNeutral);
				break;
			case "bad":
				newBad = bad + 1;
				setBad(newBad);
				break;
			default:
				break;
		}

		const newAll = newGood + newNeutral + newBad;
		setAll(newAll);
		setAverage(
			(newGood * GOOD_VALUE +
				newNeutral * NEUTRAL_VALUE +
				newBad * BAD_VALUE) /
				newAll
		);
		setPositive((newGood / newAll) * 100);
	};

	return (
		<div>
			<h1>give feedback</h1>

			<div>
				<button
					onClick={() => {
						handleButtonClick("good");
					}}
				>
					good
				</button>
				<button
					onClick={() => {
						handleButtonClick("neutral");
					}}
				>
					neutral
				</button>
				<button
					onClick={() => {
						handleButtonClick("bad");
					}}
				>
					bad
				</button>
			</div>

			<h2>statistics</h2>
			<div>
				<div>good {good}</div>
				<div>neutral {neutral}</div>
				<div>bad {bad}</div>
				<div>all {all}</div>
				<div>average {average}</div>
				<div>positive {positive}%</div>
			</div>
		</div>
	);
};

export default App;
