import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
	const dispatch = useDispatch();

	const [formField, setFormField] = useState({
		username: "",
		password: "",
	});

	const handleFormOnChange = (e) => {
		const value = e.target.value;
		setFormField({
			...formField,
			[e.target.name]: value,
		});
		console.log(formField);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await loginService.login(formField);

			blogService.setToken(response.token);
			dispatch(setUser(response));
			setFormField({ username: "", password: "" });
		} catch (error) {
			console.error(error.response);
			showNotification("error", error.response.data.error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					username{" "}
					<input
						onChange={handleFormOnChange}
						value={formField.username}
						type="text"
						data-testid="username"
						name="username"
					/>
				</div>
				<div>
					password{" "}
					<input
						onChange={handleFormOnChange}
						value={formField.password}
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

export default LoginForm;
