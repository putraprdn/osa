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
