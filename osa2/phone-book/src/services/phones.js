import axios from "axios";
const baseUrl = "/api/persons";

export const getAllPhoneBooks = () => {
	return axios.get(baseUrl);
};

export const createPhoneBook = (newObject) => {
	return axios.post(baseUrl, newObject);
};

export const updatePhoneBook = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject);
};

export const deletePhoneBook = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};
