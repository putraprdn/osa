import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll } from "../requests";

const App = () => {
	const handleVote = (anecdote) => {
		console.log("vote");
	};

	const result = useQuery({
		queryKey: ["notes"],
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
  console.log(anecdotes)

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
