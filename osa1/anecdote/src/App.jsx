import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [voteArr, setVoteArr] = useState([]);
	const [mostVoted, setMostVoted] = useState(0); // store index of favorited anecdotes

	const handleButtonClick = () => {
		const newIndex = Math.floor(Math.random() * anecdotes.length);

		setSelected(newIndex);
	};

	const handleVote = (index) => {
		const newArr = [...voteArr];
		newArr[index] = !newArr[index] ? 1 : newArr[index] + 1;

		const mostVotedAnecdote = newArr[mostVoted] ?? 0;
		const totalRecentVoted = newArr[index];

		console.log(
			`recent vote: ${totalRecentVoted} \n most voted: ${mostVotedAnecdote} \n current index: ${index}`
		);

		if (totalRecentVoted > mostVotedAnecdote) {
			console.log("true");
			setMostVoted(index);
		}

		console.log(`most voted: ${mostVoted}`);
		setVoteArr(newArr);
	};
	return (
		<div>
			<div>
				<h1>Anecdote of the day</h1>
				<div>{anecdotes[selected]}</div>
				<div>has {voteArr[selected] ?? 0} votes</div>
				<button
					onClick={() => {
						handleVote(selected);
					}}
				>
					vote
				</button>
				<button onClick={handleButtonClick}>next anecdote</button>
			</div>

			<div>
				<h2>Anecdote with most votes</h2>
				<p>{anecdotes[mostVoted]}</p>
				<span>has {voteArr[mostVoted] ?? 0} votes</span>
			</div>
		</div>
	);
};

export default App;
