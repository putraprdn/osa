import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
	const handleVote = (anecdote) => {
		console.log("vote");
	};

	const anecdotes = [
		{
			content: "If it hurts, do it more often",
			id: "47145",
			votes: 0,
		},
	];

	const result = useQuery({
		queryKey: ["notes"],
		queryFn: async () => {
			const response = await axios.get("http://localhost:3001/anecdotes");
			return response.data;
		},
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
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
