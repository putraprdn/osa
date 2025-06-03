import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getValidToken = () => {
	console.log("token is: ", token);
	const processedToken =
		token === null
			? JSON.parse(window.localStorage.getItem("user")).token
			: token;
	console.log("processed: ", processedToken);
	const formattedToken = processedToken.startsWith("Bearer ")
		? processedToken
		: `Bearer ${processedToken}`;
	return formattedToken;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createBlog = async (blogData) => {
	const getToken = getValidToken();

	const config = {
		headers: { Authorization: `${getToken}` },
	};

	const response = await axios.post(baseUrl, blogData, config);
	return response.data;
};

const updateBlog = async (id, updatedBlog) => {
	const token = getValidToken();
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
	return response.data;
};

const addComment = async (id, comment) => {
	const token = getValidToken();
	const config = {
		headers: { Authorization: token },
	};

	const data = {
		comment,
	};

	const response = await axios.post(
		`${baseUrl}/${id}/comments`,
		data,
		config
	);
	console.log("hasil", response.data);
	return response.data;
};

const removeBlog = async (id) => {
	const token = getValidToken();
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

export default {
	getAll,
	createBlog,
	setToken,
	updateBlog,
	removeBlog,
	addComment,
};
