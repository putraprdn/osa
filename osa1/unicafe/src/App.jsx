import { useState } from "react";

const StatisticLine = ({ text, value, prefix = "" }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>
				{value}
				{prefix}
			</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	if (!all) {
		return <div>No feedback given</div>;
	}

	return (
		<>
			<table>
				<tbody>
					<StatisticLine
						text={"good"}
						value={good}
					/>
					<StatisticLine
						text={"neutral"}
						value={neutral}
					/>
					<StatisticLine
						text={"bad"}
						value={bad}
					/>
					<StatisticLine
						text={"all"}
						value={all}
					/>
					<StatisticLine
						text={"average"}
						value={average}
					/>
					<StatisticLine
						text={"positive"}
						value={positive}
						prefix="%"
					/>
				</tbody>
			</table>
		</>
	);
};

const Button = ({ text, handler }) => {
	return (
		<button
			onClick={() => {
				handler(text);
			}}
		>
			{text}
		</button>
	);
};

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
				<Button
					text={"good"}
					handler={() => {
						handleButtonClick("good");
					}}
				/>
				<Button
					text={"neutral"}
					handler={() => {
						handleButtonClick("neutral");
					}}
				/>
				<Button
					text={"bad"}
					handler={() => {
						handleButtonClick("bad");
					}}
				/>
			</div>

			<h2>statistics</h2>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
