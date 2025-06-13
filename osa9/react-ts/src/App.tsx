interface CoursePartBaseType {
	name: string;
	exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBaseType {
	description: string;
}

interface CoursePartGroup extends CoursePartBaseType {
	groupProjectCount: number;
	kind: "group";
}
interface CoursePartBasic extends CoursePartWithDescription {
	kind: "basic";
}
interface CoursePartBackground extends CoursePartWithDescription {
	backgroundMaterial: string;
	kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
	requirements: string[];
	kind: "special";
}

const Header = ({ courseName }: { courseName: string }) => {
	return <h1>{courseName}</h1>;
};

const Content = ({ courses }: { courses: CoursePartType[] }) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	return (
		<>
			{courses.map((c) => {
				let title: string = "";
				let desc: string = "";
				let link: string = "";
				let projectCount: number | null = null;
				let reqs: string[] = [];

				switch (c.kind) {
					case "basic":
						title = c.name;
						desc = c.description;
						break;
					case "group":
						title = c.name;
						projectCount = c.groupProjectCount;
						break;
					case "background":
						title = c.name;
						link = c.backgroundMaterial;
						desc = c.description;
						break;
					case "special":
						title = c.name;
						desc = c.description;
						reqs = c.requirements;
						break;
					default:
						return assertNever(c);
				}

				return (
					<Part
						title={title}
						content={desc}
						link={link}
						reqs={reqs}
						exerciseCount={c.exerciseCount}
						projectCount={projectCount}
					/>
				);
			})}
		</>
	);
};

interface PartType {
	title: string;
	exerciseCount: number;
	content: string;
	link: string;
	reqs: string[];
	projectCount: number | null;
}

const Part = ({
	title,
	content,
	link,
	reqs,
	projectCount,
	exerciseCount,
}: PartType) => {
	return (
		<>
			<div>
				<strong>
					{title} {exerciseCount}
				</strong>
			</div>
			<div>
				<i>{content}</i>
			</div>
			{projectCount && projectCount !== 0 && (
				<div>project exercises {projectCount}</div>
			)}
			{link && <div>submit to {link}</div>}
			{reqs && reqs.length > 0 && (
				<div>required skills: {reqs.join(", ")}</div>
			)}
			<br />
		</>
	);
};

const Total = ({ total }: { total: number }) => {
	return <p>Number of exercises {total}</p>;
};

type CoursePartType =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;

const App = () => {
	const courseName = "Half Stack application development";
	const courseParts: CoursePartType[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part",
			kind: "basic",
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: "group",
		},
		{
			name: "Basics of type Narrowing",
			exerciseCount: 7,
			description: "How to go from unknown to string",
			kind: "basic",
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
			description: "Confusing description",
			backgroundMaterial:
				"https://type-level-typescript.com/template-literal-types",
			kind: "background",
		},
		{
			name: "Backend development",
			exerciseCount: 21,
			description: "Typing the backend",
			requirements: ["nodejs", "jest"],
			kind: "special",
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
