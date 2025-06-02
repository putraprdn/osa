import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);
  
	if (!notification) return;

	return <div className={notification.type}>{notification.content}</div>;
};
export default Notification;
