import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
	const padding = {
		paddingRight: 5,
	};

	const user = useSelector(({ user }) => user);

    if (!user || Object.keys(user).length === 0) return;

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
