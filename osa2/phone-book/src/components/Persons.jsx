const Persons = ({ persons, handleDelete }) => {
	return (
		<>
			{persons.map(({ name, id, number }) => (
				<div key={name}>
					{name} {number}{" "}
					<button
						onClick={() => {
							handleDelete(id);
						}}
					>
						delete
					</button>
				</div>
			))}
		</>
	);
};

export default Persons;
