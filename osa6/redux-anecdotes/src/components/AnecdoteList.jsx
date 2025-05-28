import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if (!filter) return anecdotes;

		const filtered = anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		);
		console.log(filtered);
		return filtered;
	});
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(voteAnecdote(id));
	};
	return (
		<>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>
								vote
							</button>
						</div>
					</div>
				))}
		</>
	);
};

export default AnecdoteList;
