const App = () => {
	const diaries: [] = [];
	return <div>{diaries && diaries.map((d) => <p>{d}</p>)}</div>;
};

export default App;
