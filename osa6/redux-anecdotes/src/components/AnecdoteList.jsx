import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if (!filter) return anecdotes;
		const filtered = anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		);
		console.log("filtered:", filtered);
		return filtered;
	});
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		const { content } = anecdotes.find((a) => a.id === id);

		dispatch(addVote(id));
		dispatch(showNotification(`you voted '${content}'`, 2));
	};
	return (
		<>
			{[...anecdotes]
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}{" "}
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
