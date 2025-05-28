const initialState = "";

const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_FILTER":
			return action.payload;
		default:
			return state;
	}
};

export const addFilter = (content) => {
	return {
		type: "ADD_FILTER",
		payload: content,
	};
};

export default filterReducer;
