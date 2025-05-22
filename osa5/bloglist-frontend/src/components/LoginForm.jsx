import { useState } from "react";

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
			<h2>log in to application</h2>
			<form onSubmit={handleSubmit}>
				<div>
					username{" "}
					<input
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						type="text"
						name="username"
					/>
				</div>
				<div>
					password{" "}
					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
						name="password"
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	);
};

export default LoginForm; 