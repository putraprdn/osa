import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	const notification = useNotificationValue();
	console.log("notification: ", notification);
	if (!notification) return <></>;

	return <div style={style}>{notification}</div>;
};

export default Notification;
