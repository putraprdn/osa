import { v1 as uuid } from "uuid";

import patients from "../data/patients";
import {
	NewPatientEntryType,
	NewPatientType,
	PatientType,
	PublicPatientDataType,
} from "../types";

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

const findById = (patientId: string): PatientType | undefined => {
	return patients.find((p) => p.id === patientId);
};

const create = (data: NewPatientType): PublicPatientDataType => {
	const newData: PatientType = {
		id: uuid(),
		...data,
		entries: [],
	};
	patients.push(newData);
	return newData;
};

const createEntry = (
	patientId: string,
	fields: NewPatientEntryType
): PatientType => {
	const patient = patients.find((p) => p.id === patientId);
	if (!patientId || !patient) throw new Error("Patient not found");

	const newEntry = {
		id: uuid(),
		...fields,
	};
	patient?.entries.push(newEntry);
	return patient;
};

export default {
	getAll,
	findById,
	create,
	createEntry,
};
