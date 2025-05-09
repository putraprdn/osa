import { useState } from "react";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>

			<div>
				<button
					onClick={() => {
						setGood(good + 1);
					}}
				>
					good
				</button>
				<button
					onClick={() => {
						setNeutral(neutral + 1);
					}}
				>
					neutral
				</button>
				<button
					onClick={() => {
						setBad(bad + 1);
					}}
				>
					bad
				</button>
			</div>

			<h2>statistics</h2>
			<p style={{ margin: 0 }}>
				good <span>{good}</span>
			</p>
			<p style={{ margin: 0 }}>
				neutral <span>{neutral}</span>
			</p>
			<p style={{ margin: 0 }}>
				bad <span>{bad}</span>
			</p>
		</div>
	);
};

export default App;
