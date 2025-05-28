import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload;
		},
	},
});

export const showNotification = (content, duration = 5) => {
	return async (dispatch) => {
		dispatch(setNotification(content));

		setTimeout(() => {
			dispatch(setNotification(null));
		}, duration * 1000);
	};
};

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
