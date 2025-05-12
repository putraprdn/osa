const Course = ({ course }) => {
	return (
		<div>
			<h1>Half Stack application development</h1>
			{course.parts.map(({ name, id, exercises }) => (
				<p key={id}>
					{name} {exercises}
				</p>
			))}
		</div>
	);
};

export default Course;
