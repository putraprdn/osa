import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	type: "",
	content: "",
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
			console.log(action.payload);
			return action.payload;
		},
	},
});

export const showNotification = (type, content, duration = 5) => {
	console.log("here");
	console.log(type, content);

	return async (dispatch) => {
		const data = {
			type,
			content,
		};

		console.log("dispatched", data);
		dispatch(setNotification(data));

		setTimeout(() => {
			dispatch(setNotification(initialState));
		}, duration * 1000);
	};
};

const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
