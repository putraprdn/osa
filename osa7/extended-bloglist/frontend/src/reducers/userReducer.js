import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	name: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
});

export const resetUser = () => {
	return async (dispatch) => {
		dispatch(setUser(initialState));
	};
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
