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

const Total = ({ total }) => {
	return <p>Number of exercises {total}</p>;
};

const App = () => {
	const course = "Half Stack application development";
	const part1 = {
		name: "Fundamentals of React",
		exercises: 10,
	};
	const part2 = {
		name: "Using props to pass data",
		exercises: 7,
	};
	const part3 = {
		name: "State of a component",
		exercises: 14,
	};

	return (
		<div>
			<Header course={course} />
			<Content parts={[part1, part2, part3]} />
			<Total
				total={part1.exercises + part2.exercises + part3.exercises}
			/>
		</div>
	);
};

export default App;
