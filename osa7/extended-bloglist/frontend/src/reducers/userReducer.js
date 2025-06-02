import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser(state, action) {
			console.log("in the reducer", action.payload);
			return action.payload;
		},
	},
});

export const resetUser = () => {
	return async (dispatch) => {
		dispatch(setUser({}));
	};
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
