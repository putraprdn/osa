import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, vote as voteAnecdote } from "../requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const mutateUpdatedAnecdote = useMutation({
		mutationFn: voteAnecdote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			const anecdoteToUpdate = anecdotes.find(
				(a) => a.id === updatedAnecdote.id
			);
			const newAnecdotes = anecdotes.map((a) =>
				a.id !== anecdoteToUpdate.id ? a : updatedAnecdote
			);
			notificationDispatch(
				`anecdote '${anecdoteToUpdate.content}' voted`
			);
			// setNotification("heheheh");
			queryClient.setQueryData(["anecdotes"], newAnecdotes);
		},
	});

	const handleVote = (id) => {
		console.log("vote", id);

		mutateUpdatedAnecdote.mutate(id);
	};

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: async () => await getAll(),
		retry: 1,
		refetchOnWindowFocus: false,
	});

	console.log(JSON.parse(JSON.stringify(result)));

	if (result.isPending) return <div>fetching data...</div>;

	if (result.isError)
		return (
			<div>
				anecdote service not available due to problem in the server
			</div>
		);

	const anecdotes = result.data;
	console.log(anecdotes);

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}{" "}
						<button onClick={() => handleVote(anecdote.id)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
