import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetUser } from "../reducers/userReducer";

const Navbar = () => {
	const padding = {
		paddingRight: 5,
	};

	const dispatch = useDispatch();

	const user = useSelector(({ user }) => user);

	const handleLogout = () => {
		dispatch(resetUser());
		window.localStorage.removeItem("user");
	};

	if (!user || Object.keys(user.username).length === 0) return;

	return (
		<div className="d-flex align-items-center justify-content-between py-3 px-4 rounded bg-light">
			<div className="d-flex column-gap-1 fw-semibold fs-5 text-uppercase">
				<Link
					className="text-info"
					style={padding}
					to={"/"}
				>
					blogs
				</Link>
				<Link
					className="text-info"
					to={"/users"}
					style={padding}
				>
					users
				</Link>
			</div>
			<div className="d-flex align-items-center">
				<span className="fs-5">{user.name} logged in</span>

				<button
					className="btn btn-danger ms-3 fw-semibold"
					onClick={handleLogout}
					data-testid="logout"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
