interface CoursePartType {
	name: string;
	exerciseCount: number;
}

const Header = ({ courseName }: { courseName: string }) => {
	return <h1>${courseName}</h1>;
};

const Content = ({ courses }: { courses: CoursePartType[] }) => {
	return (
		<>
			<p>
				{courses[0].name} {courses[0].exerciseCount}
			</p>
			<p>
				{courses[1].name} {courses[1].exerciseCount}
			</p>
			<p>
				{courses[2].name} {courses[2].exerciseCount}
			</p>
		</>
	);
};

const Total = ({ total }: { total: number }) => {
	return <p>Number of exercises {total}</p>;
};

const App = () => {
	const courseName = "Half Stack application development";
	const courseParts = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
		},
	];

	const totalExercises = courseParts.reduce(
		(sum, part) => sum + part.exerciseCount,
		0
	);

	return (
		<div>
			<Header courseName={courseName} />
			<Content courses={courseParts} />
			<Total total={totalExercises} />
		</div>
	);
};

export default App;
