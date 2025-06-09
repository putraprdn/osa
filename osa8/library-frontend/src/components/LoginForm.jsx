/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			console.log(error);
		},
	});

	const navigate = useNavigate();

	useEffect(() => {
		const localToken = localStorage.getItem("user-token") || "";
		if (localToken) navigate("/");
	}, []);

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			console.log(token);
			setToken(token);
			localStorage.setItem("user-token", token);
			navigate("/");
		}
	}, [result.data]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const usernameValue = e.target.username.value;
		const passwordValue = e.target.password.value;

		await login({
			variables: { username: usernameValue, password: passwordValue },
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				name
				<input
					type="text"
					name="username"
					required
				/>
			</div>
			<div>
				password{" "}
				<input
					type="password"
					name="password"
				/>
			</div>
			<button>login</button>
		</form>
	);
};

export default LoginForm;
