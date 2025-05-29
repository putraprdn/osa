/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SHOW_NOTIFICATION":
			return action.payload;
		default:
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		null
	);
	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext);
	return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext);
	const dispatch = notificationAndDispatch[1];

	return (content, duration = 5000) => {
		dispatch({ type: "SHOW_NOTIFICATION", payload: content });
		setTimeout(() => {
			dispatch({ type: "SHOW_NOTIFICATION", payload: null });
		}, duration);
	};
};

export default NotificationContext;
