import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";

		dispatch(createAnecdote(content));
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
