const Notification = ({ type, msg }) => {
  return <div className={type}>{msg}</div>;
};

export default Notification;
