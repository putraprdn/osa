import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (content) => {
	const data = {
		content,
		votes: 0,
	};

	const response = await axios.post(baseUrl, data);
	return response.data;
};

const findById = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data;
};

const vote = async (id) => {
	const anecdoteToChange = await findById(id);

	const updateData = {
		...anecdoteToChange,
		votes: anecdoteToChange.votes + 1,
	};

	const result = await axios.put(`${baseUrl}/${id}/`, updateData);
	return result.data;
};

export default { getAll, create, findById, vote };
