import { useSelector, useDispatch } from "react-redux";
import { addAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(voteAnecdote(id));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";

		dispatch(addAnecdote(content));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
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
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input name="content" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default App;
