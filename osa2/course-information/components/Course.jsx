const Course = ({ course }) => {
	const totalExec = course.parts.reduce(
		(sum, part) => sum + part.exercises,
		0
	);

	return (
		<div>
			<h1>Half Stack application development</h1>
			{course.parts.map(({ name, id, exercises }) => (
				<p key={id}>
					{name} {exercises}
				</p>
			))}
			<p>total of {totalExec} exercises</p>
		</div>
	);
};

export default Course;
