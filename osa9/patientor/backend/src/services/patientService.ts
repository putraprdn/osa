import patients from "../data/patients";
import { NewPatientType, PublicPatientDataType } from "../types";
import { v1 as uuid } from "uuid";

const getAll = (): PublicPatientDataType[] => {
	const cleanedData = patients.map((p) => {
		return {
			id: p.id,
			name: p.name,
			gender: p.gender,
			dateOfBirth: p.dateOfBirth,
			occupation: p.occupation,
		};
	});

	return cleanedData;
};

const create = (data: NewPatientType): PublicPatientDataType => {
	const newData = {
		id: uuid(),
		...data,
	};
	patients.push(newData);
	return newData;
};

export default {
	getAll,
	create,
};
