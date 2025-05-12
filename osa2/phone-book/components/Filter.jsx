const Filter = ({ value, handleFilter }) => {
	return (
		<div>
			filter shown with{" "}
			<input
				onChange={handleFilter}
				value={value}
			/>
		</div>
	);
};

export default Filter;
