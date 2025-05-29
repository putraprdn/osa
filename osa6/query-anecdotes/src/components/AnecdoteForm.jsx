import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create as createAnecdote } from "../../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,

		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			console.log(anecdotes);
			queryClient.setQueryData(
				["anecdotes"],
				anecdotes.concat(newAnecdote)
			);
			notificationDispatch(`anecdote '${newAnecdote.content}' created`);
		},
		onError: (error, value) => {
			if (error.response.data.error.toLowerCase().includes("too short")) {
				notificationDispatch(
					`anecdote '${value}' is too short. Anecdote should have 5 characters minimum`
				);
				return;
			}
			notificationDispatch(error.message);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";

		newAnecdoteMutation.mutate(content);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
