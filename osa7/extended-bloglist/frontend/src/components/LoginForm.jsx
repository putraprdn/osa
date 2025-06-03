import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer"; // Ensure to import showNotification

const LoginForm = () => {
	const dispatch = useDispatch();

	const [formField, setFormField] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		const data = JSON.parse(window.localStorage.getItem("user")) || null;
		if (!data) return;

		const userData = {
			username: data.username,
			name: data.name,
		};
		blogService.setToken(data.token);
		dispatch(setUser(userData));
	}, []);

	const handleFormOnChange = (e) => {
		const value = e.target.value;
		setFormField({
			...formField,
			[e.target.name]: value,
		});
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
			dispatch(showNotification("error", error.response.data.error)); // Ensure to dispatch the notification
		}
	};

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Login</h2>
			<form
				onSubmit={handleSubmit}
				className="form-group"
			>
				<div className="mb-3">
					<label
						htmlFor="username"
						className="form-label"
					>
						Username
					</label>
					<input
						onChange={handleFormOnChange}
						value={formField.username}
						type="text"
						data-testid="username"
						name="username"
						className="form-control"
						id="username"
						required
					/>
				</div>
				<div className="mb-3">
					<label
						htmlFor="password"
						className="form-label"
					>
						Password
					</label>
					<input
						onChange={handleFormOnChange}
						value={formField.password}
						type="password"
						data-testid="password"
						name="password"
						className="form-control"
						id="password"
						required
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
