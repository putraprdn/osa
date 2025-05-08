const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ section, task }) => {
	return (
		<p>
			{section} {task}
		</p>
	);
};

const Total = ({ total }) => {
	return <p>Number of exercises {total}</p>;
};

const App = () => {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 14;

	return (
		<div>
			<Header course={course} />
			<Content
				section={part1}
				task={exercises1}
			/>
			<Content
				section={part2}
				task={exercises2}
			/>
			<Content
				section={part3}
				task={exercises3}
			/>
			<Total total={exercises1 + exercises2 + exercises3} />
		</div>
	);
};

export default App;
