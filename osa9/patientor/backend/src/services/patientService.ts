import patients from "../data/patients";
import { PublicPatientDataType } from "../types";

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

export default {
	getAll,
};
