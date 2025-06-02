import { Link } from "react-router-dom";

const Navbar = () => {
	const padding = {
		paddingRight: 5,
	};

	return (
		<div>
			<Link
				style={padding}
				to={"/"}
			>
				blogs
			</Link>
			<Link
				to={"/users"}
				style={padding}
			>
				users
			</Link>
		</div>
	);
};

export default Navbar;
