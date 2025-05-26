import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin({ username, password });
		setUsername("");
		setPassword("");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					username{" "}
					<input
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						type="text"
						data-testid="username"
						name="username"
					/>
				</div>
				<div>
					password{" "}
					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
						data-testid="password"
						name="password"
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	);
};

LoginForm.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
