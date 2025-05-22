const Toggleable = ({ children, buttonLabel, visible, onToggle }) => {
	return (
		<>
			<button
				style={{ display: visible ? "none" : "" }}
				onClick={onToggle}
			>
				{buttonLabel}
			</button>
			<div style={{ display: visible ? "" : "none" }}>
				{children}
				<button onClick={onToggle}>cancel</button>
			</div>
		</>
	);
};

export default Toggleable;
