import { useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
	const notificationState = useSelector(({ notification }) => notification);

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
