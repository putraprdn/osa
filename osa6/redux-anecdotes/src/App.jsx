import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
	const notificationState = useSelector(({ notification }) => notification);

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAnecdotes = async () => {
			const response = await anecdoteService.getAll();
			dispatch(setAnecdotes(response));
		};

		fetchAnecdotes();
	}, []);

	return (
		<div>
			<h2>Anecdotes</h2>
			{notificationState && <Notification />}
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
