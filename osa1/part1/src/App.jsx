const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ parts = [] }) => {
	console.log(parts);
	return (
		<div>
			<Part
				section={parts[0].name}
				task={parts[0].exercises}
			/>
			<Part
				section={parts[1].name}
				task={parts[1].exercises}
			/>
			<Part
				section={parts[2].name}
				task={parts[2].exercises}
			/>
		</div>
	);
};

const Part = ({ section, task }) => {
	return (
		<p>
			{section} {task}
		</p>
	);
};

const Total = ({ parts }) => {
	return (
		<p>
			Number of exercises{" "}
			{parts[0].exercises + parts[1].exercises + parts[2].exercises}
		</p>
	);
};

const App = () => {
	const course = "Half Stack application development";
	const parts = [
		{
			name: "Fundamentals of React",
			exercises: 10,
		},
		{
			name: "Using props to pass data",
			exercises: 7,
		},
		{
			name: "State of a component",
			exercises: 14,
		},
	];

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	);
};

export default App;
