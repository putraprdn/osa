import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const create = async (data) => {
	const dataToSubmit = {
		content: data,
		votes: 0,
	};

	const response = await axios.post(baseUrl, dataToSubmit);
	return response.data;
};

export const findById = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data;
};

export const vote = async (id) => {
	const anecdoteToUpdate = await findById(id);
	console.log(anecdoteToUpdate);
	const updateField = {
		...anecdoteToUpdate,
		votes: anecdoteToUpdate.votes + 1,
	};

	const response = await axios.put(`${baseUrl}/${id}`, updateField);
	return response.data;
};
