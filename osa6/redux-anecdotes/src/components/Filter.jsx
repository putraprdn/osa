import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../reducers/filterReducer";

const Filter = () => {
	const style = {
		marginBottom: 10,
	};

	const dispatch = useDispatch();

	const filter = useSelector((state) => state.filter);

	const handleChange = (event) => {
		console.log(event.target.value);
		const value = event.target.value;

		dispatch(addFilter(value));
	};

	return (
		<div style={style}>
			filter{" "}
			<input
				autoComplete="off"
				value={filter}
				name="filter"
				onChange={handleChange}
			/>
		</div>
	);
};

export default Filter;
