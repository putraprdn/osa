export interface DiagnoseType {
	code: string;
	name: string;
	latin?: string;
}

export interface PatientType {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NewPatientType = Omit<PatientType, "id">;

export type PublicPatientDataType = Omit<PatientType, "ssn">;

export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}
