import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";

		const newAnecdote = await anecdoteService.createAnecdote(content);

		dispatch(addAnecdote(newAnecdote));
		dispatch(showNotification(`you have created '${content}'`));
	};
	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input name="content" />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
