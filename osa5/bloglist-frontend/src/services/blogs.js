import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createBlog = async (blogData) => {
	const getToken =
		token === null
			? JSON.parse(window.localStorage.getItem("loggedUser")).token
			: token;

	const config = {
		headers: { Authorization: `Bearer ${getToken}` },
	};
	console.log(getToken);

	const response = await axios.post(baseUrl, blogData, config);
	return response.data;
};

export default { getAll, createBlog, setToken };
