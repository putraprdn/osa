import { GenderEnum, NewPatientType } from "./types";

export const toNewPatientData = (object: unknown): NewPatientType => {
	console.log(object);
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		!(
			"name" in object &&
			"dateOfBirth" in object &&
			"ssn" in object &&
			"gender" in object &&
			"occupation" in object
		)
	) {
		throw new Error("Incorrect data: some fields are missing");
	}

	if (!isString(object.name))
		throw new Error(`incorrect name: ${object.name}`);
	if (!isString(object.ssn)) throw new Error(`incorrect ssn: ${object.ssn}`);
	if (!isString(object.occupation))
		throw new Error(`incorrect occupation: ${object.occupation}`);

	return {
		name: object.name,
		dateOfBirth: parseDate(object.dateOfBirth),
		ssn: object.ssn,
		gender: parseGender(object.gender),
		occupation: object.occupation,
	};
};

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error("Incorrect date: " + date);
	}
	return date;
};

const isGender = (param: string): param is GenderEnum => {
	return Object.values(GenderEnum)
		.map((g) => g.toString())
		.includes(param);
};

const parseGender = (gender: unknown): GenderEnum => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect gender: " + gender);
	}
	return gender;
};
