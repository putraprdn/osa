import axios from "axios";
const baseUrl = "/api/login";

const login = async ({ username, password }) => {
	const credentials = { username, password };
	const response = await axios.post(baseUrl, credentials);

	saveToLocalStorage("user", response.data);
	return response.data;
};

const saveToLocalStorage = async (key, data) => {
	const formattedData = JSON.stringify(data);
	window.localStorage.setItem(key, formattedData);
};

export default { login };
